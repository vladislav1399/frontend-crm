import {Request, Response} from "express";
import saleService from '../shared/services/sale.service'
import balanceService from '../shared/services/balance.service'
import messageService from '../shared/services/message.service'
import financeService from '../shared/services/finance.service'
import { ISale, ISaleProduct} from "../shared/interfeices";
import clientService from '../shared/services/client.service'
import userService from '../shared/services/user.service'
import dateService from '../shared/services/date.service';
import purchaseService from '../shared/services/purchase.service'

const getSaleByWarehouse = (req: Request, res: Response) => {
    saleService.fetchFromWarehouse(req.params.id).then( (sales: any) => {
        res.status(200).json(sales)
    })
};
const getSaleById = (req: Request, res: Response) => {
    let saleId = req.params.id;
    saleService.getById(saleId).then( (sale: any) => {
        res.status(200).json(sale)
    })
};
const getSaleCount = (req: Request, res: Response) => {
    saleService.saleCountStatistic().then((sales: any) => {
        res.status(200).json(sales)
    })
};

const createNewSale = (req: Request, res: Response) => {
    const newSale: ISale = req.body;
    clientService.plusSaleAmount(newSale).then(() => {
        userService.plusUserSaleAmount(newSale).then( () => {
            saleService.createSale(newSale).then( (sale: any ) => {
                balanceService.updateBalanceOfSell(newSale.productsSale, newSale.warehouse, true).then( () => {
                    financeService.updateCashAndCashless(newSale.warehouse, newSale.allAmount,  newSale.cancellation).then( result => {
                        res.status(200).json(messageService.sendMessage(true, 'Продажа успешно создана'))
                    }).catch(e => res.status(200).json(messageService.sendMessage(false, e.message)))
                }).catch(e => console.log(e.message))
            }).catch((e: Error ) => console.log(e.message))
        })
    })
};

const updateSale = async (req: Request, res: Response) => {
    const saleId: string = req.params.id;
    const newSale: ISale = req.body; // моя отредактированая продажа
    const CCL = newSale.cancellation; // форма оплаты
    const productsSaleUpdate: ISaleProduct[] = newSale.productsSale; // отредактированые актуальные товары
    const warehouseId: string = newSale.warehouse;
    newSale.updatedDate = dateService.getDateNow();
    saleService.getById(saleId).then((sale: ISale) => {
        let oldProductSale: ISaleProduct[] = sale.productsSale; // получаю продажу для сравнения изменений
        let reBalanceProductsArray = purchaseService.reBalanceProducts(oldProductSale, productsSaleUpdate, false);
        let arrayToUpdateSale = purchaseService.newProductInArr(productsSaleUpdate, reBalanceProductsArray, false);
        let finishArrayProductsSale = purchaseService.removeProductsArr(oldProductSale, arrayToUpdateSale, false);
        let fn: any = saleService.getAllAmountDifferenceSale(sale, newSale);
            balanceService.updateBalanceOfSell(finishArrayProductsSale, warehouseId).then( () => {
                if (newSale.cancellation !== sale.cancellation) {
                    financeService.updateCashAndCashless(newSale.warehouse, 0 - sale.allAmount,  sale.cancellation).then( () => {
                        financeService.updateCashAndCashless(newSale.warehouse,  newSale.allAmount,  newSale.cancellation).then( () => {
                        }).catch((e: Error) => res.status(200).json(messageService.sendMessage(false, e.message)))
                    }).catch((e: Error) => res.status(200).json(messageService.sendMessage(false, e.message)))
                }
                financeService.updateCashAndCashless(newSale.warehouse, fn.allA,  CCL ).then(() => {
                    saleService.update(newSale, String(sale._id)).then(() => {
                        res.status(200).json(messageService.sendMessage(true, 'Продажа успешно обновлена!'))
                    }).catch((e: Error) => res.status(200).json(messageService.sendMessage(false, e.message)))
                }).catch((e: Error) => res.status(200).json(messageService.sendMessage(false, e.message)))
            });
    }).catch((e: Error) => res.status(200).json(messageService.sendMessage(false, e.message)))};

const deleteSale = (req: Request, res: Response) => {
    const saleId: string = req.params.id;
    saleService.getById(saleId).then( (sale: ISale) => {
        const saleProducts: ISaleProduct[] = sale.productsSale;
        const warehouseId: string = sale.warehouse;
        financeService.updateCashAndCashless(warehouseId, 0 - sale.allAmount,  sale.cancellation).then( () => {
                saleService.remove(saleId).then( () => {
                    balanceService.updateBalanceOfSell(saleProducts, warehouseId ).then( () => {
                        res.status(200).json(messageService.sendMessage(true, 'Продажа успешно удалена'))
                    }).catch( (e: Error) => res.status(200).json(messageService.sendMessage(true, 'Продажа была успешно удалена')) );
                }).catch( (err: Error) => res.status(200).json(messageService.sendMessage(false, err.message)))
            }).catch( (err: Error) => res.status(200).json(messageService.sendMessage(false, err.message)))
    });
};



export = {
    createNewSale,
    getSaleByWarehouse,
    getSaleById,
    getSaleCount,
    updateSale,
    deleteSale,

};
