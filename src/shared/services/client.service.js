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
const Client_1 = __importDefault(require("../../models/Client"));
const create = (newClient) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Client_1.default.create((newClient));
});
const getAllClient = () => {
    return Client_1.default.find();
};
const clientById = (clientId) => {
    return Client_1.default.findOne({ _id: String(clientId) });
};
const update = (clientUpdated) => {
    return Client_1.default.updateOne({ _id: String(clientUpdated._id) }, { $set: {
            name: clientUpdated.name,
            surname: clientUpdated.surname,
            phone: clientUpdated.phone,
            discount: clientUpdated.discount
        }
    });
};
const plusSaleAmount = (sale) => {
    return Client_1.default.updateOne({ _id: String(sale.client) }, { $inc: { amountPurchase: sale.allAmount } });
};
module.exports = {
    create,
    getAllClient,
    clientById,
    update,
    plusSaleAmount
};
