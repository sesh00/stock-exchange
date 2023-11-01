import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {AppService} from "./app.service";
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = app.get(AppService);
  await appService.getHistoricalDataForAllStocks();

  app.use(cors());
  await app.listen(3001);
}

bootstrap();
