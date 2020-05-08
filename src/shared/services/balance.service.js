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
const Balance_1 = __importDefault(require("../../models/Balance"));
const warehouse_service_1 = __importDefault(require("./warehouse.service"));
const getAllLeftOvers = () => {
    return Balance_1.default.find();
};
const createBalance = (balance) => {
    return Balance_1.default.create(balance);
};
const createBalanceForProduct = (productId, barCode) => __awaiter(void 0, void 0, void 0, function* () {
    let arrLeftOver = [];
    yield warehouse_service_1.default.getAllWarehouse().then(warehouses => {
        for (let i = 0; i < warehouses.length; i++) {
            const leftOvers = {
                idWarehouse: String(warehouses[i]._id),
                balance: 0
            };
            arrLeftOver.push(leftOvers);
        }
        const balanceProduct = {
            barCode: Number(barCode),
            productId: String(productId),
            leftovers: arrLeftOver
        };
        return createBalance(balanceProduct);
    });
});
const createLeftOversOnTheWarehouse = (warehouseId) => __awaiter(void 0, void 0, void 0, function* () {
    yield getAllLeftOvers().then(balances => {
        const newLeftOver = {
            idWarehouse: warehouseId,
            balance: 0
        };
        for (let i = 0; i < balances.length; i++) {
            Balance_1.default.updateOne({ _id: balances[i]._id }, { $push: { leftovers: newLeftOver } }, { $new: true }).then(result => console.log(result)).catch(e => console.log(e.message));
        }
    });
});
const getBalanceForWarehouse = (warehouseId) => {
    return Balance_1.default.aggregate([
        { $unwind: '$leftovers' },
        { $match: { "leftovers.idWarehouse": warehouseId } },
        { $lookup: {
                from: 'products',
                localField: 'productId',
                foreignField: '_id',
                as: 'productId'
            }
        },
        { $unwind: '$productId' },
    ]);
};
const getBalanceProductAll = () => {
    return Balance_1.default.find().populate('productId').populate('leftovers.idWarehouse');
};
const getFullBalance = () => {
    return Balance_1.default.aggregate([
        { $lookup: {
                from: 'products',
                localField: 'productId',
                foreignField: '_id',
                as: 'products'
            }
        },
        { $unwind: '$products' },
    ]);
};
const updateBalanceOfSell = (productsBalance, warehouseId, isRemove = false) => __awaiter(void 0, void 0, void 0, function* () {
    for (let product of productsBalance) {
        let productCount;
        if (isRemove) {
            productCount = 0 - product.count;
        }
        else if (!isRemove) {
            productCount = product.count;
        }
        yield Balance_1.default.updateOne({ productId: product.productId }, { $inc: { "leftovers.$[element].balance": productCount } }, { arrayFilters: [{ "element.idWarehouse": { $eq: warehouseId } }] });
    }
});
const updateBalanceOfPurchase = (productsBalance, warehouseId, isRemove = true) => __awaiter(void 0, void 0, void 0, function* () {
    let productCount;
    for (let product of productsBalance) {
        if (!isRemove) {
            productCount = 0 - product.count;
        }
        else if (isRemove) {
            productCount = product.count;
        }
        yield Balance_1.default.updateOne({ productId: product.productId }, { $inc: { "leftovers.$[element].balance": productCount } }, { arrayFilters: [{ "element.idWarehouse": { $eq: warehouseId } }] });
    }
});
module.exports = {
    createBalanceForProduct,
    createBalance,
    getAllLeftOvers,
    createLeftOversOnTheWarehouse,
    getBalanceForWarehouse,
    getBalanceProductAll,
    getFullBalance,
    updateBalanceOfPurchase,
    updateBalanceOfSell
};
