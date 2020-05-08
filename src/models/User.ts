import {createSchema, Type, typedModel} from "ts-mongoose";

    const userSchema = createSchema({
        name: Type.string({required: true}),
        surname: Type.string({required: true}),
        phone: Type.string({required: true, unique: true}),
        password: Type.string({required: true}),
        accessUser: Type.objectId({required: true, ref: 'Professions'}),
        workWarehouse: Type.objectId({ref: 'Warehouse'}),
        photoUser: Type.string(),
        salary: Type.number(),
        saleAmountInMonth: Type.number({required: true, default: 0}),
        allSaleAmount: Type.number({required: true, default: 0}),
    });

        const User = typedModel('User', userSchema);
    export default User

