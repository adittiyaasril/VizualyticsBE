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
exports.RawDataService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
let RawDataService = class RawDataService {
    constructor(rawDataModel) {
        this.rawDataModel = rawDataModel;
    }
    async create(data) {
        const sanitizedData = data.map((item) => ({
            ...item,
            resultTime: isValidDate(item.resultTime)
                ? new Date(item.resultTime)
                : null,
        }));
        const validData = sanitizedData.filter((item) => item.resultTime !== null);
        if (validData.length === 0) {
            return [];
        }
        const insertedData = await this.rawDataModel.insertMany(validData);
        return insertedData.map((doc) => doc.toObject());
    }
    async getGraphData(enodebId, cellId, startDate, endDate) {
        if (!isValidDate(startDate) || !isValidDate(endDate)) {
            throw new Error('Invalid date format in startDate or endDate');
        }
        const filter = {
            enodebId,
            cellId,
            resultTime: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        };
        const rawData = await this.rawDataModel
            .find(filter)
            .select('resultTime availDur')
            .exec();
        const graphData = rawData.map((item) => ({
            resultTime: item.resultTime,
            availability: (item.availDur / 900) * 100,
        }));
        return graphData;
    }
};
exports.RawDataService = RawDataService;
exports.RawDataService = RawDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('RawData')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], RawDataService);
function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.valueOf());
}
//# sourceMappingURL=raw-data.service.js.map