import {Request, Response} from "express";
import professionsService from "../shared/services/profession.service";
import messageService from '../shared/services/message.service'

const getAllProfessions = (req: Request, res: Response) => {
    professionsService.fetch().then(professions => {
        res.status(200).json(professions)
    }).catch(e => res.json(e.message));
};
const createProfessions = (req: Request, res: Response) => {
    professionsService.create(req.body).then(result => {
        res.status(200).json(messageService.sendMessage(true, `Новая должность ${result.professionName} успешно добавлена`))
    }).catch(e => res.json(messageService.sendMessage(false, e.message )));
};

const removeProfession = (req: Request, res: Response) => {
    professionsService.deleteProfession(String(req.params.id)).then( (result: any) => {
        res.status(200).json(messageService.sendMessage(true, `Должность успешно удалена!`))
    }).catch((e: Error) => {
        res.json(messageService.sendMessage(false, e.message ))
    } );
};


//ПОСТАВЩИКИ
const createSupplier = async (req: Request, res: Response) => {
        const newSupplier = req.body;
      await  professionsService.createSupplier(newSupplier).then(result => {
          console.log(result)
            res.status(200).json(messageService.sendMessage(true, `Поставщик успешно добавлен - ${result}`))
        }).catch(e => messageService.sendMessage(false, `Поставщик успешно добавлен - ${e.message}`) )
};

const getSupplier = async (req: Request, res: Response) => {
       await professionsService.getSupplier().then( supplier => {
            res.status(200).json(supplier)
        }).catch(e => res.status(200).json(e.message) )
};

export = {
    getAllProfessions,
    createProfessions,
    removeProfession,
    createSupplier,
    getSupplier
}


