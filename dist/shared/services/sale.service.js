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
const reBalanceSale = (productsSale, productsSaleUpdate) => {
    let reBalanceOfSaleCount = [];
    let balanceProduct;
    for (const productSale of productsSale) {
        for (const productUpdate of productsSaleUpdate) {
            balanceProduct = '';
            if (String(productUpdate.productId) === String(productSale.productId)) {
                let updProdCount = productUpdate.count;
                let prodCount = productSale.count;
                if (updProdCount !== prodCount) {
                    balanceProduct = {
                        productId: productUpdate.productId,
                        count: updProdCount - prodCount,
                    };
                }
                else if (updProdCount === prodCount) {
                    balanceProduct = {
                        productId: productUpdate.productId,
                        count: 0,
                    };
                }
            }
            if (balanceProduct !== '') {
                reBalanceOfSaleCount.push(balanceProduct);
                balanceProduct = '';
            }
        }
    }
    return reBalanceOfSaleCount;
};
const getAllAmountDifferenceSale = (sale, updateSale) => {
    let allA;
    let operator = '-';
    if (sale.allAmount > updateSale.allAmount) {
        allA = sale.allAmount - updateSale.allAmount;
        operator = '-';
    }
    else if (sale.allAmount < updateSale.allAmount) {
        allA = updateSale.allAmount - sale.allAmount;
        operator = '+';
    }
    else {
        allA = 0;
    }
    return { allA, operator };
};
const reBalanceUpdateAddNewSaleProduct = (productsSale, addProductsArr) => {
    for (const prodSale of productsSale) {
        for (const addProduct of addProductsArr) {
            if (String(addProduct.productId) === String(prodSale.productId)) {
                addProductsArr.splice(addProductsArr.indexOf(addProduct), 1);
            }
        }
    }
    return addProductsArr;
};
module.exports = {
    createSale,
    fetchFromWarehouse,
    getById,
    saleCountStatistic,
    update,
    remove,
    reBalanceSale,
    getAllAmountDifferenceSale,
    reBalanceUpdateAddNewSaleProduct,
};
