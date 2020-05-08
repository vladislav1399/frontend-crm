import Product from "../../models/Product";
import {IProduct} from "../interfeices";

const createProduct = async (newProduct: IProduct) => {
    return await Product.create(newProduct)
        // const productId: string = String(product._id);
        // const barCode: number = Number(product.barCode);
        // balanceService.BalanceOnTheProduct(productId, barCode)
};

const fetchProducts = () => {
    return Product.find().sort({$natural: -1}).populate('brand', 'name')
};

const fetchByCategory = (categoryId: string) => {
    return Product.find({category: categoryId}).sort({$natural: -1}).populate('brand', 'name')
};

const fetchById = (productId: string) => {
    return Product.findOne({_id: productId}).populate('brand', 'name')
};

const updateOneProduct = (product: IProduct) => {
    return Product.updateOne({_id: product._id},
        { $set: { name: product.name,
                category: product.category,
                salePrice: product.salePrice,
                purchasePrice: product.purchasePrice,
                brand: product.brand
            }
        })
};

const updateProductsPurchasePrice = (purchaseProducts: any) => {
    fetchProducts().then( products => {
        for(const product of purchaseProducts) {
                for(const prod of products) {
                    if (String(product.productId) === String(prod._id) ) {
                        if( Number(product.pricePurchase) !==  Number(prod.purchasePrice )) {
                            let averagePrice = (prod.purchasePrice + product.pricePurchase) / 2;
                            const updatedProduct: any = {
                                _id: prod._id,
                                dateCreate: new Date(),
                                name: prod.name,
                                category: prod.category,
                                salePrice: prod.salePrice,
                                purchasePrice: averagePrice,
                                brand: prod.brand
                            };
                            updateOneProduct(updatedProduct).then( result => {
                                        console.log(result)
                            })
                        } else {

                        }
                    } else {
                    }
                }
            }
        });
};

const deleteProduct = (productId: string) => {
    return Product.remove({_id: productId})
};




export = {
            createProduct,
            fetchProducts,
            fetchByCategory,
            fetchById,
            updateOneProduct,
            deleteProduct,
            updateProductsPurchasePrice
        }

