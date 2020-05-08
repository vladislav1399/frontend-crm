"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const barcode_service_1 = __importDefault(require("../shared/services/barcode.service"));
const getLastBarCode = (req, res) => {
    barcode_service_1.default.getLastBarCode().then(newBarCode => {
        res.status(200).json(newBarCode);
    });
};
module.exports = {
    getLastBarCode
};
