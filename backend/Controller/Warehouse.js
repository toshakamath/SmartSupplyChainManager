const getAllWarehouses = (request, response) => {
    const collection = request.mongodb.collection("warehouse");
    collection.find({}).toArray(function (err, docs) {
        if(err){
            console.log(err);
        }
        else{
            console.log("Found the following records");
            console.log(docs);
            if(docs.length === 0){
                response.json({ status: "error", reason: "no results found" });
            }
            else{
                response.json({ status: "success", reason: "list of warehouses", warehouses: docs});
            }
        }
    });
}

const getWarehousesForCustomer = (request, response) => {
    return response.json({"status":"success"})
}

const getAllSensorsForWarehouse = (request, response) => {
    return response.json({"status":"success"})
}

const addWarehouse = (request, response) => {
    return response.json({"status":"success"})
}

const deleteWarehouse = (request, response) => {
    return response.json({"status":"success"})
}

const updateWarehouse = (request, response) => {
    return response.json({"status":"success"})
}

module.exports={getAllWarehouses, getWarehousesForCustomer, getAllSensorsForWarehouse, addWarehouse, deleteWarehouse, updateWarehouse}
