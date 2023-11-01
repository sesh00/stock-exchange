import { Controller, Get } from '@nestjs/common';
import { BrokersService } from './brokers.service';

@Controller('brokers')
export class BrokersController {
    constructor(private readonly brokersService: BrokersService) {}

    @Get()
    getBrokers(): string {
        return this.brokersService.getBrokers();
    }
}