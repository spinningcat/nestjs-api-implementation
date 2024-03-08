"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
const config_1 = require("@nestjs/config");
const config_module_1 = require("../src/config/config.module");
const Admin_modules_1 = require("./apisection/Admin/modules/Admin.modules");
const swagger_1 = require("@nestjs/swagger");
const core_1 = require("@nestjs/core");
const nestjs_joi_1 = require("nestjs-joi");
const prisma_service_1 = require("../prisma/prisma.service");
let AppModule = AppModule_1 = class AppModule {
    async configure(consumer) {
        const app = await core_1.NestFactory.create(AppModule_1);
        consumer.apply((0, helmet_1.default)({
            contentSecurityPolicy: true,
            frameguard: { action: 'deny' },
            noSniff: true,
        })).forRoutes('*');
        const options = new swagger_1.DocumentBuilder()
            .setTitle('Your API Title')
            .setDescription('Your API Description')
            .setVersion('1.0')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('api', app, document);
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = AppModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            config_module_1.ConfigAppModule,
            (0, common_1.forwardRef)(() => Admin_modules_1.AdminModule),
            nestjs_joi_1.JoiPipeModule
        ],
        providers: [prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map