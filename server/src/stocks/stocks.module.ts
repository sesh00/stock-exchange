import { Module } from '@nestjs/common';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import {ApiModule} from "../api/api.module";

@Module({
    imports: [ApiModule],
    controllers: [StocksController],
    providers: [StocksService],
})
export class StocksModule {}