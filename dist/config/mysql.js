"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const pool = mysql_1.default.createPool({
    host: "s21.thehost.com.ua",
    user: "enastation",
    database: "beauty-space",
    password: "wegas90397850"
});
const getConnection = (callback) => {
    pool.getConnection(function (err, connection) {
        callback(err, connection);
    });
};
const endConnection = (callback) => {
    pool.end(function (err) {
        callback(err);
    });
};
exports.default = getConnection;
