import { Injectable } from '@nestjs/common';

@Injectable()
export class ExchangeSettingsService {
    getExchangeSettings(): string {
        return 'Exchange Settings Data';
    }
}