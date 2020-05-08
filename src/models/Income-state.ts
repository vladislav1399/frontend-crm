import {createSchema, Type, typedModel} from "ts-mongoose";

const incomeStateSchema = createSchema({
    name: Type.string({ required: true, index: {unique: true}})
});

const IncomeState = typedModel('IncomeState', incomeStateSchema);

export default IncomeState
