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
const Brand_1 = __importDefault(require("../../models/Brand"));
const create = (brand) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Brand_1.default.create(brand);
});
const getAllBrand = () => __awaiter(void 0, void 0, void 0, function* () {
    return Brand_1.default.find();
});
const deleteBrand = (brandId) => __awaiter(void 0, void 0, void 0, function* () {
    return Brand_1.default.remove({ _id: brandId });
});
module.exports = {
    create,
    getAllBrand,
    deleteBrand
};
