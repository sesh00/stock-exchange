import { Module } from '@nestjs/common';
import { ExchangeSettingsController } from './exchange-settings.controller';
import { ExchangeSettingsService } from './exchange-settings.service';
import {StocksController} from "../stocks/stocks.controller";
import {StocksService} from "../stocks/stocks.service";
import {ApiService} from "../api/api.service";
import {HttpModule} from "@nestjs/axios";


@Module({

    imports: [HttpModule],
    controllers: [ExchangeSettingsController],
    providers: [ExchangeSettingsService, StocksController, StocksService, ApiService],
})
export class ExchangeSettingsModule {}
