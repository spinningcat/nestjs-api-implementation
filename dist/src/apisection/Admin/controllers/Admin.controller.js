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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const Admin_service_1 = require("../services/Admin.service");
const logger_1 = require("../../../logger/logger");
const CreateAdminUser_dto_1 = require("../dto/CreateAdminUser.dto");
const swagger_1 = require("@nestjs/swagger");
const Login_dto_1 = require("../dto/Login.dto");
let AdminController = class AdminController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAllUsers() {
        try {
            console.log("hello");
            return await this.userService.getAllUsers();
        }
        catch (error) {
            logger_1.default.error('An unexpected error occurred:', error);
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createUser(req, res, createAdminUserDto) {
        try {
            createAdminUserDto.email = req.body.email;
            createAdminUserDto.password = req.body.password;
            const result = await this.userService.createUser(createAdminUserDto);
            if (result.status === 'error') {
                return res.status(500).json(result);
            }
            return res.status(201).json({ username: result.obj.email });
        }
        catch (error) {
            logger_1.default.error('Error in creating user:', error);
            return res.status(500).json({ status: 'error', error: true, message: 'Internal Server Error' });
        }
    }
    async Login(req, res, loginDto) {
        try {
            console.log(req.body.email);
            console.log(loginDto);
            loginDto.email = req.body.email;
            loginDto.password = req.body.password;
            const result = await this.userService.Login(loginDto);
            if (result && result.status === 'error') {
                return res.status(500).json(result);
            }
            return res.status(201).json(result);
        }
        catch (error) {
            logger_1.default.error('Error in login user:', error);
            return res.status(500).json({ status: 'error', error: true, message: 'Internal Server Error' });
        }
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Post)("admin"),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User created successfully' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, CreateAdminUser_dto_1.CreateAdminUserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)("adminLogin"),
    (0, swagger_1.ApiOperation)({ summary: 'Login admin' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Admin login successfully' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "Login", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)("/api/v1"),
    __metadata("design:paramtypes", [Admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=Admin.controller.js.map