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
exports.DataDeliverenceController = void 0;
const common_1 = require("@nestjs/common");
const data_services_1 = require("../services/data-services");
let DataDeliverenceController = class DataDeliverenceController {
    constructor(dataDeliverenceService) {
        this.dataDeliverenceService = dataDeliverenceService;
    }
    async insertItem(body) {
        console.log("sss");
        const params = {
            TableName: 'DemoMerchant-1-WatchData-Inference',
            Item: body,
        };
        try {
            const result = await this.dataDeliverenceService.putItem(params);
            return { success: true, result };
        }
        catch (error) {
            console.error('Error inserting item:', error);
            return { success: false, error: error.message };
        }
    }
};
exports.DataDeliverenceController = DataDeliverenceController;
__decorate([
    (0, common_1.Post)('insert'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DataDeliverenceController.prototype, "insertItem", null);
exports.DataDeliverenceController = DataDeliverenceController = __decorate([
    (0, common_1.Controller)('/api/v1'),
    __metadata("design:paramtypes", [data_services_1.DataDeliverenceService])
], DataDeliverenceController);
//# sourceMappingURL=data.controller.js.map