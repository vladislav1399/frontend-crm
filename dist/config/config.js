"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SERVER_CONFIG = {
    PORT: 9998,
    MONGO_URI: 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
    MONGO_ATLAS: 'mongodb+srv://Vladislav1399:90397850@cluster0-tqtgm.mongodb.net/test?retryWrites=true&w=majority',
    jwt: 'dev-jwt' || process.env.jwt,
};
exports.default = SERVER_CONFIG;
