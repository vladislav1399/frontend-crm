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
const User_1 = __importDefault(require("../../models/User"));
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return User_1.default.find().sort({ $natural: -1 }).populate('accessUser', 'professionName').populate('workWarehouse', 'name _id');
});
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.create(user);
});
const userById = (userId) => {
    return User_1.default.findOne({ _id: userId }).populate('accessUser', 'professionName').populate('workWarehouse', 'name _id');
};
const updateUserWarehouseFirstLogin = (warehouseId) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.default.find().then((user) => {
        console.log(user[0]._id);
        return User_1.default.updateOne({ _id: user[0]._id }, { $set: { workWarehouse: warehouseId } });
    });
});
const removeUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return User_1.default.remove({ _id: userId });
});
const updateUser = (updateInfo) => __awaiter(void 0, void 0, void 0, function* () {
    return User_1.default.updateOne({ _id: updateInfo._id }, { $set: { accessUser: updateInfo.accessUser,
            name: updateInfo.name,
            surname: updateInfo.surname,
            salary: updateInfo.salary,
            workWarehouse: updateInfo.workWarehouse,
        } });
});
const plusUserSaleAmount = (sale) => {
    return User_1.default.updateOne({ _id: String(sale.user) }, { $inc: { saleAmountInMonth: sale.allAmount, allSaleAmount: sale.allAmount } });
};
module.exports = { getUsers, updateUserWarehouseFirstLogin, createUser, userById, removeUser, updateUser, plusUserSaleAmount };
