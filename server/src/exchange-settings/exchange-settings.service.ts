import { Injectable } from '@nestjs/common';
import * as settingsData from 'data/settings.json';
import { Server } from 'socket.io';
import {StocksController} from "../stocks/stocks.controller";

@Injectable()
export class ExchangeSettingsService {
    private readonly settings: {
        current_date: string;
        date_limits: {
            min_date: string;
            max_date: string;
        };
        date_change_frequency_seconds: number;
        trading_active: boolean;
    };

    private server: Server | null = null;
    private intervalId: NodeJS.Timeout | null = null;
    private stocksController: StocksController;

    constructor(stocksController: StocksController) {
        this.settings = settingsData.settings;
        this.stocksController = stocksController;
        this.setupInterval();
    }


    setStocksController(stocksController: StocksController): void {
        this.stocksController = stocksController;
    }
    setServer(server: Server) {
        this.server = server;
    }

    getExchangeSettings(): string {
        return JSON.stringify(this.settings);
    }

    getCurrentDate(): string {
        return this.settings.current_date;
    }

    updateFrequencySeconds(newFrequency: number): void {
        this.settings.date_change_frequency_seconds = newFrequency;

        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        this.setupInterval();
    }

    toggleTradingStatus(): void {
        this.settings.trading_active = !this.settings.trading_active;
    }

    setCurrentDate(newDate: string): void {
        this.settings.current_date = newDate;

        if (this.server) {
            this.server.emit('updateCurrentDate', this.getCurrentDate());
        }
    }

    private setupInterval(): void {
        const frequencyMilliseconds = this.settings.date_change_frequency_seconds * 1000;
        this.intervalId = setInterval(() => this.updateCurrentDateAndProcessStockData(), frequencyMilliseconds);
    }

    private async updateCurrentDateAndProcessStockData(): Promise<void> {
        if (this.settings.trading_active) {
            this.updateCurrentDate();

            if (this.server) {
                this.server.emit('updateCurrentDate', this.getCurrentDate());
            }

            const results = await this.stocksController.processHistoricalDataForAllStocksOnDate(this.getCurrentDate());

            if (this.server) {
                const validResults = results.filter(({ historicalDataElement }) => historicalDataElement !== null);

                if (validResults.length > 0) {
                    this.server.emit('updateStockData', validResults);
                }
            }
        }
    }


    private updateCurrentDate(): void {
        const currentDate = new Date(this.settings.current_date);
        const maxDate = new Date(this.settings.date_limits.max_date);
        const minDate = new Date(this.settings.date_limits.min_date);

        currentDate.setDate(currentDate.getDate() + 1);

        if (currentDate.getTime() > maxDate.getTime()) {
            this.settings.current_date = minDate.toISOString();
        } else {
            this.settings.current_date = currentDate.toISOString();
        }
    }
}
