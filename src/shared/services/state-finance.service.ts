import ExpensesState from "../../models/Expenses-state";
import IncomeState from "../../models/Income-state";
import {IStateExpenses, IStateIncome} from "../interfeices";

const createStateExpenses = async (state: IStateExpenses) => {
        return ExpensesState.create(state)
};
const getStateExpenses = async () => {
    return ExpensesState.find()
};

const createStateIncome = async (state: IStateIncome) => {
    return IncomeState.create(state)
};
const getStateIncome = async () => {
    return IncomeState.find()
};

const deleteIncomeState = (stateId: any) => {
    return IncomeState.remove({_id: stateId})
};

const deleteExpenseState = (stateId: any) => {
    return ExpensesState.remove({_id: stateId})
};


export = {createStateExpenses, createStateIncome, getStateIncome, getStateExpenses, deleteExpenseState, deleteIncomeState }
