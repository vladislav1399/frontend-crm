import Client from "../../models/Client";
import {IClient, ISale} from "../interfeices";
import Balance from "../../models/Balance";

const create = async (newClient: IClient) => {
    return await Client.create((newClient))
};

const getAllClient = () => {
    return Client.find()
};

const clientById = (clientId: string) => {
    return Client.findOne({_id: String(clientId)})
};

const update = (clientUpdated: any) => {
    return Client.updateOne({_id: String(clientUpdated._id)},
    {$set:
            {
                name: clientUpdated.name,
                surname: clientUpdated.surname,
                phone: clientUpdated.phone,
                discount: clientUpdated.discount
    }
    })
};

const plusSaleAmount = (sale: ISale) => {
        return  Client.updateOne( { _id: String(sale.client) },
            {$inc: { amountPurchase: sale.allAmount }})

};


export = {
    create,
    getAllClient,
    clientById,
    update,
    plusSaleAmount
}
