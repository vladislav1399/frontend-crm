import {createSchema, Type, typedModel} from "ts-mongoose";

const cashSchema= createSchema({
    idWarehouse: Type.objectId({required: true, ref: 'Warehouse'}),
    dateCash: Type.mixed({required: true}),
    balanceBeginning: Type.number({required: true}),
    balanceEnding: Type.number({required: true}),
    changesDay: Type.number({required: true}),
    balanceCash: Type.number({required: true})
});
const Cash = typedModel('Cash', cashSchema);
export default Cash
