import {createSchema, Type, typedModel} from "ts-mongoose";
const warehouseSchema = createSchema({
    name: Type.string({required: true, index: {unique: true}}),
});

const Warehouse = typedModel('Warehouse', warehouseSchema);
export default Warehouse

