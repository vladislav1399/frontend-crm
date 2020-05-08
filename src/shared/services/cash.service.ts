import Cash from "../../models/Cash";
import {ICash} from "../interfeices";
import dateService from "./date.service";

const createCash = async (cash: ICash) => {
     return  await Cash.create(cash)
};

const cashByWarehouse = async (idWarehouse: string) => {
     return Cash.find({idWarehouse: idWarehouse}).sort({$natural: -1})
};

const lastCashByWarehouse = async (idWarehouse: string) => {
     return  Cash.findOne({idWarehouse: idWarehouse}).sort({$natural: -1}).limit(1)
};

const updateCash = (cash: ICash, amountChance: number) => {
       return  Cash.updateOne({_id: cash._id},
              { $inc: {
                        balanceCash: amountChance,
                        balanceEnding: amountChance,
                        changesDay: amountChance
                   }})
};

const findCashForDate = async (warehouseId: string, data: any) => {
    let dataOt = new Date(data.dataOt).toISOString();
    let dataDo = data.dataDo;
    const dateFinish = dateService.dateForSearch(dataDo);
    return Cash.find({idWarehouse: warehouseId,
        dateCash: {
            $gte: dataOt,
            $lt:  dateFinish
        }
    }
    )
};



export  = {createCash, cashByWarehouse, lastCashByWarehouse, updateCash, findCashForDate}
