import { DataDeliverenceService } from '../services/data-services';
import { int } from 'aws-sdk/clients/datapipeline';
export declare class DataDeliverenceController {
    private readonly dataDeliverenceService;
    constructor(dataDeliverenceService: DataDeliverenceService);
    insertItem(body: {
        personcount: int;
        age: int;
        gender: string;
    }): Promise<{
        success: boolean;
        result: import("aws-sdk/clients/dynamodb").DocumentClient.PutItemOutput;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        result?: undefined;
    }>;
}
