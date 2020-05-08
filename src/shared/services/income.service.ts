import Income from "../../models/Income";
import {IIncome} from "../interfeices";
import dateService from './date.service'

const createNewIncome = async (income: IIncome) => {
   return Income.create(income)
};

const allIncomeByWarehouse = async (warehouseId: string) => {
    return Income.find({warehouseId: warehouseId}).populate('author', 'surname name').populate('stateIncome', 'name').sort({$natural: -1});
};

const getIncomeByDate = async (warehouseId: string, date: any) => {
    let dateOt = new Date(date.dateOt).toISOString();
    let dateDo = date.dateDo;
    const dateFinish =  dateService.dateForSearch(dateDo);
    return Income.find({warehouseId: warehouseId,
            date: {
            $gte: dateOt,
            $lt:  dateFinish
        }})
};

const deleteIncome = async (incomeId: string) => {
    return Income.remove({_id: incomeId})
};

const findIncomeById = async (incomeId: string) => {
    return Income.findOne({_id: incomeId})
};

export =  {createNewIncome, allIncomeByWarehouse, getIncomeByDate, deleteIncome, findIncomeById}
