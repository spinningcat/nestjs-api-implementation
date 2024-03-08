import { Controller, Post, Body } from '@nestjs/common';
import { DataDeliverenceService } from '../services/data-services';
import { int } from 'aws-sdk/clients/datapipeline';

@Controller('/api/v1')
export class DataDeliverenceController {

 
   constructor(private readonly dataDeliverenceService:DataDeliverenceService ) {}


  @Post('insert')
  async insertItem(@Body() body: { personcount: int, age: int, gender: string }) {
    console.log("sss");
    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: 'DemoMerchant-1-WatchData-Inference',
      Item: body,
    };

    try {
      const result = await this.dataDeliverenceService.putItem(params);
      return { success: true, result };
    } catch (error) {
      console.error('Error inserting item:', error);
      return { success: false, error: error.message };
    }
  }
  // Add more controller methods for other operations as needed
}
