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
const Product_1 = __importDefault(require("../../models/Product"));
const createProduct = (newProduct) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.default.create(newProduct);
    // const productId: string = String(product._id);
    // const barCode: number = Number(product.barCode);
    // balanceService.BalanceOnTheProduct(productId, barCode)
});
const fetchProducts = () => {
    return Product_1.default.find().sort({ $natural: -1 }).populate('brand', 'name');
};
const fetchByCategory = (categoryId) => {
    return Product_1.default.find({ category: categoryId }).sort({ $natural: -1 }).populate('brand', 'name');
};
const fetchById = (productId) => {
    return Product_1.default.findOne({ _id: productId }).populate('brand', 'name');
};
const updateOneProduct = (product) => {
    return Product_1.default.updateOne({ _id: product._id }, { $set: { name: product.name,
            category: product.category,
            salePrice: product.salePrice,
            purchasePrice: product.purchasePrice,
            brand: product.brand
        }
    });
};
const updateProductsPurchasePrice = (purchaseProducts) => {
    fetchProducts().then(products => {
        for (const product of purchaseProducts) {
            for (const prod of products) {
                if (String(product.productId) === String(prod._id)) {
                    if (Number(product.pricePurchase) !== Number(prod.purchasePrice)) {
                        let averagePrice = (prod.purchasePrice + product.pricePurchase) / 2;
                        const updatedProduct = {
                            _id: prod._id,
                            dateCreate: new Date(),
                            name: prod.name,
                            category: prod.category,
                            salePrice: prod.salePrice,
                            purchasePrice: averagePrice,
                            brand: prod.brand
                        };
                        updateOneProduct(updatedProduct).then(result => {
                            console.log(result);
                        });
                    }
                    else {
                    }
                }
                else {
                }
            }
        }
    });
};
const deleteProduct = (productId) => {
    return Product_1.default.remove({ _id: productId });
};
module.exports = {
    createProduct,
    fetchProducts,
    fetchByCategory,
    fetchById,
    updateOneProduct,
    deleteProduct,
    updateProductsPurchasePrice
};
