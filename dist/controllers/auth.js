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
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield User_1.default.findOne({ phone: req.body.phone });
    if (candidate) {
        const passwordAuth = bcryptjs_1.default.compareSync(req.body.password, candidate.password);
        if (passwordAuth) {
            const token = jsonwebtoken_1.default.sign({
                userId: candidate._id,
                name: candidate.name,
                surname: candidate.surname,
                phone: candidate.phone,
                accessUser: candidate.accessUser,
                workWarehouse: candidate.workWarehouse,
                photoUser: candidate.photoUser
            }, config_1.default.jwt, { expiresIn: 1000 * 1000 });
            res.status(200).json({ token: `Bearer ${token}`, candidate: candidate });
        }
        else {
            res.status(401).json({ message: "Неверный пароль" });
        }
    }
    else {
        res.status(404).json({ message: "Пользователь с таким телефоном не найден" });
    }
});
module.exports = { authUser };
