"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const config_1 = __importDefault(require("./config"));
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => {
    return new Promise((resolve, reject) => {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.set('debug', true);
        mongoose_1.default.connection
            .on('error', error => reject(error))
            .on('close', () => console.log('database closed'))
            .once('open', () => resolve('mongoose.connection MAIN'));
        mongoose_1.default.connect(config_1.default.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });
};
module.exports = {
    connectDB,
};
