import { Controller, Get } from '@nestjs/common';
import { ExchangeSettingsService } from './exchange-settings.service';

@Controller('exchange-settings')
export class ExchangeSettingsController {
    constructor(private readonly exchangeSettingsService: ExchangeSettingsService) {}

    @Get()
    getExchangeSettings(): string {
        return this.exchangeSettingsService.getExchangeSettings();
    }
}