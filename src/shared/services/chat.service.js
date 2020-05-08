"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Private_Message_1 = __importDefault(require("../../models/Private-Message"));
const post = (newMessage) => {
    return Private_Message_1.default.create(newMessage);
};
const getMessagesByUser = (userPostId, userRecipientId) => {
    return Private_Message_1.default.find({
        $and: [
            { $or: [{ userPost: [userPostId, userRecipientId] }] },
            { $or: [{ userRecipient: [userPostId, userRecipientId] }] }
        ]
    }).populate('userPost').populate('userRecipient').sort({ $natural: -1 });
};
module.exports = {
    post,
    getMessagesByUser
};
