"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const chat_service_1 = __importDefault(require("../shared/services/chat.service"));
const message_service_1 = __importDefault(require("../shared/services/message.service"));
const postMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newMessage = req.body;
    console.log(newMessage);
    yield chat_service_1.default.post(newMessage).then(result => {
        res.status(200).json(message_service_1.default.sendMessage(true, 'Сообщение успешно отправлено'));
    }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, 'Сообщение не отправлено. Отправьте заного')));
});
const getMessagesFromUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRecipient = req.body.userRecipient;
    const userPost = req.params.id;
    chat_service_1.default.getMessagesByUser(userPost, userRecipient).then(messages => {
        res.status(200).json(messages);
    });
});
module.exports = {
    postMessage,
    getMessagesFromUser
};
