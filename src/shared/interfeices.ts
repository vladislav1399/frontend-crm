import {Type} from "ts-mongoose";

export interface IMessage {
    status: boolean
    message: any
}


export interface ICategory {
    _id?: string
    name: string
    parentCategories?: [{nameParent?: string, parent?: string}]
}

export interface IProfession {
    _id?: string
    professionName: string
}

export interface IUser {
    _id?: string
    name: string
    surname: string
    phone: string
    password: string
    workWarehouse?: string
    accessUser: string
    salary?: number
    photoUser?: any
    instagramUrl?: string
    documentsUser?: [string]
    date?: Date
}

export interface IWarehouse {
    _id?: string
    name: string
}

export interface ICategory {
    _id?: string
    name: string
    mainCategory?: string
}
export interface ICash {
    _id?: any
    idWarehouse: any
    dateCash: Date
    balanceBeginning: number
    balanceEnding: number
    changesDay: number
    balanceCash: number
}

export interface ICashless {
    _id?: any
    idWarehouse: any
    dateCashless: Date
    balanceBeginning: number
    balanceEnding: number
    changesDay: number
    balanceCashless: number
}

export interface IStateIncome {
    _id?: any
    name: string
}
export interface IStateExpenses {
    _id?: any
    name: string
}

export interface IIncome {
    _id?: string
    date?: Date
    author: string
    warehouseId: string
    stateIncome: string
    cancellation?: string
    value: number
    description: string
}

export interface IExpense {
    _id?: string
    date?: Date
    author: string
    warehouseId: string
    stateExpense: string
    cancellation?: string
    value: number
    description: string
}

export interface IProduct {
    _id?: string
    name: string
    category: any
    barCode?: number
    salePrice: number
    purchasePrice: number
    brand?: string
    photo?: string
    description?: string
    minSalePrice?: number
    dateCreate: Date
    dateLastUpdate?: Date
}

export interface IBalance {
    _id?: any
    barCode: number
    productId: string
    fullBalance?: number
    saleBalance?: number
    leftovers: ILeftoversWarehouse[]

}

export interface ILeftoversWarehouse {
    idWarehouse: any
    balance: number
}

export interface IBrand {
    _id?: any,
    name: string
}

export interface IPurchase {
    _id?: any;
    warehouseId: any
    date: Date;
    updatedDate: Date
    productPurchase: IPurchaseProduct[];
    user: string
    allAmount: number
    cancellation: string
    delivered?: boolean
    supplier: string
    status: string
    track?: string
    productDelete?: any
    addProduct?: any
}

export interface IPurchaseProduct {
    productId: any
    name: string
    count: number
    pricePurchase: number
    amount: number
    status?: string
}
export interface ISupplier {
    name: string
    surname: string
    postTown: string
    contact: string
    contactTwo: string
    amount: number
    brands?: IBrand[]
}

export interface IClient {
    name: string
    surname: string
    phone: string
    discount: number
    amountPurchase: number
}

export interface ISale {
    _id?: any;
    warehouse: any
    date: Date;
    updatedDate: Date
    productsSale: ISaleProduct[];
    user: any
    allAmount: number
    cancellation: string
    delivered?: boolean
    client: any
    track?: string
    status?: string
    deleteProductSale?: ISaleProduct[]
    addProductSale?: ISaleProduct[]
}
export interface ISaleProduct {
    productId: any
    name: string
    count: number
    pricePurchase: number
    priceSale: number
    amount: number
}

export interface ITraffic {
    warehouseIncome: string
    warehouseExpense: string
    date: Date;
    updatedDate: Date
    productTraffic: ITrafficProduct[];
    user: string
    status: string
}

export interface ITrafficProduct {
    product: string
    productName: string
    count: number

}


export interface IPrivateMessage {
    message: string
    userPost: string
    userRecipient: string
    date: Date
}






