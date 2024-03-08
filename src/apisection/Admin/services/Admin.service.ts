import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateAdminUserDto } from '../dto/CreateAdminUser.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import logger from '../../../logger/logger';
import { Request, Response } from 'express'; // Add this import line
import { LoginDto } from '../dto/Login.dto';

@Injectable()
export class AdminService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
    ) {}

  private readonly  saltRounds = this.configService.get<string>('saltRounds')
  private readonly  password = this.configService.get<string>('password')
  

  
  async getAllUsers() {
    return this.prisma.adminUser.findMany();
  }
  async createUser(createUserDto: CreateAdminUserDto) {
    try{
      const salt = await bcrypt.genSalt(parseInt(this.saltRounds));
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
      const admin = await this.prisma.adminUser.create({
        data: {
          email: createUserDto.email,
          password: hashedPassword,
        },
      });
        return {status: "success", error: "false", messge : "user created" , obj: admin}
      }
      catch (error) {
        logger.error('Error in creating user:', error);
        return { status: 'error', error: true, message: error, obj: null };
      // Handle errors and send an appropriate response
     
    
      }
    }
    async Login(loginDto: LoginDto) {
      try{
        
        const adminUser = await this.prisma.adminUser.findMany({
          select:{
            password : true
          },
          where: {
            email: loginDto.email,
          },
        });
        console.log(adminUser[0].password);
        const passwordCheck = await bcrypt.compare(loginDto.password, adminUser[0].password);
    
        // Use the value of passwordCheck outside the bcrypt.compare callback
        console.log(passwordCheck);
        return { status: 'success', error: false, message: "user logged in succefully,", obj: passwordCheck };
        
        }
        catch (error) {
          logger.error('Error in login user:', error);
          return { status: 'error', error: true, message: error };
          // Handle errors and send an appropriate response
       
      
        }
      }
    }

  // Other database operations...