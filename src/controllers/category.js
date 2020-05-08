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
const category_service_1 = __importDefault(require("../shared/services/category.service"));
const message_service_1 = __importDefault(require("../shared/services/message.service"));
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield category_service_1.default.getAllCategories().then((categories) => {
        res.status(200).json(categories);
    }).catch((e) => res.status(200).json(e));
});
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = req.body;
    category_service_1.default.create(newCategory).then((result) => {
        res.status(200).json(message_service_1.default.sendMessage(true, 'Новая категория успешно создана!'));
    }).catch((e) => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
});
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = String(req.params.id);
    yield category_service_1.default.getById(categoryId).then((category) => {
        res.status(200).json(category);
    }).catch((e) => res.status(200).json(e));
});
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.body;
    yield category_service_1.default.updateCategory(category).then((result) => {
        res.status(200).json(message_service_1.default.sendMessage(true, 'Категория успешно обновлена!'));
    }).catch((e) => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
});
const removeCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = String(req.params.id);
    console.log(categoryId);
    yield category_service_1.default.deleteCategory(categoryId).then((result) => {
        res.status(200).json(message_service_1.default.sendMessage(true, 'Категория успешно удалена!'));
    }).catch((e) => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
});
module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    removeCategory
};
