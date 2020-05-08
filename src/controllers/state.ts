import {Request, Response} from "express";
import stateService from '../shared/services/state-finance.service'
import messageService from '../shared/services/message.service'

const createStateIncome = async (req: Request, res: Response) => {
        const newStateIncome = {
            name: req.body.name
        };
        await stateService.createStateIncome(newStateIncome).then( state => {
            res.status(200).json(messageService.sendMessage(true, `Статья прихода ${req.body.name} успешно создана`))
        }).catch( e => res.status(200).json(messageService.sendMessage(false, e.message)))
};

const createStateExpenses = async (req: Request, res: Response) => {
    const newStateExpenses = {
        name: req.body.name
    };
    await stateService.createStateExpenses(newStateExpenses).then( state => {
        res.status(200).json(messageService.sendMessage(true, `Статья расхода ${req.body.name} успешно создана`))
    }).catch( e => res.status(200).json(messageService.sendMessage(false, e.message)))
};

const getAllStateIncome = async (req: Request, res: Response) => {
    await stateService.getStateIncome().then( state => {
        res.status(200).json(state)
    }).catch(e => console.log(e.message))
};

const getAllStateExpenses = async (req: Request, res: Response) => {
    await stateService.getStateExpenses().then( state => {
        res.status(200).json(state)
    }).catch(e => console.log(e.message))
};

const removeStateExpense = async (req: Request, res: Response) => {
        stateService.deleteExpenseState(String(req.params.id)).then( (result: any) => {
            res.status(200).json(messageService.sendMessage(true, 'Статья расхода успешно удалена!'))
        }).catch((e: Error) =>  {
            res.status(200).json(messageService.sendMessage(false, e.message))
        })
};

const removeStateIncome = async (req: Request, res: Response) => {
    stateService.deleteIncomeState(String(req.params.id)).then( (result: any) => {
        res.status(200).json(messageService.sendMessage(true, 'Статья прихода успешно удалена!'))
    }).catch((e: Error) => {
        res.status(200).json(messageService.sendMessage(false, e.message))
    })
};

export = { createStateIncome, createStateExpenses, getAllStateExpenses, getAllStateIncome, removeStateIncome, removeStateExpense  }
