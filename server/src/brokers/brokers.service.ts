import { Injectable } from '@nestjs/common';

@Injectable()
export class BrokersService {
    getBrokers(): string {
        return 'Brokers Data';
    }
}