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
const Warehouse_1 = __importDefault(require("../../models/Warehouse"));
const createNewWarehouse = (warehouse) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Warehouse_1.default.create(warehouse);
});
const getAllWarehouse = () => __awaiter(void 0, void 0, void 0, function* () {
    return Warehouse_1.default.find();
});
const getWarehouseNowId = (warehouseId) => __awaiter(void 0, void 0, void 0, function* () {
    return Warehouse_1.default.findOne({ _id: warehouseId });
});
module.exports = { createNewWarehouse, getAllWarehouse, getWarehouseNowId };
