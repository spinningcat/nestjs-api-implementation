import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
export declare class DataDeliverenceService {
    private readonly configService;
    private readonly dynamoDBService;
    constructor(configService: ConfigService);
    putItem(params: AWS.DynamoDB.DocumentClient.PutItemInput): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput>;
}
