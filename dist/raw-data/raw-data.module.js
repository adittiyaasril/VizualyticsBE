"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawDataModule = void 0;
const common_1 = require("@nestjs/common");
const raw_data_controller_1 = require("./raw-data.controller");
const raw_data_service_1 = require("./raw-data.service");
const raw_data_provider_1 = require("./raw-data.provider");
const database_module_1 = require("../database/database.module");
const platform_express_1 = require("@nestjs/platform-express");
let RawDataModule = class RawDataModule {
};
exports.RawDataModule = RawDataModule;
exports.RawDataModule = RawDataModule = __decorate([
    (0, common_1.Module)({
        controllers: [raw_data_controller_1.RawDataController],
        imports: [platform_express_1.MulterModule.register({}), database_module_1.DatabaseModule],
        providers: [raw_data_service_1.RawDataService, ...raw_data_provider_1.rawDataProviders],
    })
], RawDataModule);
//# sourceMappingURL=raw-data.module.js.map