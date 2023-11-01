import {Controller, Get, Param, Put} from '@nestjs/common';
import { StocksService } from './stocks.service';
import * as stocksData from "../../data/stocks.json";
import {ApiService} from "../api/api.service";

@Controller('stocks')
export class StocksController {
    constructor(private readonly stocksService: StocksService,
                private readonly apiService: ApiService) {}

    @Get()
    getStocks(): Record<string, { name: string, symbol: string, trading: boolean }> {
        return this.stocksService.getStocks();
    }

    @Get(':symbol/historical-data')
    async getHistoricalData(@Param('symbol') symbol: string): Promise<any> {
        try {
            return await this.apiService.getHistoricalDataFromFile(symbol);
        } catch (error) {
            console.error(`Error getting historical data for ${symbol}:`, error.message);
            throw new Error(`Failed to get historical data for symbol ${symbol}`);
        }
    }
    @Put(':symbol/trading/:trading')
    updateTradingStatus(@Param('symbol') symbol: string, @Param('trading') trading: string): void {
        this.stocksService.updateTradingStatus(symbol, trading);
    }
    async getHistoricalDataForAllStocks(): Promise<void> {
        const stockSymbols = Object.keys(stocksData);

        for (const symbol of stockSymbols) {
            try {
                const historicalData = await this.apiService.getHistoricalData(symbol);
                console.log(`Historical data for ${symbol} loaded`);
            } catch (error) {
                console.error(`Error loading historical data for ${symbol}:`, error.message);
            }
        }
    }

}
