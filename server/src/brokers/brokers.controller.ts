import { Controller, Get, Put, Post, Delete, Body, Param } from '@nestjs/common';
import { BrokersService } from './brokers.service';

@Controller('brokers')
export class BrokersController {
    constructor(private readonly brokersService: BrokersService) {}

    @Get()
    getBrokers(): { brokers: { name: string; initialFunds: number; stocks: any[] }[] } {
        return this.brokersService.getBrokers();
    }
    @Get(':name')
    getBrokerByName(@Param('name') name: string): { broker: { name: string; initialFunds: number; stocks: any[] } } {
        return this.brokersService.getBrokerByName(name);
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

    @Post(':name/buy-stock/:symbol/:quantity/:price')
    buyStock(
        @Param('name') name: string,
        @Param('symbol') symbol: string,
        @Param('quantity') quantity: number,
        @Param('price') price: number,
    ): void {
        this.brokersService.buyStock(name, symbol, quantity, price);
    }

    @Post(':name/sell-stock/:symbol/:quantity/:price')
    sellStock(
        @Param('name') name: string,
        @Param('symbol') symbol: string,
        @Param('quantity') quantity: number,
        @Param('price') price: number,
    ): void {
        this.brokersService.sellStock(name, symbol, quantity, price);
    }
}
