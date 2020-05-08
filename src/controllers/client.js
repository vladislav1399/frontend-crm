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
const client_service_1 = __importDefault(require("../shared/services/client.service"));
const message_service_1 = __importDefault(require("../shared/services/message.service"));
const createNewClient = (req, res) => {
    const client = req.body;
    client_service_1.default.create(client).then(result => {
        res.status(200).json(result);
    }).catch(e => message_service_1.default.sendMessage(false, e.message));
};
const getClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_service_1.default.getAllClient().then(clients => {
        res.status(200).json(clients);
    }).catch(e => res.status(200).json(e.message));
});
const getClientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_service_1.default.clientById(req.params.id).then((client) => {
        if (client) {
            res.status(200).json(client);
        }
    }).catch(e => res.status(200).json(e.message));
});
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientUpdated = req.body;
    yield client_service_1.default.update(clientUpdated).then((result) => {
        res.status(200).json(message_service_1.default.sendMessage(true, 'Покупатель успешно обновлен'));
    }).catch(e => res.status(200).json(e.message));
});
module.exports = {
    createNewClient,
    getClient,
    getClientById,
    updateClient,
};
