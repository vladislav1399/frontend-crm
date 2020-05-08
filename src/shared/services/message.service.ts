import {IMessage} from "../interfeices";

const sendMessage = (status: boolean, message: string): IMessage => {
    return {status: status, message: message}
};

export = {sendMessage}
