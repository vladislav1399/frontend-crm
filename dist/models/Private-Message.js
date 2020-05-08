"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const privateMessageSchema = ts_mongoose_1.createSchema({
    message: ts_mongoose_1.Type.string({ required: true }),
    userPost: ts_mongoose_1.Type.objectId({ required: true, ref: 'User' }),
    userRecipient: ts_mongoose_1.Type.objectId({ required: true, ref: 'User' }),
    date: ts_mongoose_1.Type.mixed({ require: true }),
});
const PrivateMessages = ts_mongoose_1.typedModel('PrivateMessages', privateMessageSchema);
exports.default = PrivateMessages;
