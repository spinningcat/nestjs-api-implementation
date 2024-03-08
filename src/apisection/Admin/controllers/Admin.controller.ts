// user.controller.ts
import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express'; // Add this import line
import { AdminService } from '../services/Admin.service';
import logger from '../../../logger/logger';
import { CreateAdminUserDto } from '../dto/CreateAdminUser.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from '../dto/Login.dto';

@Controller("/api/v1")
export class AdminController {
  constructor(private readonly userService: AdminService) {}

  @Get('admin')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  async getAllUsers() {
    try {
      console.log("hello");
      return await this.userService.getAllUsers();
      // Your controller logic
      //const data = { message: 'Some data' };

      // Set the desired status code and send the JSON response in a single line
     //return res.status(200).json({ status: 'success', error: false, data });
    } catch (error) {
      // Handle all errors with a generic response
      logger.error('An unexpected error occurred:', error);

      // Handle the error with a generic response
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


    @Post("admin")
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    async createUser(
      @Req() req: Request, 
      @Res() res: Response,
      @Body(ValidationPipe) createAdminUserDto: CreateAdminUserDto) {
      // Handle user creation using the data in createUserDto
      try{
       // Assign values from the req object to createUserDto properties
        createAdminUserDto.email = req.body.email;
        createAdminUserDto.password = req.body.password;
        // Call the service to perform the actual logic
        const result = await this.userService.createUser(createAdminUserDto);
        // When error is in service layer you catch like that.
        if (result.status === 'error') {
          return res.status(500).json(result);
        }
        
        // Return a response or perform other actions
        return res.status(201).json({username : result.obj.email});
      }
      
      // this is for catching client side error.
      catch (error) {
          // Handle errors and send an appropriate response
          logger.error('Error in creating user:', error);
          return res.status(500).json({ status: 'error', error: true, message: 'Internal Server Error' });
      }

    }
    @Post("adminLogin")
    @ApiOperation({ summary: 'Login admin' })
    @ApiResponse({ status: 201, description: 'Admin login successfully' })
    async Login(
      @Req() req: Request, 
      @Res() res: Response,
      @Body() loginDto: LoginDto) {
     
      try{
        console.log(req.body.email);
        console.log(loginDto);
        loginDto.email = req.body.email;
        loginDto.password = req.body.password;
       
        // Call the service to perform the actual logic
        const result = await this.userService.Login(loginDto);
        // When error is in service layer you catch like that.
        
        if (result && result.status === 'error') {
          return res.status(500).json(result);
        }
        
        // Return a response or perform other actions
        return res.status(201).json(result);
        
      }
      // this is for catching client side error.
      catch (error) {
          // Handle errors and send an appropriate response
          logger.error('Error in login user:', error);
          return res.status(500).json({ status: 'error', error: true, message: 'Internal Server Error' });
      }

    }
}




