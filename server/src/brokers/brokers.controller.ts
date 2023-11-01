import { Controller, Get, Put, Post, Delete, Body, Param } from '@nestjs/common';
import { BrokersService } from './brokers.service';

@Controller('brokers')
export class BrokersController {
    constructor(private readonly brokersService: BrokersService) {}

    @Get()
    getBrokers(): { brokers: { name: string; initialFunds: number }[] } {
        return this.brokersService.getBrokers();
    }

    @Put(':name/update-funds/:newInitialFunds')
    updateInitialFunds(@Param('name') name: string, @Param('newInitialFunds') newInitialFunds: number): void {
        this.brokersService.updateInitialFunds(name, newInitialFunds);
    }

    @Post('add')
    addBroker(@Body() body: { name: string; initialFunds: number }): void {
        const { name, initialFunds } = body;
        this.brokersService.addBroker(name, initialFunds);
    }

    @Delete(':name/remove')
    removeBroker(@Param('name') name: string): void {
        this.brokersService.removeBroker(name);
    }
}
