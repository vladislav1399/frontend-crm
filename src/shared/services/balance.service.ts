import Balance from "../../models/Balance";
import {IBalance, ILeftoversWarehouse} from "../interfeices";
import warehouseService from './warehouse.service'

const getAllLeftOvers = () => {
    return Balance.find()
};
const createBalance = (balance: IBalance) => {
    return Balance.create(balance)
};
const createBalanceForProduct = async (productId: string, barCode: number) => {
    let arrLeftOver: ILeftoversWarehouse[] = [];
    await warehouseService.getAllWarehouse().then(
        warehouses => {
            for (let i = 0; i < warehouses.length; i++) {
                const leftOvers: ILeftoversWarehouse = {
                    idWarehouse: String(warehouses[i]._id),
                    balance: 0
                };
                arrLeftOver.push(leftOvers)
            }
            const balanceProduct: IBalance = {
                barCode: Number(barCode),
                productId: String(productId),
                leftovers: arrLeftOver
            };
            return createBalance(balanceProduct)
        });
};
const createLeftOversOnTheWarehouse = async (warehouseId: string) => {
    await getAllLeftOvers().then( balances => {
        const newLeftOver: ILeftoversWarehouse = {
            idWarehouse: warehouseId,
            balance: 0
        };
        for(let i = 0; i < balances.length; i++) {
           Balance.updateOne({_id: balances[i]._id},
                { $push: {leftovers: newLeftOver}},  {$new: true}).then( result => console.log(result)).catch(e => console.log(e.message))
        }
    })
};
const getBalanceForWarehouse = (warehouseId: string) => {
    return       Balance.aggregate([
        {$unwind: '$leftovers'},
        {$match: {"leftovers.idWarehouse": warehouseId}},
        {$lookup: {
                from: 'products',
                localField: 'productId',
                foreignField: '_id',
                as: 'productId'
            }
        },
        {$unwind: '$productId'},
    ])
};
const getBalanceProductAll = () => {
    return  Balance.find().populate('productId').populate('leftovers.idWarehouse')
};
const getFullBalance = () => {
    return Balance.aggregate([
        {$lookup: {
                from: 'products',
                localField: 'productId',
                foreignField: '_id',
                as: 'products'
            }
        },
        {$unwind: '$products'},
    ])
};

const updateBalanceOfSell = async (productsBalance: any, warehouseId: string, isRemove: boolean = false) => {
        for (let product of productsBalance) {
            let productCount;
            if(isRemove) {
                productCount = 0 - product.count;
            } else if (!isRemove) {
                productCount = product.count;
            }
            await Balance.updateOne( { productId: product.productId },
                {$inc: { "leftovers.$[element].balance": productCount }},
                {arrayFilters: [ { "element.idWarehouse": {$eq: warehouseId } }]})
        }
};
const updateBalanceOfPurchase = async (productsBalance: any, warehouseId: string, isRemove: boolean = true) => {
    let productCount;
            for(let product of productsBalance) {
                if(!isRemove) {
                    productCount = 0 - product.count;
                } else if (isRemove) {
                    productCount = product.count;
                }
                await Balance.updateOne( { productId: product.productId },
                    {$inc: { "leftovers.$[element].balance": productCount }},
                    {arrayFilters: [ { "element.idWarehouse": {$eq: warehouseId } }]})
            }
};


export = {
    createBalanceForProduct,
    createBalance,
    getAllLeftOvers,
    createLeftOversOnTheWarehouse,
    getBalanceForWarehouse,
    getBalanceProductAll,
    getFullBalance,
    updateBalanceOfPurchase,
    updateBalanceOfSell

}


