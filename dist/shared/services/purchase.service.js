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
const Purchase_1 = __importDefault(require("../../models/Purchase"));
const date_service_1 = __importDefault(require("./date.service"));
const create = (newPurchase) => __awaiter(void 0, void 0, void 0, function* () {
    return Purchase_1.default.create(newPurchase);
});
const getPurchase = (warehouseId) => __awaiter(void 0, void 0, void 0, function* () {
    return Purchase_1.default.find({ warehouseId: warehouseId })
        .populate('warehouseId', 'name')
        .populate('supplier', 'name surname')
        .populate('user', 'name surname')
        .sort({ $natural: -1 });
});
const purchaseById = (purchaseId) => __awaiter(void 0, void 0, void 0, function* () {
    return Purchase_1.default.findOne({ _id: purchaseId })
        .populate('warehouseId', 'name')
        .populate('supplier', 'name surname')
        .populate('user', 'name surname')
        .sort({ $natural: -1 });
});
const updatePurchase = (purchaseId, purchase) => __awaiter(void 0, void 0, void 0, function* () {
    return Purchase_1.default.updateOne({ _id: purchaseId }, {
        $set: {
            updatedDate: purchase.updatedDate,
            productPurchase: purchase.productPurchase,
            allAmount: purchase.allAmount,
            cancellation: purchase.cancellation,
            status: purchase.status,
            track: purchase.track
        }
    });
});
const removePurchase = (purchaseId) => {
    return Purchase_1.default.remove({ _id: purchaseId });
};
const getPurchaseByDate = (warehouseId, date) => {
    let dateOt = new Date(date.dateOt).toISOString();
    let dateDo = date.dateDo;
    const dateFinish = date_service_1.default.dateForSearch(dateDo);
    return Purchase_1.default.find({ warehouseId: warehouseId,
        date: {
            $gte: dateOt,
            $lt: dateFinish
        } });
};
const getAllAmountDifference = (purchase, updatedPurchase) => {
    let allA;
    let op = '+';
    if (purchase.allAmount > updatedPurchase.allAmount) {
        allA = purchase.allAmount - updatedPurchase.allAmount;
        op = '+';
    }
    else if (purchase.allAmount < updatedPurchase.allAmount) {
        allA = updatedPurchase.allAmount - purchase.allAmount;
        op = '-';
    }
    else {
        allA = 0;
    }
    return { allA, op };
};
const reBalanceUpdateForAddNewProduct = (productsPurchase, addProductPurchase) => {
    for (const productPurchase of productsPurchase) {
        for (const addProduct of addProductPurchase) {
            if (String(addProduct.productId) === String(productPurchase.productId)) {
                addProductPurchase.splice(addProductPurchase.indexOf(addProduct), 1);
            }
        }
    }
    return addProductPurchase;
};
const reBalancePurchase = (productsPurchase, productsPurchaseUpdate) => {
    let reBalanceOfPurchaseCount = [];
    let balanceProduct;
    for (const productPurchase of productsPurchase) {
        for (const productUpdatedPurchase of productsPurchaseUpdate) {
            balanceProduct = 0;
            if (String(productUpdatedPurchase.productId) === String(productPurchase.productId)) {
                let updProdCount = productUpdatedPurchase.count;
                let prodCount = productPurchase.count;
                if (updProdCount !== prodCount) {
                    balanceProduct = {
                        productId: productUpdatedPurchase.productId,
                        count: updProdCount - prodCount,
                    };
                }
                else if (updProdCount === prodCount) {
                    balanceProduct = {
                        productId: productUpdatedPurchase.productId,
                        count: 0,
                    };
                }
            }
            if (balanceProduct !== 0) {
                reBalanceOfPurchaseCount.push(balanceProduct);
                balanceProduct = 0;
            }
        }
    }
    return reBalanceOfPurchaseCount;
};
module.exports = {
    purchaseById,
    create,
    getPurchase,
    updatePurchase,
    removePurchase,
    getPurchaseByDate,
    getAllAmountDifference,
    reBalancePurchase,
    reBalanceUpdateForAddNewProduct
};
