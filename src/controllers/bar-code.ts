import {Request, Response} from "express";
import barCodeService from "../shared/services/barcode.service";

const getLastBarCode = (req: Request, res: Response) => {
    barCodeService.getLastBarCode().then(newBarCode => {
        res.status(200).json(newBarCode)
    });
};

export = {
    getLastBarCode
}


