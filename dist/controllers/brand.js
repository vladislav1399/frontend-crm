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
const brand_service_1 = __importDefault(require("../shared/services/brand.service"));
const message_service_1 = __importDefault(require("../shared/services/message.service"));
const createBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBrand = { name: req.body.name };
    brand_service_1.default.create(newBrand).then(result => {
        res.status(200).json(message_service_1.default.sendMessage(true, 'Новая торговая марка успешно создана'));
    }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
});
const getAllBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    brand_service_1.default.getAllBrand().then(brands => {
        res.status(200).json(brands);
    }).catch(e => res.status(200).json(e.message));
});
const removeBrand = (req, res) => {
    brand_service_1.default.deleteBrand(String(req.params.id)).then(result => {
        res.status(200).json(message_service_1.default.sendMessage(true, 'Торговая марка успешно была удалена!'));
    }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
};
module.exports = {
    createBrand,
    getAllBrand,
    removeBrand,
};
