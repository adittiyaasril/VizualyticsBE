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
exports.RawDataController = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("@nestjs/platform-express/multer");
const zlib = require("zlib");
const csv = require("csv-parser");
const raw_data_service_1 = require("./raw-data.service");
const stream_1 = require("stream");
let RawDataController = class RawDataController {
    constructor(rawDataService) {
        this.rawDataService = rawDataService;
    }
    async uploadFile(file) {
        const results = [];
        if (file.originalname.endsWith('.gz')) {
            const unzipStream = zlib.createGunzip();
            const parseStream = csv();
            stream_1.Readable.from(file.buffer)
                .pipe(unzipStream)
                .pipe(parseStream)
                .on('data', (data) => {
                const rawData = {
                    resultTime: new Date(data['Result Time']),
                    enodebId: (data['Object Name'].match(/eNodeB ID=(\d+)/) || [])[1] || '',
                    cellId: (data['Object Name'].match(/Local Cell ID=(\d+)/) || [])[1] || '',
                    availDur: parseInt(data['L.Cell.Avail.Dur']) || 0,
                };
                results.push(rawData);
            })
                .on('end', async () => {
                try {
                    await this.rawDataService.create(results);
                }
                catch (error) {
                    console.error(error);
                    throw new Error('Failed to insert data into MongoDB');
                }
            });
            return 'File uploaded and data inserted successfully.';
        }
        else {
            console.error('Uploaded file is not a .gz file.');
            throw new Error('Invalid file format. Please upload a .gz file.');
        }
    }
    async getGraph(enodebId, cellId, startDate, endDate) {
        const graphData = await this.rawDataService.getGraphData(enodebId, cellId, startDate, endDate);
        return graphData;
    }
};
exports.RawDataController = RawDataController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, multer_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RawDataController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('graph'),
    __param(0, (0, common_1.Query)('enodebId')),
    __param(1, (0, common_1.Query)('cellId')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], RawDataController.prototype, "getGraph", null);
exports.RawDataController = RawDataController = __decorate([
    (0, common_1.Controller)('raw-data'),
    __metadata("design:paramtypes", [raw_data_service_1.RawDataService])
], RawDataController);
//# sourceMappingURL=raw-data.controller.js.map