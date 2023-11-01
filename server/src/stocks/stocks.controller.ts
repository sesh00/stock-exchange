import { Controller, Get } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
    constructor(private readonly stocksService: StocksService) {}

    @Get()
    getStocks(): string {
        return this.stocksService.getStocks();
    }
}