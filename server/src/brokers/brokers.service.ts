import { Injectable } from '@nestjs/common';
import * as brokersData from 'data/brokers.json';

@Injectable()
export class BrokersService {
    private readonly brokers: {
        name: string;
        initialFunds: number;
        stocks: { symbol : string; quantity: number; purchasePrice: number }[];
    }[];

    constructor() {
        this.brokers = brokersData.brokers;
    }

    getBrokers(): {
        brokers: { name: string; initialFunds: number; stocks: { symbol: string; quantity: number; purchasePrice: number }[] }[];
    } {
        return { brokers: this.brokers };
    }

    getBrokerByName(name: string): {
        broker: {
            name: string;
            initialFunds: number;
            stocks: { symbol: string; quantity: number; purchasePrice: number }[];
        };
    } {
        const broker = this.brokers.find((b) => b.name === name);
        if (broker) {
            return { broker };
        } else {
            throw new Error(`Broker with name ${name} not found.`);
        }
    }

    updateInitialFunds(name: string, newInitialFunds: number): void {
        const broker = this.brokers.find((b) => b.name === name);

        if (broker) {
            broker.initialFunds = newInitialFunds;
        } else {
            throw new Error(`Broker with name ${name} not found.`);
        }
    }

    addBroker(name: string, initialFunds: number): void {
        const existingBroker = this.brokers.find((b) => b.name === name);

        if (existingBroker) {
            throw new Error(`Broker with name ${name} already exists.`);
        }

        this.brokers.push({ name, initialFunds, stocks: [] });
    }

    removeBroker(name: string): void {
        const index = this.brokers.findIndex((b) => b.name === name);

        if (index !== -1) {
            this.brokers.splice(index, 1);
        } else {
            throw new Error(`Broker with name ${name} not found.`);
        }
    }


    buyStock(name: string, symbol: string, quantity: number, price: number): void {
        const broker = this.brokers.find((b) => b.name === name);

        if (!broker) {
            throw new Error(`Broker with name ${name} not found.`);
        }

        // Check if there are enough initial funds
        if (broker.initialFunds < price * quantity) {
            throw new Error(`Not enough funds to buy ${quantity} stocks of ${symbol}.`);
        }

        const stockIndex = broker.stocks.findIndex((s) => s.symbol === symbol);

        if (stockIndex !== -1) {
            // Stock exists, update quantity and purchasedPrice
            const newQuantity = Number(broker.stocks[stockIndex].quantity) + Number(quantity);
            const newTotalValue = Number(broker.stocks[stockIndex].purchasePrice) * Number(broker.stocks[stockIndex].quantity) + Number(price) * Number(quantity);
            broker.stocks[stockIndex].purchasePrice = newTotalValue / newQuantity;
            broker.stocks[stockIndex].quantity = newQuantity;
        } else {
            // Stock doesn't exist, add new stock
            broker.stocks.push({ symbol, quantity, purchasePrice: price });
        }

        // Deduct funds
        broker.initialFunds -= price * quantity;
    }



    sellStock(name: string, symbol: string, quantity: number, price: number): void {
        const broker = this.brokers.find((b) => b.name === name);

        if (!broker) {
            throw new Error(`Broker with name ${name} not found.`);
        }

        const stockIndex = broker.stocks.findIndex((s) => s.symbol === symbol);

        if (stockIndex !== -1) {
            if (broker.stocks[stockIndex].quantity < quantity) {
                throw new Error(`Not enough quantity of ${symbol} to sell.`);
            }

            // Sell stocks, update quantity and funds
            broker.stocks[stockIndex].quantity -= Number(quantity);
            broker.initialFunds += Number(price) * Number(quantity);

            // If all stocks sold, remove from the array
            if (broker.stocks[stockIndex].quantity === 0) {
                broker.stocks.splice(stockIndex, 1);
            }
        } else {
            throw new Error(`Stock with symbol ${symbol} not found.`);
        }
    }
}