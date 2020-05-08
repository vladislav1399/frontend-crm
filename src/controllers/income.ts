import { Request, Response} from "express";
import incomeService from '../shared/services/income.service'
import {IIncome} from "../shared/interfeices";
import dateService from "../shared/services/date.service";
import messageService from "../shared/services/message.service";
import financeService from "../shared/services/finance.service";

const createIncome = async (req: Request, res: Response) => {
    const date = dateService.getDateNow();
    const newIncome: IIncome = req.body;
    newIncome.date = date;
    incomeService.createNewIncome(newIncome).then( income => {
        financeService.updateCashAndCashless(String(income.warehouseId), income.value,  income.cancellation ).then( result => {
            res.status(200).json(messageService.sendMessage(true, `приход на суму ${income.value} был успешно добавлен`))
        }).catch( e => res.status(200).json(messageService.sendMessage(false, e.message)));
    }).catch( e => res.status(200).json(messageService.sendMessage(false, e.message)))
};

const getIncomeByWarehouse = (req: Request, res: Response) => {
        incomeService.allIncomeByWarehouse(req.params.id).then(
            incomes => {
                res.status(200).json(incomes)
            }
        )
};

const getIncomeByDateForWarehouse = (req: Request, res: Response) => {
    let dateOt = req.body.dateOt;
    let dateDo = req.body.dateDo;
    const data = {
        dateOt,
        dateDo
    };
    let warehouseId = req.body.warehouseId;
    incomeService.getIncomeByDate(warehouseId, data).then(
        incomes => {
            res.status(200).json(incomes)
        }
    ).catch(e => res.status(200).json(e.message))
};

const removeIncome = (req: Request, res: Response) => {
    incomeService.findIncomeById(req.params.id).then(  income => {
        if(!income) {
        } else {
            incomeService.deleteIncome(req.params.id).then(result => {
                financeService.updateCashAndCashless(String(income.warehouseId), 0 - income.value,  income.cancellation ).then(result => {
                    res.status(200).json(messageService.sendMessage(true, 'Приход успешно удален!'))
                });
            }).catch(e => res.status(200).json(messageService.sendMessage(false, e.message)))
        }
    }).catch(e => res.status(200).json(messageService.sendMessage(false, e.message)))
};


export  = {createIncome, getIncomeByWarehouse, getIncomeByDateForWarehouse, removeIncome}
