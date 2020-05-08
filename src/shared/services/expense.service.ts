import Expense from "../../models/Expenses";
import {IExpense} from "../interfeices";
import dateService from "./date.service";

const createNewExpense = async (expense: IExpense) => {
    return await Expense.create(expense)
};

const allExpenseByWarehouse = async (warehouseId: string) => {
    return Expense.find({warehouseId: warehouseId}).populate('author', 'surname name').populate('stateExpense', 'name').sort({$natural: -1});
};

const getExpensesByDate = async (warehouseId: string, date: any) => {
    let dateOt = new Date(date.dateOt).toISOString();
    let dateDo = date.dateDo;
    const dateFinish =  dateService.dateForSearch(dateDo);
    return Expense.find({warehouseId: warehouseId,
        date: {
            $gte: dateOt,
            $lt:  dateFinish
        }})
};

const deleteExpense = async (expenseId: string) => {
    return Expense.remove({_id: expenseId})
};

const findExpenseById = async (expenseId: string) => {
    return Expense.findOne({_id: expenseId})
};

export = {createNewExpense, allExpenseByWarehouse, getExpensesByDate, deleteExpense, findExpenseById}
