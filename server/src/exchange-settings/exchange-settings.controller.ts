import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExchangeSettingsService } from './exchange-settings.service';

@Controller('exchange-settings')
export class ExchangeSettingsController {
    constructor(private readonly exchangeSettingsService: ExchangeSettingsService) {}

    @Get()
    getExchangeSettings(): string {
        return this.exchangeSettingsService.getExchangeSettings();
    }

    @Post('current-date')
    getCurrentDate(): string {
        return this.exchangeSettingsService.getCurrentDate();
    }

    @Post('toggle-trading-status')
    toggleTradingStatus(): void {
        this.exchangeSettingsService.toggleTradingStatus();
    }

    @Post('update-frequency-seconds')
    updateFrequencySeconds(@Body() data: { newFrequency: number }): void {
        const { newFrequency } = data;
        this.exchangeSettingsService.updateFrequencySeconds(newFrequency);
    }
    @Post('set-current-date')
    setCurrentDate(@Body() data: { newDate: string }): void {
        const { newDate } = data;
        this.exchangeSettingsService.setCurrentDate(newDate);
    }
}
