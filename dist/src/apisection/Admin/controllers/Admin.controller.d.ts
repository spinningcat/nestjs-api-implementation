import { Request, Response } from 'express';
import { AdminService } from '../services/Admin.service';
import { CreateAdminUserDto } from '../dto/CreateAdminUser.dto';
import { LoginDto } from '../dto/Login.dto';
export declare class AdminController {
    private readonly userService;
    constructor(userService: AdminService);
    getAllUsers(): Promise<{
        id: number;
        email: string;
        password: string;
    }[]>;
    createUser(req: Request, res: Response, createAdminUserDto: CreateAdminUserDto): Promise<Response<any, Record<string, any>>>;
    Login(req: Request, res: Response, loginDto: LoginDto): Promise<Response<any, Record<string, any>>>;
}
