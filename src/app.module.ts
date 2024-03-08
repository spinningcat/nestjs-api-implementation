import { Module, NestModule, MiddlewareConsumer, forwardRef } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigAppModule } from '../src/config/config.module';
import { AdminModule } from './apisection/Admin/modules/Admin.modules';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core'; // Import NestFactory
import { JoiPipeModule } from 'nestjs-joi';
import { PrismaService } from 'prisma/prisma.service';



@Module({
  imports: [
    ConfigModule.forRoot(), 
    ConfigAppModule,
    forwardRef(() => AdminModule), 
    JoiPipeModule
  ],
  providers: [PrismaService],
})
export class AppModule {
  async configure(consumer: MiddlewareConsumer) {
    const app = await NestFactory.create(AppModule);

    consumer.apply(helmet({
      contentSecurityPolicy: true, // You can customize CSP if needed
      frameguard: { action: 'deny' }, // Set X-Frame-Options to 'deny'
      noSniff: true, // Set X-Content-Type-Options to 'nosniff'
    })).forRoutes('*');

    const options = new DocumentBuilder()
      .setTitle('Your API Title')
      .setDescription('Your API Description')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }
}


