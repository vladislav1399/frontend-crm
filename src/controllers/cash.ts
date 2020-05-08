import {Request, Response} from "express";
import cashService from '../shared/services/cash.service'

const getCashByWarehouse = async (req: Request, res: Response) => {
        await cashService.cashByWarehouse(req.params.id).then(cashes => {
            res.status(200).json(cashes)
        })
};

const getCashByDateForWarehouse = (req: Request, res: Response) => {
    const data = {
        dataOt: req.body.dataOt,
        dataDo: req.body.dataDo
    };
    let warehouseId = req.body.idWarehouse;
    cashService.findCashForDate(warehouseId, data).then(
        cashes => {
            res.status(200).json(cashes)
        }
    ).catch(e => {
        console.log(e);
        res.status(200).json(e.message);
    });
};


export = { getCashByWarehouse, getCashByDateForWarehouse }
