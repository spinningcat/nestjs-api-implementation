import { Module } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { AdminController } from '../controllers/Admin.controller';
import { AdminService } from '../services/Admin.service';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Correct import


@Module({
  controllers: [AdminController],
  providers: [PrismaService, ConfigService, AdminService],
})
export class AdminModule {}
