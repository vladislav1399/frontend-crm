import {createSchema, Type, typedModel} from "ts-mongoose";

const expensesSchema = createSchema({
        date: Type.mixed({required: true}),
        author: Type.objectId({required: true, ref: 'User'}),
        warehouseId: Type.objectId({ required: true, ref: 'Warehouse'}),
        stateExpense: Type.objectId({required: true, ref: 'ExpensesState'}),
        cancellation: Type.string({required: true}),
        value: Type.number({required: true}),
        description: Type.string({required: true})
});

const Expense = typedModel('Expenses', expensesSchema);
export default Expense
