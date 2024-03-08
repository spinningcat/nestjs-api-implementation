import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';



@Injectable()
export class DataDeliverenceService {
  private readonly dynamoDBService: AWS.DynamoDB.DocumentClient;

  constructor(private readonly configService: ConfigService) {
    AWS.config.update({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get<string>('AWS_REGION  '),
    });
    
    this.dynamoDBService = new AWS.DynamoDB.DocumentClient();
  }

  async putItem(params: AWS.DynamoDB.DocumentClient.PutItemInput): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> {
    return this.dynamoDBService.put(params).promise();
  }
}
