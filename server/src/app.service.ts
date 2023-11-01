import { Injectable } from '@nestjs/common';
import { ApiService } from './api/api.service';
import * as stocksData from '../data/stocks.json';

@Injectable()
export class AppService {
  constructor(private readonly apiService: ApiService) {}

  async getHello(): Promise<string> {
    return 'Hello World!';
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
