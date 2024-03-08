import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateAdminUserDto } from '../dto/CreateAdminUser.dto';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from '../dto/Login.dto';
export declare class AdminService {
    private readonly prisma;
    private readonly configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    private readonly saltRounds;
    private readonly password;
    getAllUsers(): Promise<{
        id: number;
        email: string;
        password: string;
    }[]>;
    createUser(createUserDto: CreateAdminUserDto): Promise<{
        status: string;
        error: string;
        messge: string;
        obj: {
            id: number;
            email: string;
            password: string;
        };
        message?: undefined;
    } | {
        status: string;
        error: boolean;
        message: any;
        obj: any;
        messge?: undefined;
    }>;
    Login(loginDto: LoginDto): Promise<{
        status: string;
        error: boolean;
        message: string;
        obj: any;
    } | {
        status: string;
        error: boolean;
        message: any;
        obj?: undefined;
    }>;
}
