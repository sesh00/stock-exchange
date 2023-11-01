import { Injectable } from '@nestjs/common';
import * as brokersData from 'data/brokers.json';

@Injectable()
export class BrokersService {
    private readonly brokers: { name: string; initialFunds: number }[];

    constructor() {
        this.brokers = brokersData.brokers;
    }

    getBrokers(): { brokers: { name: string; initialFunds: number }[] } {
        return { brokers: this.brokers };
    }

    updateInitialFunds(name: string, newInitialFunds: number): void {
        const broker = this.brokers.find(b => b.name === name);

        if (broker) {
            broker.initialFunds = newInitialFunds;
        } else {
            throw new Error(`Broker with name ${name} not found.`);
        }
    }

    addBroker(name: string, initialFunds: number): void {
        const existingBroker = this.brokers.find(b => b.name === name);

        if (existingBroker) {
            throw new Error(`Broker with name ${name} already exists.`);
        }

        this.brokers.push({ name, initialFunds });
    }

    removeBroker(name: string): void {
        const index = this.brokers.findIndex(b => b.name === name);

        if (index !== -1) {
            this.brokers.splice(index, 1);
        } else {
            throw new Error(`Broker with name ${name} not found.`);
        }
    }
}
