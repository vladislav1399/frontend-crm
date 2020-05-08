import Category from "../../models/Category";
import {ICategory} from "../interfeices";

const getAllCategories = () => {
    return Category.find().sort({$natural: -1})
};

const create = (category: ICategory) => {
        return Category.create(category)
};

const getById = (categoryId: string) => {
    return Category.findOne({_id: String(categoryId)})
};

const deleteCategory = (categoryId: string) => {
    return Category.remove({_id: String(categoryId)})
};


const updateCategory = (category: ICategory) => {
    return Category.updateOne({_id: String(category._id)},
        { $set: { name: category.name, parentCategories: category.parentCategories }})

};

export = {
    getAllCategories,
    create,
    getById,
    deleteCategory,
    updateCategory

}


