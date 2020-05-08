import {Request, Response} from "express";
import chatService from "../shared/services/chat.service"
import {IPrivateMessage} from "../shared/interfeices";
import messageService from "../shared/services/message.service"

const postMessage = async  (req: Request, res: Response) => {
    const newMessage: IPrivateMessage = req.body;
    console.log(newMessage)
    await chatService.post(newMessage).then(result => {
        res.status(200).json(messageService.sendMessage(true, 'Сообщение успешно отправлено'))
    }).catch(e => res.status(200).json( messageService.sendMessage(false, 'Сообщение не отправлено. Отправьте заного')))
};


const getMessagesFromUser = async (req: Request, res: Response) => {
    const userRecipient = req.body.userRecipient;
    const userPost = req.params.id;
    chatService.getMessagesByUser(userPost, userRecipient ).then(messages => {
        res.status(200).json(messages)
    })
};

export = {
    postMessage,
    getMessagesFromUser
}
