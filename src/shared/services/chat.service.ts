import PrivateMessages from "../../models/Private-Message";
import {IPrivateMessage} from "../interfeices";


const post = (newMessage: IPrivateMessage) => {
    return PrivateMessages.create(newMessage)
};


const getMessagesByUser = (userPostId: string, userRecipientId: string) => {


           return  PrivateMessages.find({
            $and: [

                { $or: [ {userPost:  [userPostId, userRecipientId ]}  ] },
                {$or: [ {userRecipient:  [userPostId, userRecipientId]} ]}
            ]

           }).populate('userPost').populate('userRecipient').sort({$natural: -1})

};




export = {
    post,
    getMessagesByUser
}
