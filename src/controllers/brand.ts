import {Request, Response} from "express";
import brandService from '../shared/services/brand.service'
import {IBrand} from "../shared/interfeices";
import messageService from '../shared/services/message.service'

const createBrand = async (req: Request, res: Response) => {
    const newBrand: IBrand = { name: req.body.name };
    brandService.create(newBrand).then(result => {
        res.status(200).json(messageService.sendMessage(true, 'Новая торговая марка успешно создана'))
    }).catch(e => res.status(200).json(messageService.sendMessage(false, e.message)))
};

const getAllBrand = async (req: Request, res: Response) => {
    brandService.getAllBrand().then(brands => {
        res.status(200).json(brands)
    }).catch(e => res.status(200).json(e.message))
};

const removeBrand = (req: Request, res: Response) => {
    brandService.deleteBrand(String(req.params.id)).then( result => {
        res.status(200).json(messageService.sendMessage(true, 'Торговая марка успешно была удалена!') )
    }).catch(e => res.status(200).json(messageService.sendMessage(false, e.message) ))
};



export = {
    createBrand,
    getAllBrand,
    removeBrand,
}
