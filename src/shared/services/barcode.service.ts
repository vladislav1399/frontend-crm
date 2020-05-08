import Product from "../../models/Product";

const getLastBarCode = async () => {
    return await Product.findOne().sort({$natural: -1}).then(product => {
        if (product !== null) {
            if(product.barCode !== undefined){
                product.barCode++;
                return product.barCode
            }
        } else {
            return 1000000000000
        }
    })
};


export = {
    getLastBarCode
}
