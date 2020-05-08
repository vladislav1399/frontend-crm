"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const config_1 = __importDefault(require("../config/config"));
const database_1 = __importDefault(require("../config/database"));
database_1.default.connectDB().then(info => {
    console.log('MAIN database connect', info);
    app_1.default.listen(config_1.default.PORT, () => {
        console.log('server started');
    });
}).catch((err) => {
    console.log('error connect MAIN database', err);
    process.exit(1);
});
