import { Injectable } from '@nestjs/common';

@Injectable()
export class StocksService {
    getStocks(): string {
        return 'Stocks Data';
    }
}