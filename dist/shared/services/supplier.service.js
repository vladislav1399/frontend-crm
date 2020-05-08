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
const Supplier_1 = __importDefault(require("../../models/Supplier"));
// ПОСТАВЩИКИ
const createSupplier = (newSupplier) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Supplier_1.default.create(newSupplier);
});
const getSupplier = () => __awaiter(void 0, void 0, void 0, function* () {
    return Supplier_1.default.find();
});
const updateSupplierAmount = (supplierId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    return Supplier_1.default.updateOne({ _id: supplierId }, { $inc: { amount: amount } });
});
const updateSupplierInfo = (supplierId, supplier) => __awaiter(void 0, void 0, void 0, function* () {
    return Supplier_1.default.updateOne({ _id: supplierId }, { $set: {
            name: supplier.name,
            surname: supplier.surname,
            contact: supplier.contact,
            contactTwo: supplier.contactTwo,
            postTown: supplier.postTown,
        } });
});
const supplierById = (supplierId) => __awaiter(void 0, void 0, void 0, function* () {
    return Supplier_1.default.findOne({ _id: supplierId });
});
const deleteSupplier = (supplierId) => __awaiter(void 0, void 0, void 0, function* () {
    return Supplier_1.default.remove({ _id: String(supplierId) });
});
const addReview = (supplierId, review) => {
    return Supplier_1.default.updateOne({ _id: String(supplierId) }, { $addToSet: { review: { text: review.text, date: review.date } } });
};
const updateBrandsSupplier = (supplierId, brand) => {
    console.log('updateBrandsSupplier', brand);
    if (brand.operator === '-') {
        return Supplier_1.default.updateOne({ _id: String(supplierId) }, { $pull: { brands: { brandName: brand.brandName } } });
    }
    else if (brand.operator === '+') {
        return Supplier_1.default.updateOne({ _id: String(supplierId) }, { $addToSet: { brands: { brandName: brand.name, id: brand._id } } });
    }
};
module.exports = {
    createSupplier,
    getSupplier,
    updateSupplierAmount,
    supplierById,
    deleteSupplier,
    updateSupplierInfo,
    updateBrandsSupplier,
    addReview
};
