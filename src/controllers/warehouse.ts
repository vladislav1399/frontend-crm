import {NextFunction, Request, Response} from "express";
import {IWarehouse} from "../shared/interfeices";
import warehouseService from "../shared/services/warehouse.service";
import messageService from '../shared/services/message.service'
import userService from '../shared/services/user.service'
import financeService from '../shared/services/finance.service'
import balanceService from '../shared/services/balance.service'

const getWarehouse = (req: Request, res: Response) => {
    warehouseService.getAllWarehouse().then(
        (warehouse: IWarehouse[]) => {
            res.status(200).json(warehouse)
        }).catch( (error: string) => console.log(error))
};
const createWarehouse = async (req: Request, res: Response) => {
    const newWarehouse: IWarehouse = { name: req.body.name };
    await warehouseService.createNewWarehouse(newWarehouse).then((warehouse: IWarehouse) => {
       const warehouseId: string =  String(warehouse._id);
        financeService.createCashAndCashless(warehouseId);
            warehouseService.getAllWarehouse().then(
                warehouses => {
                    if (warehouses.length === 1){
                        userService.updateUserWarehouseFirstLogin(warehouseId).then( result => {
                            res.status(200).json(messageService.sendMessage(true, `Новый склад ${req.body.name} был успешно создан` ))
                        }).catch( e => res.json(messageService.sendMessage(false, e.message)))
                    } else {
                        balanceService.createLeftOversOnTheWarehouse(warehouseId).then( (result: any) => {
                            res.status(200).json(messageService.sendMessage(true, `Новый склад ${req.body.name} был успешно создан`))
                        })
                    }
                }
            )
    }).catch(e => res.status(200).json(messageService.sendMessage(false, e.message)))
};

const getWarehouseById = (req: Request, res: Response, next: NextFunction ) => {
    console.log('req.params.id', req.params.id);
    warehouseService.getWarehouseNowId(req.params.id).then( warehouseNow => {
        console.log(warehouseNow);
        res.status(200).json(warehouseNow)
    }).catch(e => console.log(e))
};

export = {getWarehouse, createWarehouse, getWarehouseById}
