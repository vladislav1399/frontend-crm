import {createSchema, Type, typedModel} from "ts-mongoose";

const cashlessSchema = createSchema({
    idWarehouse: Type.objectId({required: true, ref: 'Warehouse'}),
    dateCashless: Type.mixed({required: true}),
    balanceBeginning: Type.number({required: true}),
    balanceEnding: Type.number({required: true}),
    changesDay: Type.number({required: true}),
    balanceCashless: Type.number({required: true})
});
const Cashless = typedModel('Cashless', cashlessSchema);
export default Cashless
