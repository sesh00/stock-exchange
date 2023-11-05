import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import * as fs from 'fs/promises';

@Injectable()
export class ApiService {
    private readonly apiKey = 'Cz2si3LVjuituTYV1wrF';
    private readonly nasdaqUrl = 'https://data.nasdaq.com/api/v3/datasets/WIKI/';
    private readonly dataPath = 'data/candles/';

    private readonly startDate = new Date('2015-01-01');
    private readonly endDate = new Date('2016-12-31');

    constructor(private readonly httpService: HttpService) {}

    async getHistoricalData(symbol: string): Promise<any> {
        const url = `${this.nasdaqUrl}${symbol}.json`;

        try {
            const response: AxiosResponse = await this.httpService.get(url, {
                params: {
                    api_key: this.apiKey,
                    start_date: this.startDate.toISOString().split('T')[0],
                    end_date: this.endDate.toISOString().split('T')[0],
                },
            }).toPromise();

            const historicalData = response.data;
            await this.saveDataToJson(symbol, historicalData);
            return historicalData;
        } catch (error) {
            console.error('Error fetching candles:', error.message);
            throw new Error('Failed to fetch candles from Nasdaq API');
        }
    }

    private async saveDataToJson(symbol: string, data: any): Promise<void> {
        const filename = `${this.dataPath}${symbol}_historical_data.json`;
        await fs.writeFile(filename, JSON.stringify(data, null, 2));
    }

    async getHistoricalDataFromFile(symbol: string): Promise<any> {
        const filename = `${this.dataPath}${symbol}_historical_data.json`;

        try {
            const fileContent = await fs.readFile(filename, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error('Error reading historical data from file:', error);
            throw new Error(`Failed to read historical data for symbol ${symbol}`);
        }
    }


    async getHistoricalDataElement(symbol: string, targetDate: string): Promise<any | null> {
        const filename = `${this.dataPath}${symbol}_historical_data.json`;

        try {
            const fileContent = await fs.readFile(filename, 'utf-8');
            const historicalData = JSON.parse(fileContent);

            const targetElement = historicalData.dataset.data.find((dataItem) => dataItem[0] === targetDate);

            return targetElement || null;
        } catch (error) {
            console.error('Error reading historical data from file:', error);
            return null;
        }
    }


}
