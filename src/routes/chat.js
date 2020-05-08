"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default();
const chat_1 = __importDefault(require("../controllers/chat"));
router.post('/private', chat_1.default.postMessage);
router.post('/private/:id', chat_1.default.getMessagesFromUser);
exports.default = router;
