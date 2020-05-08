import Professions from '../../models/Professions'
import Supplier from "../../models/Supplier";
import {IProfession, ISupplier} from "../interfeices";


const fetch = async () => {
    return Professions.find()
};

const create = async (newProfession: IProfession) => {
   return  await Professions.create(newProfession)
};

// ПОСТАВЩИКИ
const createSupplier = async (newSupplier: ISupplier) => {
        return await  Supplier.create(newSupplier)
};

const getSupplier = async () => {
    return Supplier.find()
};

const updateSupplier = async  (supplierId: string, amount: number) => {
    return Supplier.updateOne({_id: supplierId }, {$inc: {amount: amount }})
};

const deleteProfession = (professionId: string) => {
    return Professions.remove({_id: professionId})
};

export = {
    fetch,
    create,
    createSupplier,
    getSupplier,
    updateSupplier,
    deleteProfession
}
