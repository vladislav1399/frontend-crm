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
const bcryptjs_1 = require("bcryptjs");
const message_service_1 = __importDefault(require("../shared/services/message.service"));
const user_service_1 = __importDefault(require("../shared/services/user.service"));
const date_service_1 = __importDefault(require("../shared/services/date.service"));
const profession_service_1 = __importDefault(require("../shared/services/profession.service"));
const getUser = (req, res, next) => {
    'use strict';
    var os = require('os');
    var ifaces = os.networkInterfaces();
    console.log(os);
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                console.log(ifname + ':' + alias, iface.address);
            }
            else {
                // this interface has only one ipv4 adress
                console.log(ifname, iface.address);
            }
            ++alias;
        });
    });
    // en0 192.168.1.101
    // eth0 10.0.0.101
    user_service_1.default.getUsers().then(users => { res.status(200).json(users); }).catch((error) => console.log(error));
};
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    user_service_1.default.userById(String(req.params.id)).then((userById) => {
        res.status(200).json(userById);
    }).catch((e) => res.json(e.message));
});
const deleteUser = (req, res, next) => {
    user_service_1.default.removeUser(req.params.id).then(result => {
        console.log('result', result);
        res.status(200).json(message_service_1.default.sendMessage(true, 'Пользователь успешно удален!'));
    }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, 'Что то пошло не так, удаление не удалось!')));
};
const createUser = (req, res) => {
    const salary = Number(req.body.salary);
    const dateNow = date_service_1.default.getDateNow();
    user_service_1.default.getUsers().then(user => {
        console.log(user.length);
        if (user.length === 0) {
            const firstProfession = {
                professionName: "Руководитель"
            };
            profession_service_1.default.create(firstProfession).then(firstProf => {
                bcryptjs_1.genSalt(10).then(num => {
                    const password = bcryptjs_1.hashSync(req.body.password, num);
                    const newUser = {
                        name: req.body.name,
                        surname: req.body.surname,
                        phone: req.body.phone,
                        password: password,
                        accessUser: firstProf._id,
                        instagramUrl: '',
                        salary: 0,
                        date: dateNow,
                        photoUser: req.file ? req.file.path : ''
                    };
                    console.log(newUser);
                    User_1.default.create(newUser).then(user => {
                        const message = {
                            status: true,
                            message: 'Пользователь был успешно добавлен!'
                        };
                        res.status(200).json(message);
                    }).catch(e => {
                        res.status(200).json({ status: false, message: e.message });
                    });
                });
            });
        }
        else {
            bcryptjs_1.genSalt(10).then(num => {
                const password = bcryptjs_1.hashSync(req.body.password, num);
                const newUser = {
                    name: req.body.name,
                    surname: req.body.surname,
                    phone: req.body.phone,
                    password: password,
                    workWarehouse: req.body.workWarehouse,
                    accessUser: req.body.accessUser,
                    instagramUrl: req.body.instagramUrl,
                    salary: salary,
                    date: dateNow,
                    photoUser: req.file ? req.file.path : ''
                };
                User_1.default.create(newUser).then(user => {
                    const message = {
                        status: true,
                        message: 'Пользователь был успешно добавлен!'
                    };
                    res.status(200).json(message);
                }).catch(e => {
                    res.status(200).json({ status: false, message: e.message });
                });
            });
        }
    });
};
const updateUser = (req, res, next) => {
    user_service_1.default.updateUser(req.body).then(result => {
        res.status(200).json(message_service_1.default.sendMessage(true, 'Пользователь успешно отредактирован!'));
    }).catch(e => {
        res.status(200).json(message_service_1.default.sendMessage(false, e.message));
    });
};
module.exports = { getUser, deleteUser, createUser, updateUser, getUserById };
