import Supplier from "../../models/Supplier";
import {ISupplier} from "../interfeices";


// ПОСТАВЩИКИ
const createSupplier = async (newSupplier: ISupplier) => {
    return await Supplier.create(newSupplier)
};

const getSupplier = async () => {
    return Supplier.find()
};

const updateSupplierAmount = async  (supplierId: string, amount: number) => {
    return Supplier.updateOne({_id: supplierId }, {$inc: {amount: amount }})
};

const updateSupplierInfo = async (supplierId: string, supplier: ISupplier) => {
    return Supplier.updateOne({_id: supplierId },
        {$set:
                {
                    name: supplier.name,
                    surname: supplier.surname,
                    contact: supplier.contact,
                    contactTwo: supplier.contactTwo,
                    postTown: supplier.postTown,
                }})
};

const supplierById = async (supplierId: string) => {
    return Supplier.findOne({_id: supplierId})
};

const deleteSupplier = async (supplierId: string) => {
    return Supplier.remove({_id: String(supplierId)})
};


const addReview = (supplierId: string, review: any ) => {
    return Supplier.updateOne(
        {_id: String(supplierId) },
        {$addToSet: { review: {text: review.text, date: review.date}}}
    )
};


const updateBrandsSupplier = (supplierId: string, brand: any ) => {
    console.log('updateBrandsSupplier', brand);
    if(brand.operator === '-') {
        return Supplier.updateOne(
            {_id: String(supplierId)},
            {$pull: {brands: { brandName: brand.brandName}}}
        )
    } else if(brand.operator === '+') {
        return Supplier.updateOne(
            {_id: String(supplierId)},
            {$addToSet: {brands: { brandName: brand.name,  id: brand._id}}}
        )}
    };





export = {
    createSupplier,
    getSupplier,
    updateSupplierAmount,
    supplierById,
    deleteSupplier,
    updateSupplierInfo,
    updateBrandsSupplier,
    addReview

}
