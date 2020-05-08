import User from "../models/User";
import {NextFunction, Request, Response} from "express";
import {IUser} from "../shared/interfeices";
import {genSalt, hashSync} from "bcryptjs";
import messageService from '../shared/services/message.service'
import userService from '../shared/services/user.service'
import dateService from '../shared/services/date.service'
import professionService from '../shared/services/profession.service'

const getUser = (req: Request, res: Response, next: NextFunction ) => {

    'use strict';

    var os = require('os');
    var ifaces: any = os.networkInterfaces();
    console.log(os)

    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface: any) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                console.log(ifname + ':' + alias, iface.address);
            } else {
                // this interface has only one ipv4 adress
                console.log(ifname, iface.address);
            }
            ++alias;
        });
    });

// en0 192.168.1.101
// eth0 10.0.0.101

            userService.getUsers().then( users => { res.status(200).json(users)}).catch( (error) => console.log(error))
};

const getUserById = async (req: Request, res: Response, next: NextFunction ) => {
        userService.userById(String(req.params.id)).then(  (userById: any) => {
            res.status(200).json(userById)
}).catch((e: Error ) => res.json(e.message))

};

const deleteUser = (req: Request, res: Response, next: NextFunction ) => {
        userService.removeUser(req.params.id).then( result => {
            console.log('result', result);
            res.status(200).json(messageService.sendMessage(true, 'Пользователь успешно удален!'))
        }).catch( e => res.status(200).json(messageService.sendMessage(false, 'Что то пошло не так, удаление не удалось!')))
};

const createUser = (req: Request, res: Response) => {
    const salary = Number(req.body.salary);
    const dateNow = dateService.getDateNow();
    userService.getUsers().then( user => {
        console.log(user.length);
        if(user.length === 0) {
            const firstProfession = {
                professionName: "Руководитель"
            };
            professionService.create(firstProfession).then( firstProf => {
                genSalt(10).then( num =>  {
                    const password = hashSync(req.body.password, num);
                    const newUser: IUser = {
                        name: req.body.name,
                        surname:  req.body.surname,
                        phone:  req.body.phone,
                        password: password,
                        accessUser: firstProf._id,
                        instagramUrl: '',
                        salary: 0,
                        date: dateNow,
                        photoUser: req.file ? req.file.path : ''
                    };
                    console.log(newUser);
                    User.create(newUser).then( user => {
                        const message = {
                            status: true,
                            message: 'Пользователь был успешно добавлен!'
                        };
                        res.status(200).json(message)
                    }).catch(e => {
                        res.status(200).json({status: false, message: e.message})
                    })
                })

            })
        } else {
            genSalt(10).then( num =>  {
                const password = hashSync(req.body.password, num);
                const newUser: IUser = {
                    name: req.body.name,
                    surname:  req.body.surname,
                    phone:  req.body.phone,
                    password: password,
                    workWarehouse: req.body.workWarehouse,
                    accessUser: req.body.accessUser,
                    instagramUrl: req.body.instagramUrl,
                    salary: salary,
                    date: dateNow,
                    photoUser: req.file ? req.file.path : ''
                };
                User.create(newUser).then( user => {
                    const message = {
                        status: true,
                        message: 'Пользователь был успешно добавлен!'
                    };
                    res.status(200).json(message)
                }).catch(e => {
                    res.status(200).json({status: false, message: e.message})
                })
            })
        }
    });
};

const updateUser = (req: Request, res: Response, next: NextFunction ) => {
    userService.updateUser(req.body).then( result => {
        res.status(200).json(messageService.sendMessage(true, 'Пользователь успешно отредактирован!'))
    }).catch( e => {
        res.status(200).json(messageService.sendMessage(false, e.message))
    })
};


export =  {getUser, deleteUser, createUser, updateUser, getUserById}
