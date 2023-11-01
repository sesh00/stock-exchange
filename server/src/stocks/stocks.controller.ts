import {Controller, Get, Param, Put} from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
    constructor(private readonly stocksService: StocksService) {}

    @Get()
    getStocks(): Record<string, { name: string, symbol: string, trading: boolean }> {
        return this.stocksService.getStocks();
    }

    @Get(':symbol/historical-data')
    async getHistoricalData(@Param('symbol') symbol: string): Promise<any> {
        try {
            //return await this.apiService.getHistoricalDataFromFile(symbol);
        } catch (error) {
            console.error(`Error getting historical data for ${symbol}:`, error.message);
            throw new Error(`Failed to get historical data for symbol ${symbol}`);
        }
    }
    @Put(':symbol/trading/:trading')
    updateTradingStatus(@Param('symbol') symbol: string, @Param('trading') trading: string): void {
        this.stocksService.updateTradingStatus(symbol, trading);
    }
}
