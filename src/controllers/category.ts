import {Request, Response} from "express";
import {ICategory} from "../shared/interfeices";
import categoryService from "../shared/services/category.service"
import messageService from "../shared/services/message.service"

const getCategories = async (req: Request, res: Response) => {
   await categoryService.getAllCategories().then((categories: any) => {
        res.status(200).json(categories)
    }).catch( (e: Error) => res.status(200).json(e))
};

const createCategory = async (req: Request, res: Response) => {
    const newCategory: ICategory = req.body;
    categoryService.create(newCategory).then( (result: any) => {
        res.status(200).json(messageService.sendMessage(true, 'Новая категория успешно создана!'))
    }).catch((e: Error) => res.status(200).json(messageService.sendMessage(false, e.message)))
};

const getCategoryById = async (req: Request, res: Response) => {
    const categoryId = String(req.params.id);
    await categoryService.getById(categoryId).then( (category: any) => {
        res.status(200).json(category)
    }).catch((e: Error)  => res.status(200).json(e))
};


const updateCategory = async (req: Request, res: Response) => {
    const category: ICategory = req.body;
    await categoryService.updateCategory(category).then( (result: any) => {
        res.status(200).json(messageService.sendMessage(true, 'Категория успешно обновлена!'))
    }).catch((e: Error) =>  res.status(200).json(messageService.sendMessage(false, e.message)))
};
const removeCategory = async (req: Request, res: Response) => {
    const categoryId = String(req.params.id);
    console.log(categoryId);
    await categoryService.deleteCategory(categoryId).then( (result: any) => {
        res.status(200).json(messageService.sendMessage(true, 'Категория успешно удалена!'))
    }).catch((e: Error) =>  res.status(200).json(messageService.sendMessage(false, e.message)))
};

export = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    removeCategory
}











