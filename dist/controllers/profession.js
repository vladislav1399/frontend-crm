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
const profession_service_1 = __importDefault(require("../shared/services/profession.service"));
const message_service_1 = __importDefault(require("../shared/services/message.service"));
const getAllProfessions = (req, res) => {
    profession_service_1.default.fetch().then(professions => {
        res.status(200).json(professions);
    }).catch(e => res.json(e.message));
};
const createProfessions = (req, res) => {
    profession_service_1.default.create(req.body).then(result => {
        res.status(200).json(message_service_1.default.sendMessage(true, `Новая должность ${result.professionName} успешно добавлена`));
    }).catch(e => res.json(message_service_1.default.sendMessage(false, e.message)));
};
const removeProfession = (req, res) => {
    profession_service_1.default.deleteProfession(String(req.params.id)).then((result) => {
        res.status(200).json(message_service_1.default.sendMessage(true, `Должность успешно удалена!`));
    }).catch((e) => {
        res.json(message_service_1.default.sendMessage(false, e.message));
    });
};
//ПОСТАВЩИКИ
const createSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newSupplier = req.body;
    yield profession_service_1.default.createSupplier(newSupplier).then(result => {
        console.log(result);
        res.status(200).json(message_service_1.default.sendMessage(true, `Поставщик успешно добавлен - ${result}`));
    }).catch(e => message_service_1.default.sendMessage(false, `Поставщик успешно добавлен - ${e.message}`));
});
const getSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield profession_service_1.default.getSupplier().then(supplier => {
        res.status(200).json(supplier);
    }).catch(e => res.status(200).json(e.message));
});
module.exports = {
    getAllProfessions,
    createProfessions,
    removeProfession,
    createSupplier,
    getSupplier
};
