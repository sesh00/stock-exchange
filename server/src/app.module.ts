import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StocksModule } from './stocks/stocks.module';
import { BrokersModule } from './brokers/brokers.module';
import { ExchangeSettingsModule } from './exchange-settings/exchange-settings.module';

@Module({
  imports: [StocksModule, BrokersModule, ExchangeSettingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
