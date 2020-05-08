import User from "../../models/User";
import {ISale, IUser} from "../interfeices";

const getUsers = async () => {
  return User.find().sort({$natural: -1}).populate('accessUser', 'professionName').populate('workWarehouse', 'name _id')
};

const createUser = async (user: IUser) => {
    return await User.create(user)
};

const userById = (userId: string) => {
    return User.findOne({_id: userId}).populate('accessUser', 'professionName').populate('workWarehouse', 'name _id')
};

const updateUserWarehouseFirstLogin = async (warehouseId: string) => {
      await User.find().then( (user: any )  => {
           console.log(user[0]._id);
          return User.updateOne(
                {_id: user[0]._id},
                {$set: {workWarehouse: warehouseId}}
            )
        })
};

const removeUser = async (userId: string) => {
    return User.remove({_id: userId})
};

const updateUser = async (updateInfo: any) => {
    return User.updateOne(
        {_id: updateInfo._id},
             {$set: { accessUser: updateInfo.accessUser,
                     name: updateInfo.name,
                     surname: updateInfo.surname,
                     salary: updateInfo.salary,
                     workWarehouse: updateInfo.workWarehouse,
                        }}
    )
};


const plusUserSaleAmount = (sale: ISale) => {
    return  User.updateOne( { _id: String(sale.user) },
        {$inc: { saleAmountInMonth: sale.allAmount, allSaleAmount: sale.allAmount }})

};

export = {getUsers, updateUserWarehouseFirstLogin, createUser, userById, removeUser, updateUser, plusUserSaleAmount}
