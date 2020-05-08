import {createSchema, Type, typedModel} from "ts-mongoose";

const professionsSchema = createSchema({
        professionName: Type.string({required: true, index: {unique: true}})
});

const Professions = typedModel('Professions', professionsSchema);
export default Professions

