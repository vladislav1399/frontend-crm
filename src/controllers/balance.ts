import {Request, Response} from "express";
import balanceService from '../shared/services/balance.service'
import {IBalance} from "../shared/interfeices";
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const getBalanceProduct = async (req: Request, res: Response) => {
        balanceService.getBalanceProductAll().then((balances: any) => {
            res.status(200).json(balances)
        });
};

const getBalanceProductForWarehouse = (req: Request, res: Response) => {
        const warehouseId = ObjectId(req.params.id);
        balanceService.getBalanceForWarehouse(warehouseId).then( (productAndLeftovers: any) => {
        res.status(200).json(productAndLeftovers)
    }).catch((e: Error) => console.log(e.message))
};

const getFullBalanceAllProducts = async (req: Request, res: Response) => {
        await balanceService.getFullBalance().then( (balances: IBalance[]) => {
            for(const balance of balances) {
                balance.fullBalance = 0;
                for(let i = 0; i < balance.leftovers.length; i++) {
                    balance.fullBalance += balance.leftovers[i].balance
                }
            }
            res.status(200).json(balances)
        }).catch((e: Error) => console.log(e.message))
};


export = {
    getBalanceProduct,
    getBalanceProductForWarehouse,
    getFullBalanceAllProducts
}
