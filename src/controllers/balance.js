"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const balance_service_1 = __importDefault(require("../shared/services/balance.service"));
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const getBalanceProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    balance_service_1.default.getBalanceProductAll().then((balances) => {
        res.status(200).json(balances);
    });
});
const getBalanceProductForWarehouse = (req, res) => {
    const warehouseId = ObjectId(req.params.id);
    balance_service_1.default.getBalanceForWarehouse(warehouseId).then((productAndLeftovers) => {
        res.status(200).json(productAndLeftovers);
    }).catch((e) => console.log(e.message));
};
const getFullBalanceAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield balance_service_1.default.getFullBalance().then((balances) => {
        for (const balance of balances) {
            balance.fullBalance = 0;
            for (let i = 0; i < balance.leftovers.length; i++) {
                balance.fullBalance += balance.leftovers[i].balance;
            }
        }
        res.status(200).json(balances);
    }).catch((e) => console.log(e.message));
});
module.exports = {
    getBalanceProduct,
    getBalanceProductForWarehouse,
    getFullBalanceAllProducts
};
