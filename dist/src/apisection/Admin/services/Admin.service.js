"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const logger_1 = require("../../../logger/logger");
let AdminService = class AdminService {
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        this.saltRounds = this.configService.get('saltRounds');
        this.password = this.configService.get('password');
    }
    async getAllUsers() {
        return this.prisma.adminUser.findMany();
    }
    async createUser(createUserDto) {
        try {
            const salt = await bcrypt.genSalt(parseInt(this.saltRounds));
            const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
            const admin = await this.prisma.adminUser.create({
                data: {
                    email: createUserDto.email,
                    password: hashedPassword,
                },
            });
            return { status: "success", error: "false", messge: "user created", obj: admin };
        }
        catch (error) {
            logger_1.default.error('Error in creating user:', error);
            return { status: 'error', error: true, message: error, obj: null };
        }
    }
    async Login(loginDto) {
        try {
            const adminUser = await this.prisma.adminUser.findMany({
                select: {
                    password: true
                },
                where: {
                    email: loginDto.email,
                },
            });
            console.log(adminUser[0].password);
            const passwordCheck = await bcrypt.compare(loginDto.password, adminUser[0].password);
            console.log(passwordCheck);
            return { status: 'success', error: false, message: "user logged in succefully,", obj: passwordCheck };
        }
        catch (error) {
            logger_1.default.error('Error in login user:', error);
            return { status: 'error', error: true, message: error };
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], AdminService);
//# sourceMappingURL=Admin.service.js.map