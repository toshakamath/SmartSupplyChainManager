
const getSensorDetails = (request, response) => {
    // const collection = request.mongodb.collection("sensors");
    // collection.find({id: request.params.id}).toArray(function (err, docs) {
    //     if(err){
    //         console.log(err);
    //         response.json({ status: "error", reason: err });
    //     }
    //     else{
    //         console.log("Found the following records");
    //         console.log(docs);
    //         if(docs.length === 0){
    //             response.json({ status: "error", reason: "no sensors in this warehouse" });
    //         }
    //         else{
    //             response.json({ status: "success", reason: "sensor details", sensors: docs});
    //         }
    //     }
    // });
}

const getSensorTypeAndUnit = (request, response) => {
    return response.json({"status":"success"})
}

const getSensorHistory = (request, response) => {
    return response.json({"status":"success"})
}

//request should contain warehouse_id also check whether warehouse ID exists before inserting 
const addSensorInWarehouse = (request, response) => {
    const collection = request.mongodb.collection('sensor');
    collection.insertOne(request.body, function(err, docs) {
        if(err){
            console.log(err)
            response.json({ status: "error", reason: err });
        }
        else{
            response.json({ status: "success", reason: "sensor details"});
        }
      });
}

const deleteSensor = (request, response) => {
    return response.json({"status":"success"})
}

const updateSensor = (request, response) => {
    return response.json({"status":"success"})
}

module.exports={getSensorDetails, getSensorTypeAndUnit, getSensorHistory, addSensorInWarehouse, deleteSensor, updateSensor}
