import Warehouse from "../../models/Warehouse";
import {IWarehouse} from "../interfeices";

const createNewWarehouse = async (warehouse: IWarehouse) => {
    return await Warehouse.create(warehouse)
};
const getAllWarehouse = async () => {
        return Warehouse.find()
};
const getWarehouseNowId = async (warehouseId: any) => {
        return  Warehouse.findOne({_id: warehouseId})
};


export = {createNewWarehouse, getAllWarehouse, getWarehouseNowId}

