"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Sale_1 = __importDefault(require("../../models/Sale"));
const createSale = (sale) => {
    return Sale_1.default.create(sale);
};
const fetchFromWarehouse = (warehouseId) => {
    return Sale_1.default.find({ warehouse: warehouseId }).populate('user', 'name surname').populate('client', 'surname phone').sort({ $natural: -1 });
};
const getById = (saleId) => {
    return Sale_1.default.findById({ _id: saleId }).populate('user', 'name surname').populate('client', 'name surname phone');
};
const saleCountStatistic = () => {
    return Sale_1.default.find();
};
const update = (sale, saleId) => {
    return Sale_1.default.updateOne({ _id: saleId }, { $set: { allAmount: sale.allAmount,
            cancellation: sale.cancellation,
            client: sale.client,
            date: sale.date,
            updatedDate: new Date(),
            productsSale: sale.productsSale,
            status: sale.status,
            track: sale.track,
            // @ts-ignore
            user: sale.user,
            warehouse: sale.warehouse }
    }, { $new: true });
};
const remove = (saleId) => {
    return Sale_1.default.remove({ _id: String(saleId) });
};
const getAllAmountDifferenceSale = (sale, updateSale) => {
    let allA = 0;
    if (sale.allAmount > updateSale.allAmount) {
        allA = updateSale.allAmount - sale.allAmount;
    }
    else if (sale.allAmount < updateSale.allAmount) {
        allA = updateSale.allAmount - sale.allAmount;
    }
    else if (sale.allAmount === updateSale.allAmount) {
        allA = 0;
    }
    return { allA };
};
module.exports = {
    createSale,
    fetchFromWarehouse,
    getById,
    saleCountStatistic,
    update,
    remove,
    getAllAmountDifferenceSale,
};
