import {ICash, ICashless} from "../interfeices";
import dateService from './date.service'
import cashService from './cash.service'
import cashlessService from './cashless.service';
import warehouseService from './warehouse.service'


const createCashAndCashless = async (warehouseId: string) => {
    const date = await dateService.getDateNow();

    const newCash: ICash = {
        idWarehouse: warehouseId,
        dateCash: date,
        balanceBeginning: 0,
        balanceEnding: 0,
        changesDay: 0,
        balanceCash: 0,
    };
    const newCashless: ICashless = {
        idWarehouse: warehouseId,
        dateCashless: date,
        balanceBeginning: 0,
        balanceEnding: 0,
        changesDay: 0,
        balanceCashless: 0,
    };
   return await cashService.createCash(newCash).then( cash => {
      return  cashlessService.createCashless(newCashless)
})
};

const updateCashAndCashless = async (idWarehouse: string, changeValue: number, cashAndCashless: string) => {
    if(cashAndCashless === 'Наличными') {
           await cashService.lastCashByWarehouse(idWarehouse).then( cash => {
               if(cash !== null) {
                  return  cashService.updateCash(cash, changeValue)
               }
        });
    } else if (cashAndCashless === 'Безналично') {
            await cashlessService.lashCashlessByWarehouse(idWarehouse).then( cashless=> {
                if(cashless !== null) {
               return  cashlessService.updateCashless(cashless, changeValue)
                }
            })
    }

};


const createNewDayCashing = async () => {
   const date =  dateService.getDateNow();
   await warehouseService.getAllWarehouse().then(warehouses => {
        for(let i = 0; i < warehouses.length; i++){
            cashlessService.lashCashlessByWarehouse(warehouses[i]._id).then(lastCashless => {
                if(lastCashless !== null) {
                    const newCashless: ICashless = {
                        idWarehouse: lastCashless.idWarehouse,
                        dateCashless: date,
                        balanceBeginning: lastCashless.balanceCashless,
                        balanceEnding: lastCashless.balanceCashless,
                        changesDay: 0,
                        balanceCashless: lastCashless.balanceCashless,
                    };
                    cashlessService.createCashless(newCashless).then( result => {
                        return result
                    })
                }
            });
            cashService.lastCashByWarehouse(warehouses[i]._id).then(lastCash => {
                if(lastCash !== null) {
                    const newCash: ICash = {
                        idWarehouse: lastCash.idWarehouse,
                        dateCash: date,
                        balanceBeginning: lastCash.balanceCash,
                        balanceEnding: lastCash.balanceCash,
                        changesDay: 0,
                        balanceCash: lastCash.balanceCash,
                    };
                    cashService.createCash(newCash).then( result => {
                        return result
                    })
                }
            })
        }
    })
};

export = {createCashAndCashless, updateCashAndCashless, createNewDayCashing }


