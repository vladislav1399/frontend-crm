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
    if (purchase.allAmount > updatedPurchase.allAmount) {
        allA = purchase.allAmount - updatedPurchase.allAmount;
    }
    else if (purchase.allAmount < updatedPurchase.allAmount) {
        allA = purchase.allAmount - updatedPurchase.allAmount;
    }
    else {
        allA = 0;
    }
    console.log('allA', allA);
    return { allA };
};
const reBalanceProducts = (products, productsUpdate, isOperation) => {
    let newArr = [];
    for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < productsUpdate.length; j++) {
            let min = 0, max = 0, result = 0, element;
            if (products[i].productId === productsUpdate[j].productId) {
                if (products[i].count > productsUpdate[j].count) {
                    max = products[i].count;
                    min = productsUpdate[j].count;
                    if (!isOperation) {
                        result = max - min;
                    }
                    if (isOperation) {
                        result = min - max;
                    }
                }
                else if (products[i].count < productsUpdate[j].count) {
                    max = productsUpdate[j].count;
                    min = products[i].count;
                    if (!isOperation) {
                        result = min - max;
                    }
                    if (isOperation) {
                        result = max - min;
                    }
                }
                else if (products[i].count === productsUpdate[j].count) {
                    result = 0;
                }
                element = {
                    productId: products[i].productId,
                    count: result
                };
                newArr.push(element);
            }
        }
    }
    return newArr;
};
const newProductInArr = (productsPurchaseUpdate, reBalanceArr, isOperator) => {
    for (let i = 0; i < reBalanceArr.length; i++) {
        const candidate = productsPurchaseUpdate.find((prod) => prod.productId === reBalanceArr[i].productId);
        if (candidate) {
            productsPurchaseUpdate.splice(productsPurchaseUpdate.indexOf(candidate), 1);
        }
    }
    return addNewProductToArray(productsPurchaseUpdate, reBalanceArr, isOperator);
};
const addNewProductToArray = (productsPurchaseUpdate, reBalanceArr, isOperator) => {
    for (let i = 0; i < productsPurchaseUpdate.length; i++) {
        let countProduct;
        if (isOperator) {
            countProduct = productsPurchaseUpdate[i].count;
        }
        else if (!isOperator) {
            countProduct = 0 - productsPurchaseUpdate[i].count;
        }
        let element = {
            productId: productsPurchaseUpdate[i].productId,
            count: countProduct
        };
        reBalanceArr.push(element);
    }
    return reBalanceArr;
};
const removeProductsArr = (productsPurchase, reBalanceArr, isOperator) => {
    for (let i = 0; i < reBalanceArr.length; i++) {
        const candidate = productsPurchase.find((prod) => prod.productId === reBalanceArr[i].productId);
        if (candidate) {
            productsPurchase.splice(productsPurchase.indexOf(candidate), 1);
        }
    }
    return addRemoveProductsToArray(productsPurchase, reBalanceArr, isOperator);
};
const addRemoveProductsToArray = (productsPurchase, reBalanceArr, isOperator) => {
    for (let i = 0; i < productsPurchase.length; i++) {
        let countProduct;
        if (!isOperator) {
            countProduct = productsPurchase[i].count;
        }
        else if (isOperator) {
            countProduct = 0 - productsPurchase[i].count;
        }
        let element = {
            productId: productsPurchase[i].productId,
            count: countProduct
        };
        reBalanceArr.push(element);
    }
    return reBalanceArr;
};
module.exports = {
    purchaseById,
    create,
    getPurchase,
    updatePurchase,
    removePurchase,
    getPurchaseByDate,
    getAllAmountDifference,
    reBalanceProducts,
    newProductInArr,
    removeProductsArr,
};
