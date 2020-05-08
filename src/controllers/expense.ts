import { Request, Response} from "express";
import expensesService from '../shared/services/expense.service'
import dateService from  '../shared/services/date.service'
import messageService from '../shared/services/message.service'
import {IExpense} from "../shared/interfeices";
import financeService from "../shared/services/finance.service";

const createExpense = async (req: Request, res: Response) => {
    const date = dateService.getDateNow();
    const newExpense: IExpense = req.body;
    newExpense.date = date;
    expensesService.createNewExpense(newExpense).then( expense => {
        financeService.updateCashAndCashless(String(expense.warehouseId), 0 - expense.value,  expense.cancellation ).then( result => {
            res.status(200).json(messageService.sendMessage(true, `расход на суму ${expense.value} был успешно добавлен`))
        }).catch( e => res.status(200).json(messageService.sendMessage(false, e.message)));
    }).catch( e => res.status(200).json(messageService.sendMessage(false, e.message)))
};

const getExpensesByWarehouse = (req: Request, res: Response) => {
    expensesService.allExpenseByWarehouse(req.params.id).then(
        expenses => {
            res.status(200).json(expenses)
        }
    )
};


const getExpensesByDateForWarehouse = (req: Request, res: Response) => {
    let dateOt = req.body.dateOt;
    let dateDo = req.body.dateDo;
    const data = {
        dateOt,
        dateDo
    };
    let warehouseId = req.body.warehouseId;
    expensesService.getExpensesByDate(warehouseId, data).then(
        expenses => {
            res.status(200).json(expenses)
        }
    ).catch(e => res.status(200).json(e.message))
};


const removeExpense = (req: Request, res: Response) => {
    expensesService.findExpenseById(req.params.id).then(expense => {
        if(!expense){
        } else {
            expensesService.deleteExpense(req.params.id).then(result => {
                financeService.updateCashAndCashless(String(expense.warehouseId), expense.value, expense.cancellation).then( result => {
                    console.log(result)
                    res.status(200).json(messageService.sendMessage(true, 'Расход успешно удален!'))
                })
            }).catch(e => console.log(e))
        }
    });
};

export = {createExpense, getExpensesByWarehouse, getExpensesByDateForWarehouse, removeExpense}
