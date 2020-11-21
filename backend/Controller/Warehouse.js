const tableName = "smartsupplychain_db.users";

const getAllWarehouses = (request, response) => {
    const collection = request.mongodb.collection("warehouse");
    collection.find({}).toArray(function (err, docs) {
        if(err){
            console.log(err);
            response.json({ status: "error", reason: err });
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
    const collection = request.mongodb.collection("warehouse");
    let sql = `SELECT warehouse_id FROM ${tableName} WHERE email='${request.params.email}'`;
    request.sqldb.query(sql, (err, result) => {
        if (err) {
        console.log(err);
        response.json({ status: "error", reason: err });
        } else {
        if (result.length == 0) {
            response.json({ status: "error", reason: "user not found" });
        } else {
            console.log("type of ?", result[0].warehouse_id);
            if(JSON.parse(result[0].warehouse_id).length === 0){
                response.json({ status: "error", reason: "user has no warehouses" });
            }
            else{
                collection.find({id:{$in:JSON.parse(result[0].warehouse_id)}}).toArray(function (err, docs) {
                    if(err){
                        console.log(err);
                        response.json({ status: "error", reason: err });
                    }
                    else{
                        console.log("Found the following records");
                        console.log(docs);
                        if(docs.length === 0){
                            response.json({ status: "error", reason: "no warehouse results found" });
                        }
                        else{
                            response.json({ status: "success", reason: "list of warehouses for user", warehouses: docs});
                        }
                    }
                });
            }
        }
        }
    });
}

//also first check whether user can view this warehouse
const getAllSensorsForWarehouse = (request, response) => {
    const collection = request.mongodb.collection("sensors");
    collection.find({warehouse_id: request.params.id}).toArray(function (err, docs) {
        if(err){
            console.log(err);
            response.json({ status: "error", reason: err });
        }
        else{
            console.log("Found the following records");
            console.log(docs);
            if(docs.length === 0){
                response.json({ status: "error", reason: "no sensors in this warehouse" });
            }
            else{
                response.json({ status: "success", reason: "list of sensors in a warehouse", sensors: docs});
            }
        }
    });
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
