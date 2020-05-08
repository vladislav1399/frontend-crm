import {Request, Response} from "express";
import {IClient} from "../shared/interfeices";
import clientService from '../shared/services/client.service'
import messageService from  '../shared/services/message.service'

const createNewClient = (req: Request, res: Response) => {
    const client: IClient = req.body;
    clientService.create(client).then( result => {
        res.status(200).json(result  )
    }).catch(e => messageService.sendMessage(false, e.message))
};

const getClient = async (req: Request, res: Response) => {
   await clientService.getAllClient().then( clients => {
       res.status(200).json(clients)
   }).catch(e =>  res.status(200).json(e.message))
};

const getClientById = async (req: Request, res: Response) => {
    await clientService.clientById(req.params.id).then( (client: any) => {
        if(client) {
            res.status(200).json(client)
        }
    }).catch(e =>  res.status(200).json(e.message))
};

const updateClient = async (req: Request, res: Response) => {
   const clientUpdated = req.body;
    await clientService.update(clientUpdated).then( (result: any) => {
            res.status(200).json(messageService.sendMessage(true, 'Покупатель успешно обновлен'))
    }).catch(e =>  res.status(200).json(e.message))
};

export = {
    createNewClient,
    getClient,
    getClientById,
    updateClient,
}
