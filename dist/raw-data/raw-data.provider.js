"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawDataProviders = void 0;
const raw_data_schema_1 = require("./schemas/raw-data.schema");
exports.rawDataProviders = [
    {
        provide: 'RawData',
        useFactory: (connection) => connection.model('RawData', raw_data_schema_1.RawDataSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=raw-data.provider.js.map