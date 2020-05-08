import {createSchema, Type, typedModel} from "ts-mongoose";

const expensesStateSchema = createSchema({
    name: Type.string({required: true, index: {unique: true}})
});

const ExpensesState = typedModel('ExpensesState', expensesStateSchema);

export default ExpensesState
