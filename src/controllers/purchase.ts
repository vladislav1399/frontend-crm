import {Request, Response} from "express";
import {IPurchase, IPurchaseProduct} from "../shared/interfeices";
import purchaseService from '../shared/services/purchase.service'
import messageService from '../shared/services/message.service'
import balanceService from '../shared/services/balance.service'
import professionService from '../shared/services/profession.service'
import financeService from '../shared/services/finance.service'
import productService from '../shared/services/product.service'
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getPurchasesByWarehouse = async (req: Request, res: Response) => {
    const warehouseId: string = String(req.params.id);
   await purchaseService.getPurchase(warehouseId).then(purchases => {
       res.status(200).json(purchases)
   }).catch(e => res.status(200).json(e.message));
};

const getPurchaseById = async (req: Request, res: Response) => {
    purchaseService.purchaseById(String(req.params.id)).then(purchase => {
        res.status(200).json(purchase)
    }).catch(e => res.status(200).json(e.message));
};

const createPurchase = async (req: Request, res: Response) => {
        const newPurchase: any = req.body;
        const productsPurchase: IPurchaseProduct[] =  newPurchase.productPurchase;
        const warehouseId: string = newPurchase.warehouseId;
       await purchaseService.create(newPurchase).then( () => {
                balanceService.updateBalanceOfPurchase( productsPurchase, warehouseId).then(  () => {
                    professionService.updateSupplier(newPurchase.supplier, newPurchase.allAmount).then( () => {
                            financeService.updateCashAndCashless(newPurchase.warehouseId, 0 - newPurchase.allAmount, newPurchase.cancellation).then(() => {
                                    productService.updateProductsPurchasePrice(newPurchase.productPurchase);
                                res.status(200).json(messageService.sendMessage(true, `Закупка успешно добалена`))
                            }).catch(e => res.status(200).json(messageService.sendMessage(false, e.message)));
                    }).catch(e => res.status(200).json(messageService.sendMessage(false, e.message)));
                }).catch(e => res.status(200).json(messageService.sendMessage(false, e.message)));
        }).catch(e => res.status(200).json(messageService.sendMessage(false, e.message)));
};

const removePurchase = async (req: Request, res: Response) => {
    const purchaseId = ObjectId(req.params.id);
    purchaseService.purchaseById(purchaseId).then(  (purchase: any) => {
        const productsPurchase: any = purchase.productPurchase;
        const warehouseId = purchase.warehouseId;
        financeService.updateCashAndCashless(warehouseId, purchase.allAmount, purchase.cancellation).then(
            () => {
                purchaseService.removePurchase(purchaseId).then( result => {
                    balanceService.updateBalanceOfPurchase(productsPurchase, warehouseId, false ).then(result => {
                        res.status(200).json(messageService.sendMessage(true, 'Закупка была успешно удалена'))
                    }).catch( (e: Error) => res.status(200).json(messageService.sendMessage(true, 'Закупка была успешно удалена')) );
                })
            }
        ).catch( (err: Error) => res.status(200).json(messageService.sendMessage(false, err.message)))
    })
};

const getPurchaseForDate = (req: Request, res: Response) => {
    const data = {dateOt: req.body.dateOt, dateDo: req.body.dateDo};
    let warehouseId = req.body.warehouseId;
    purchaseService.getPurchaseByDate(warehouseId, data).then((purchases: any) => {
            res.status(200).json(purchases)
    }).catch((e: Error) => res.status(200).json(e.message))
};

const updatePurchase = async (req: Request, res: Response) => {
    const purchaseId = req.params.id;
    const updatedPurchase: IPurchase = req.body;
    const CCL = updatedPurchase.cancellation;
    purchaseService.purchaseById(String(purchaseId)).then((purchase: any) => {
        let reBalanceProducts = purchaseService.reBalanceProducts(purchase.productPurchase, updatedPurchase.productPurchase, true);
        let arrayToUpdate = purchaseService.newProductInArr(updatedPurchase.productPurchase, reBalanceProducts, true);
        let finishArrayProducts = purchaseService.removeProductsArr(purchase.productPurchase, arrayToUpdate, true);
        balanceService.updateBalanceOfPurchase(finishArrayProducts, updatedPurchase.warehouseId).then(result => {
            if (result !== null) {
                        let fn: any = purchaseService.getAllAmountDifference(purchase, updatedPurchase);
                        if(updatedPurchase.cancellation !== purchase.cancellation) {
                            financeService.updateCashAndCashless(updatedPurchase.warehouseId, purchase.allAmount,  purchase.cancellation).then( () => {
                                financeService.updateCashAndCashless(updatedPurchase.warehouseId,  0 - updatedPurchase.allAmount,  updatedPurchase.cancellation).then( () => {
                                })
                            })

                        }
                        financeService.updateCashAndCashless(updatedPurchase.warehouseId, fn.allA, CCL ).then(result => {
                            purchaseService.updatePurchase(String(purchaseId), updatedPurchase).then(result => {
                                res.status(200).json(messageService.sendMessage(true, 'Изменения в закупку успешно внесены'))
                            }).catch((err: Error) => res.status(200).json(messageService.sendMessage(false, err.message)));
                        }).catch((err: Error) => res.status(200).json(messageService.sendMessage(false, err.message)));
            }
        }).catch((err: Error) => res.status(200).json(messageService.sendMessage(false, err.message)));
    }).catch((err: Error) => res.status(200).json(messageService.sendMessage(false, err.message)));

};


export = {
    getPurchasesByWarehouse,
    getPurchaseById,
    createPurchase,
    updatePurchase,
    removePurchase,
    getPurchaseForDate,
}
