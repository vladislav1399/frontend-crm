import {Request, Response} from "express";
import supplierService from "../shared/services/supplier.service";
import messageService from '../shared/services/message.service'
import {ISupplier} from "../shared/interfeices";
import dateService from '../shared/services/date.service'


//ПОСТАВЩИКИ
const createSupplier = async (req: Request, res: Response) => {
    const newSupplier = req.body;
    await  supplierService.createSupplier(newSupplier).then(result => {
        res.status(200).json(messageService.sendMessage(true, `Поставщик успешно добавлен`))
    }).catch( (e: Error) => messageService.sendMessage(false, e.message))
};

const getSuppliers = async (req: Request, res: Response) => {
    await supplierService.getSupplier().then( supplier => {
        res.status(200).json(supplier)
    }).catch(e => res.status(200).json(e.message))
};

const getSupplierById = async (req: Request, res: Response) => {
    let supplierId = req.params.id;
    await supplierService.supplierById(supplierId).then( supplier => {
        res.status(200).json(supplier)
    }).catch(e => res.status(200).json(e.message))
};


const removeSupplier = async (req: Request, res: Response) => {
    let supplierId = req.params.id;
    await supplierService.deleteSupplier(supplierId).then( result => {
        res.status(200).json(messageService.sendMessage(true, 'Поставщик успешно удален!'))
    }).catch(e =>res.status(200).json(messageService.sendMessage(false, e.message)))
};


const updateSupplier = async (req: Request, res: Response) => {
    let supplierId = req.params.id;
    let supplier: ISupplier = req.body;
    await supplierService.updateSupplierInfo(supplierId, supplier).then( result => {
        res.status(200).json(messageService.sendMessage(true, 'Поставщик успешно обновлен!'))
    }).catch(e =>res.status(200).json(messageService.sendMessage(false, e.message)))
};

const addCommit = async (req: Request, res: Response) => {
   const date = dateService.getDateNow();
    let supplierId = req.params.id;
   let review = req.body;
    review.date = date;
            supplierService.addReview(supplierId, review).then(  (result: any) => {
                res.status(200).json(messageService.sendMessage(true, 'Новая заметка успешно добавлена!'))
            }).catch((e: Error) =>res.status(200).json(messageService.sendMessage(false, e.message)))
};

const patchToBrandSupplier = async (req: Request, res: Response) => {
        let supplierId = req.params.id;
        let brand = req.body;


                // @ts-ignore
    supplierService.updateBrandsSupplier(supplierId, brand).then( result => {
        let message = '';
        if (brand.operator === '-') {
            message = `Бренд ${brand.brandName} успешно удален!`
        } else if(brand.operator === '+') {
            message = `Бренд ${brand.name} успешно добавлен!`
        }
                    res.status(200).json(messageService.sendMessage(true, message ));
                }).catch((e: Error) => {
        console.log( e.message)
        res.status(200).json(messageService.sendMessage(false, e.message))
    });

};

export = {
    createSupplier,
    getSuppliers,
    getSupplierById,
    removeSupplier,
    updateSupplier,
    addCommit,
    patchToBrandSupplier
}

