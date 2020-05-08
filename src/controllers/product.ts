import { Request, Response} from "express";
import {IProduct} from "../shared/interfeices";
import productService from "../shared/services/product.service";
import messageService from "../shared/services/message.service";
import dateService from '../shared/services/date.service'
import balanceService from '../shared/services/balance.service'

const createProduct = async (req: Request, res: Response) => {
    const date = dateService.getDateNow();
    const newProduct: IProduct = req.body;
    newProduct.dateCreate = date;
    newProduct.dateLastUpdate = date;
   await productService.createProduct(newProduct).then( (result: any) => {
       let productId = String(result._id);
       let barCode = Number(result.barCode);

       balanceService.createBalanceForProduct(productId, barCode).then( result => {
           res.status(200).json(messageService.sendMessage(true, 'Новый товар успешно создан'))
       }).catch( (e: Error) => res.status(200).json(messageService.sendMessage(false, e.message)));
    }).catch( (e: Error) => res.status(200).json(messageService.sendMessage(false, e.message)))
};

const getAllProducts = async  (req: Request, res: Response) => {
    await productService.fetchProducts().then( (products: any) => {
        res.status(200).json(products)
    }).catch( (e: Error) => console.log(e.message))

};

const getProductsByCategory = async  (req: Request, res: Response) => {
      await productService.fetchByCategory(String(req.params.id)).then((products: any) => {
            res.status(200).json(products)
        }).catch((e: Error) => console.log(e.message))
};



const getProductById = async (req: Request, res: Response) => {
    productService.fetchById(String(req.params.id)).then( (product: any) => {
        res.status(200).json(product)
    })
};


const updateProduct = async  (req: Request, res: Response) => {

    const product = req.body;
    productService.updateOneProduct(product).then((result: any)=> {
        res.status(200).json(messageService.sendMessage(true, 'Товар успешно обновлен!'))
    }).catch( (e: Error) => res.status(200).json(messageService.sendMessage(false, e.message)) )
};

 const removeProduct = async (req: Request, res: Response) => {
    let productId = String(req.params.id);
    productService.deleteProduct(productId).then((result: any)=> {
        res.status(200).json(messageService.sendMessage(true, 'Товар успешно удален!'))
    }).catch( (e: Error) => res.status(200).json(messageService.sendMessage(false, e.message)) )
};

export = {
    createProduct,
    getAllProducts,
    getProductsByCategory,
    getProductById,
    updateProduct,
    removeProduct
}
