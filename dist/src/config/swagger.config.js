"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerCustomOptions = exports.swaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('Cam API')
    .setDescription('Camera application')
    .setVersion('1.0')
    .build();
exports.swaggerCustomOptions = {
    swaggerOptions: {
        persistAuthorization: true,
    },
    customSiteTitle: 'Your API Documentation',
};
//# sourceMappingURL=swagger.config.js.map