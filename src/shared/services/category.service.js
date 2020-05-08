"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Category_1 = __importDefault(require("../../models/Category"));
const getAllCategories = () => {
    return Category_1.default.find().sort({ $natural: -1 });
};
const create = (category) => {
    return Category_1.default.create(category);
};
const getById = (categoryId) => {
    return Category_1.default.findOne({ _id: String(categoryId) });
};
const deleteCategory = (categoryId) => {
    return Category_1.default.remove({ _id: String(categoryId) });
};
const updateCategory = (category) => {
    return Category_1.default.updateOne({ _id: String(category._id) }, { $set: { name: category.name, parentCategories: category.parentCategories } });
};
module.exports = {
    getAllCategories,
    create,
    getById,
    deleteCategory,
    updateCategory
};
