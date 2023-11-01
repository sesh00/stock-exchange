import { Module } from '@nestjs/common';
import { BrokersController } from './brokers.controller';
import { BrokersService } from './brokers.service';

@Module({
    controllers: [BrokersController],
    providers: [BrokersService],
})
export class BrokersModule {}