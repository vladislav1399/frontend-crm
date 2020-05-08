import Sale from "../../models/Sale";
import {ISale} from "../interfeices";


const createSale = (sale: ISale) => {
    return Sale.create(sale)
};

const fetchFromWarehouse = (warehouseId: string) => {
   return Sale.find({warehouse: warehouseId}).populate('user', 'name surname').populate('client', 'surname phone').sort({$natural: -1})
};

const getById = (saleId: string): any => {
   return  Sale.findById({_id: saleId}).populate('user', 'name surname').populate('client', 'name surname phone')
};

const saleCountStatistic = () => {
        return Sale.find()
};

const update = (sale: ISale, saleId: string) => {
    return Sale.updateOne({_id: saleId },
        {$set: { allAmount: sale.allAmount,
                cancellation: sale.cancellation,
                client: sale.client,
                date: sale.date,
                updatedDate: new Date(),
                productsSale: sale.productsSale,
                status:  sale.status,
                track:  sale.track,
                // @ts-ignore
                user: sale.user,
                warehouse: sale.warehouse}
        },
        {$new: true }
        )
};

const remove = (saleId: string) => {
    return Sale.remove({_id: String(saleId)})
};

const getAllAmountDifferenceSale = (sale: ISale, updateSale: ISale): {} => {
    let allA: number = 0;
    if (sale.allAmount > updateSale.allAmount) {
        allA = updateSale.allAmount - sale.allAmount;
    } else if (sale.allAmount < updateSale.allAmount) {
        allA = updateSale.allAmount - sale.allAmount;
    } else if (sale.allAmount === updateSale.allAmount) {
        allA = 0;
    }
    return  {allA}
};


export = {
    createSale,
    fetchFromWarehouse,
    getById,
    saleCountStatistic,
    update,
    remove,
    getAllAmountDifferenceSale,
}
