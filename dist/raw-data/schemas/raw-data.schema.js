"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawDataSchema = void 0;
const mongoose = require("mongoose");
exports.RawDataSchema = new mongoose.Schema({
    resultTime: Date,
    enodebId: String,
    cellId: String,
    availDur: Number,
});
//# sourceMappingURL=raw-data.schema.js.map