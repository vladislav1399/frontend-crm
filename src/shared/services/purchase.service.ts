import Purchase from "../../models/Purchase";
import {IPurchase, ISale} from "../interfeices";
import dateService from "./date.service";

const create = async (newPurchase: any) => {
       return  Purchase.create(newPurchase)
};

const getPurchase = async (warehouseId: string) => {
        return Purchase.find({warehouseId: warehouseId})
            .populate('warehouseId', 'name')
            .populate('supplier', 'name surname')
            .populate('user', 'name surname')
            .sort({$natural: -1})
};

const purchaseById = async (purchaseId: string) => {
    return Purchase.findOne({_id: purchaseId})
        .populate('warehouseId', 'name')
        .populate('supplier', 'name surname')
        .populate('user', 'name surname')
        .sort({$natural: -1})
};

const updatePurchase = async (purchaseId: string,  purchase: IPurchase) => {
    return Purchase.updateOne({_id: purchaseId},
        {
            $set: {
                updatedDate: purchase.updatedDate,
                productPurchase: purchase.productPurchase,
                allAmount: purchase.allAmount,
                cancellation: purchase.cancellation,
                status: purchase.status,
                track: purchase.track
            }
        })
};

const removePurchase = (purchaseId: any) => {
    return Purchase.remove({_id: purchaseId})
};

const getPurchaseByDate = (warehouseId: string, date: any) => {
    let dateOt = new Date(date.dateOt).toISOString();
    let dateDo = date.dateDo;
    const dateFinish =  dateService.dateForSearch(dateDo);
    return Purchase.find({warehouseId: warehouseId,
        date: {
            $gte: dateOt,
            $lt:  dateFinish
        }})
};


const getAllAmountDifference = (purchase: IPurchase, updatedPurchase: IPurchase): {} => {
    let allA: number;
    if (purchase.allAmount > updatedPurchase.allAmount) {
        allA = purchase.allAmount - updatedPurchase.allAmount;
    } else if (purchase.allAmount < updatedPurchase.allAmount) {
        allA = purchase.allAmount - updatedPurchase.allAmount;
    } else {
        allA = 0;
    }
    console.log('allA', allA);
    return  {allA}
};






const reBalanceProducts = (products: any, productsUpdate: any, isOperation: boolean): [] => {
    let newArr: any = [];
    for(let i = 0; i < products.length; i++) {
        for(let j = 0; j < productsUpdate.length; j++) {
            let min = 0, max = 0, result = 0, element;
            if(products[i].productId === productsUpdate[j].productId) {
                if(products[i].count > productsUpdate[j].count) {
                    max = products[i].count;
                    min = productsUpdate[j].count;
                    if(!isOperation) {
                        result = max - min
                    }
                    if(isOperation) {
                        result = min - max
                    }
                } else if(products[i].count < productsUpdate[j].count) {
                    max = productsUpdate[j].count;
                    min = products[i].count;
                    if(!isOperation) {
                        result = min - max
                    }
                    if(isOperation) {
                        result = max - min
                    }
                } else if(products[i].count === productsUpdate[j].count) {
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
    return newArr
};

const newProductInArr = ( productsPurchaseUpdate: any, reBalanceArr: any,  isOperator: boolean) => {
    for(let i = 0; i < reBalanceArr.length; i++) {
        const candidate = productsPurchaseUpdate.find( (prod: any) => prod.productId === reBalanceArr[i].productId);
        if(candidate) {
            productsPurchaseUpdate.splice(productsPurchaseUpdate.indexOf(candidate)  ,1)
        }
    }
    return addNewProductToArray(productsPurchaseUpdate, reBalanceArr, isOperator)
};

const addNewProductToArray = (productsPurchaseUpdate: any, reBalanceArr: any,  isOperator: boolean) => {
    for(let i = 0; i < productsPurchaseUpdate.length; i++) {
        let countProduct;
        if(isOperator) {
            countProduct = productsPurchaseUpdate[i].count
        } else if(!isOperator) {
            countProduct = 0 - productsPurchaseUpdate[i].count
        }
        let element = {
            productId: productsPurchaseUpdate[i].productId,
            count: countProduct
        };
        reBalanceArr.push(element)
    }
    return reBalanceArr
};

const removeProductsArr = (productsPurchase: any, reBalanceArr: any, isOperator: boolean) => {
    for(let i = 0; i < reBalanceArr.length; i++) {
        const candidate = productsPurchase.find( (prod: any) => prod.productId === reBalanceArr[i].productId);
        if(candidate) {
            productsPurchase.splice(productsPurchase.indexOf(candidate), 1)
        }
    }
    return addRemoveProductsToArray(productsPurchase, reBalanceArr,  isOperator)
};

const addRemoveProductsToArray = (productsPurchase: any, reBalanceArr: any,  isOperator: boolean) => {


    for(let i = 0; i < productsPurchase.length; i++) {
        let countProduct;
        if(!isOperator) {
            countProduct = productsPurchase[i].count
        } else if (isOperator) {
            countProduct = 0 - productsPurchase[i].count
        }
        let element = {
            productId: productsPurchase[i].productId,
            count: countProduct
        };
        reBalanceArr.push(element)
    }
    return  reBalanceArr
};




export = {
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
}
