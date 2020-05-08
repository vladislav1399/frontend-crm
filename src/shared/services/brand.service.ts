import Brand from "../../models/Brand";
import {IBrand} from "../interfeices";

const create = async (brand: IBrand) => {
        return await Brand.create(brand)
};

const getAllBrand = async () => {
    return  Brand.find()
};

const deleteBrand = async (brandId: string) => {
    return Brand.remove({_id: brandId})
};



export = {
    create,
    getAllBrand,
    deleteBrand
}
