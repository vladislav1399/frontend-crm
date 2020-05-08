"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = __importDefault(require("../controllers/client"));
const router = express_1.default();
router.post('/', client_1.default.createNewClient);
router.get('/', client_1.default.getClient);
router.get('/:id', client_1.default.getClientById);
router.patch('/:id', client_1.default.updateClient);
exports.default = router;
