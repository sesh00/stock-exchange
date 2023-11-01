import { Injectable } from '@nestjs/common';
import * as stocksData from 'data/stocks.json';

@Injectable()
export class StocksService {
    getStocks(): Record<string, { name: string, symbol: string, trading: boolean }> {
        return stocksData;
    }
    updateTradingStatus(symbol: string, trading: string): void {
        const stock = stocksData[symbol];

        if (stock) {
            stock.trading = trading === 'true';
        } else {
            throw new Error(`Stock with symbol ${symbol} not found.`);
        }
    }
}
