import {createSchema, Type, typedModel} from "ts-mongoose";

const privateMessageSchema = createSchema({
    message: Type.string({required: true}),
    userPost: Type.objectId({required: true, ref: 'User'}),
    userRecipient:  Type.objectId({required: true, ref: 'User'}),
    date: Type.mixed({require: true}),
});

const PrivateMessages = typedModel('PrivateMessages', privateMessageSchema);

export default PrivateMessages
