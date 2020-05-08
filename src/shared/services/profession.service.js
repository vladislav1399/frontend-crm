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
const Professions_1 = __importDefault(require("../../models/Professions"));
const Supplier_1 = __importDefault(require("../../models/Supplier"));
const fetch = () => __awaiter(void 0, void 0, void 0, function* () {
    return Professions_1.default.find();
});
const create = (newProfession) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Professions_1.default.create(newProfession);
});
// ПОСТАВЩИКИ
const createSupplier = (newSupplier) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Supplier_1.default.create(newSupplier);
});
const getSupplier = () => __awaiter(void 0, void 0, void 0, function* () {
    return Supplier_1.default.find();
});
const updateSupplier = (supplierId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    return Supplier_1.default.updateOne({ _id: supplierId }, { $inc: { amount: amount } });
});
const deleteProfession = (professionId) => {
    return Professions_1.default.remove({ _id: professionId });
};
module.exports = {
    fetch,
    create,
    createSupplier,
    getSupplier,
    updateSupplier,
    deleteProfession
};
