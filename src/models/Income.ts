import {createSchema, Type, typedModel} from "ts-mongoose";

const incomeSchema = createSchema({
    date: Type.mixed({required: true}),
    author: Type.objectId({required: true, ref: 'User'}),
    warehouseId: Type.objectId({ required: true, ref: 'Warehouse'}),
    stateIncome: Type.objectId({required: true, ref: 'IncomeState'}),
    cancellation: Type.string({required: true}),
    value: Type.number({required: true}),
    description: Type.string({required: true})
});

//     date: income.dateIncome,
//     author: income.authorIncome,
//     warehouseId: income.warehouseIncome,
//     stateIncome: income.incomeItem,
//     cancellation: нал или безнал,
//     value: income.amountIncome,

const Income = typedModel('Income', incomeSchema);
export default Income
