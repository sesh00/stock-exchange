import { Module } from '@nestjs/common';
import { ExchangeSettingsController } from './exchange-settings.controller';
import { ExchangeSettingsService } from './exchange-settings.service';

@Module({
    controllers: [ExchangeSettingsController],
    providers: [ExchangeSettingsService],
})
export class ExchangeSettingsModule {}
