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
const cashless_service_1 = __importDefault(require("../shared/services/cashless.service"));
const getCashlessByWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    cashless_service_1.default.cashlessByWarehouse(req.params.id).then(cashless => {
        res.status(200).json(cashless);
    });
});
const getCashlessByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        dataOt: req.body.dataOt,
        dataDo: req.body.dataDo
    };
    let warehouseId = req.body.idWarehouse;
    cashless_service_1.default.findCashlessForDate(warehouseId, data).then(cashless => {
        res.status(200).json(cashless);
    }).catch(e => {
        console.log(e);
        res.status(200).json(e.message);
    });
});
module.exports = { getCashlessByWarehouse, getCashlessByDate };
