import {Request, Response} from "express";
import cashlessService from '../shared/services/cashless.service'

const getCashlessByWarehouse =  async (req: Request, res: Response) => {
    cashlessService.cashlessByWarehouse(req.params.id).then(
        cashless => {
            res.status(200).json(cashless)
        }
    )
};

const getCashlessByDate = async (req: Request, res: Response) => {
    const data = {
        dataOt: req.body.dataOt,
        dataDo: req.body.dataDo
    };
    let warehouseId = req.body.idWarehouse;
    cashlessService.findCashlessForDate(warehouseId, data).then(
        cashless => {
            res.status(200).json(cashless)
        }
    ).catch(e => {
        console.log(e);
        res.status(200).json(e.message);
    });
};


export = {getCashlessByWarehouse, getCashlessByDate}
