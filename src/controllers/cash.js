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
const cash_service_1 = __importDefault(require("../shared/services/cash.service"));
const getCashByWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield cash_service_1.default.cashByWarehouse(req.params.id).then(cashes => {
        res.status(200).json(cashes);
    });
});
const getCashByDateForWarehouse = (req, res) => {
    const data = {
        dataOt: req.body.dataOt,
        dataDo: req.body.dataDo
    };
    let warehouseId = req.body.idWarehouse;
    cash_service_1.default.findCashForDate(warehouseId, data).then(cashes => {
        res.status(200).json(cashes);
    }).catch(e => {
        console.log(e);
        res.status(200).json(e.message);
    });
};
module.exports = { getCashByWarehouse, getCashByDateForWarehouse };
