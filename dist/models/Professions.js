"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const professionsSchema = ts_mongoose_1.createSchema({
    professionName: ts_mongoose_1.Type.string({ required: true, index: { unique: true } })
});
const Professions = ts_mongoose_1.typedModel('Professions', professionsSchema);
exports.default = Professions;
