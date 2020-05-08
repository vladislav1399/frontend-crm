import User from "../models/User";
import {NextFunction, Request, Response} from "express";
import bCrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import SERVER_CONFIG from "../config/config"

const authUser = async (req: Request, res: Response, next: NextFunction ) => {
    const candidate = await User.findOne({phone: req.body.phone});
    if(candidate) {
        const passwordAuth = bCrypt.compareSync(req.body.password, candidate.password);
        if(passwordAuth) {
            const token = jwt.sign({
                    userId: candidate._id,
                    name: candidate.name,
                    surname: candidate.surname,
                    phone: candidate.phone,
                    accessUser: candidate.accessUser,
                    workWarehouse: candidate.workWarehouse,
                    photoUser: candidate.photoUser
                },
                SERVER_CONFIG.jwt, {expiresIn: 1000 * 1000 });
            res.status(200).json({ token: `Bearer ${token}`, candidate: candidate})
        } else {
            res.status(401).json({message: "Неверный пароль"})
        }
    }
    else {
        res.status(404).json({message: "Пользователь с таким телефоном не найден"})
    }
};

export = {authUser}
