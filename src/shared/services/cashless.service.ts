import Cashless from "../../models/Cashless";
import {ICashless} from "../interfeices";
import dateService from "./date.service";

const createCashless = async (cashless: ICashless) => {
       return  await Cashless.create(cashless)
};

const cashlessByWarehouse = async (idWarehouse: string) => {
       return Cashless.find({idWarehouse: idWarehouse}).sort({$natural: -1})
};

const lashCashlessByWarehouse = async (idWarehouse: string) => {
      return Cashless.findOne({idWarehouse: idWarehouse}).sort({$natural: -1}).limit(1)
};

const updateCashless = async (cashless: ICashless, amountChance: number) => {
    console.log('amountChance', amountChance);
       return Cashless.updateOne({_id: cashless._id},
           { $inc: {
                         balanceCashless: amountChance,
                         balanceEnding: amountChance,
                         changesDay: amountChance
                  }})
};

const findCashlessForDate = async (warehouseId: string, data: any) => {
    let dataOt = new Date(data.dataOt).toISOString();
    let dataDo = data.dataDo;
    const dateFinish = dateService.dateForSearch(dataDo);
    return Cashless.find({idWarehouse: warehouseId,
        dateCashless: {
                $gte: dataOt,
                $lt:  dateFinish
            }
        })
};


export = { createCashless, cashlessByWarehouse, lashCashlessByWarehouse, updateCashless, findCashlessForDate }
