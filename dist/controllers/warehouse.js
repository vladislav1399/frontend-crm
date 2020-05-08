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
const warehouse_service_1 = __importDefault(require("../shared/services/warehouse.service"));
const message_service_1 = __importDefault(require("../shared/services/message.service"));
const user_service_1 = __importDefault(require("../shared/services/user.service"));
const finance_service_1 = __importDefault(require("../shared/services/finance.service"));
const balance_service_1 = __importDefault(require("../shared/services/balance.service"));
const getWarehouse = (req, res) => {
    warehouse_service_1.default.getAllWarehouse().then((warehouse) => {
        res.status(200).json(warehouse);
    }).catch((error) => console.log(error));
};
const createWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newWarehouse = { name: req.body.name };
    yield warehouse_service_1.default.createNewWarehouse(newWarehouse).then((warehouse) => {
        const warehouseId = String(warehouse._id);
        finance_service_1.default.createCashAndCashless(warehouseId);
        warehouse_service_1.default.getAllWarehouse().then(warehouses => {
            if (warehouses.length === 1) {
                user_service_1.default.updateUserWarehouseFirstLogin(warehouseId).then(result => {
                    res.status(200).json(message_service_1.default.sendMessage(true, `Новый склад ${req.body.name} был успешно создан`));
                }).catch(e => res.json(message_service_1.default.sendMessage(false, e.message)));
            }
            else {
                balance_service_1.default.createLeftOversOnTheWarehouse(warehouseId).then((result) => {
                    res.status(200).json(message_service_1.default.sendMessage(true, `Новый склад ${req.body.name} был успешно создан`));
                });
            }
        });
    }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
});
const getWarehouseById = (req, res, next) => {
    console.log('req.params.id', req.params.id);
    warehouse_service_1.default.getWarehouseNowId(req.params.id).then(warehouseNow => {
        console.log(warehouseNow);
        res.status(200).json(warehouseNow);
    }).catch(e => console.log(e));
};
module.exports = { getWarehouse, createWarehouse, getWarehouseById };
