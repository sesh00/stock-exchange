import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import {StocksController} from "./stocks/stocks.controller";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const stocksController = app.get(StocksController);
  await stocksController.getHistoricalDataForAllStocks();

  app.use(cors());
  await app.listen(3001);
}

bootstrap();
