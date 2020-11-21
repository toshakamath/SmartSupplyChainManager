const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("./Config/mysqldb");
const mongo = require("./Config/mongodb");

const app = express();
const port = 3001;
const host = "localhost";

const user = require("./Controller/User");
const warehouse = require("./Controller/Warehouse");
const sensor = require("./Controller/Sensor");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mysql.setupMySqlDbConnection((err, mysql_connection) => {
  if (err) {
    console.log(err);
    throw err;
  } else {
    mongo.setupMongoDbConnection((err, mongodb_connection) => {
      if (err) {
        console.log(err);
        throw err;
      } else {
        app.use((req, res, next) => {
          req.sqldb = mysql_connection;
          next();
        });
        app.use((req, res, next) => {
          req.mongodb = mongodb_connection;
          next();
        });
        app.post("/login", user.login);
        app.get("/users", user.getAllCustomers);
        // SELECT * FROM USERS
        app.get("/user/{email}", user.getCustomerDetails);
        // SELECT * FROM USERS where email=${email}
        app.get("/warehouses", warehouse.getAllWarehouses);
        // const collection = db.collection('warehouse');
        // collection.find({}).toArray(function(err, docs) {
        //     console.log("Found the following records");
        //     console.log(docs)
        // });
        app.get("/warehouse/user/{email}", warehouse.getWarehousesForCustomer);
        // warehouse_id = SELECT warehouse_id from users where email=${email}
        // warehouse_id = [1,2,3]
        // const collection = db.collection('warehouse');
        // collection.find({
        // id: {$in:warehouse_id}
        // }).toArray(function(err, docs) {
        //     console.log("Found the following records");
        //     console.log(docs)
        // });
        app.get("/warehouse/{id}/sensors", warehouse.getAllSensorsForWarehouse);
        // const collection = db.collection('sensors');
        // collection.find({ warehouse_id: id }).toArray(function(err, docs) {
        //     console.log("Found the following records");
        //     console.log(docs)
        // });
        app.post("/warehouse", warehouse.addWarehouse);
        // const collection = db.collection('warehouse');
        // id, name, address, location{lat,long}, warehouse_status(available, unavailable), status_details, sensor_id[]
        // let ob = {
        //     "name": "Alpha",
        //     "address": "Texas, CA",
        //     "location": {
        //         "lat": 40.854885,
        //         "lng": -88.081807},
        //     "warehouse_status" : "available",
        //     "status_details" : ""
        // }
        // db.inventory.insertOne(req.body, function(err, result) {
        //     console.log("Updated the document with the field a equal to 2");
        //      SELECT warehouse_id from USERS where email=email
        //      UPDATE USERS SET warehouse_id = [append into select query response array] WHERE email=email;
        //      response.json({shit})
        //   });)
        app.delete("/warehouse/{id}", warehouse.deleteWarehouse);
        // const collection = db.collection('warehouse');
        // db.inventory.deleteOne( { id: id }, function(err, result) {
        //     console.log("Updated the document with the field a equal to 2");
        //      response.json({shit})
        //   }); )
        app.put("/warehouse/{id}", warehouse.updateWarehouse);
        // const collection = db.collection('warehouse');
        // collection.updateOne({ id : id }
        //     , { $set: req.body }, function(err, result) {
        //     console.log("Updated the document with the field a equal to 2");
        //      response.json({shit})
        //   });
        app.get("/sensor/{id}", sensor.getSensorDetails);
        // const collection = db.collection('sensors');
        // collection.find({ id: id }).toArray(function(err, docs) {
        //     console.log("Found the following records");
        //     console.log(docs)
        // });
        app.get("/sensor/constants", sensor.getSensorTypeAndUnit);
        // const collection = db.collection('sensor_type_unit_map');
        // collection.find({}).toArray(function(err, docs) {
        //     console.log("Found the following records");
        //     console.log(docs)
        // });
        app.get("/sensor/{id}/history", sensor.getSensorHistory);
        // const collection = db.collection('sensor_history');
        // collection.find({ sensor_id: id }).toArray(function(err, docs) {
        //     console.log("Found the following records");
        //     console.log(docs)
        // });
        app.post("/sensor", sensor.addSensorInWarehouse);
        // const collection = db.collection('sensor');
        // sensor_id, sensor_type, sensor_unit, sensor_status(active,inactive), status_details, warehouse_id
        // let ob = {
        //     "sensor_type": "Alpha",
        //     "sensor_unit": "Texas, CA",
        //     "warehouse_id": "1",
        //     "sensor_status" : "available",
        //     "status_details" : ""
        // }
        // db.inventory.insertOne(req.body, function(err, result) {
        //     console.log("Updated the document with the field a equal to 2");
        //      response.json({shit})
        //   });)
        app.delete("/sensor/{id}", sensor.deleteSensor);
        // const collection = db.collection('sensor');
        // db.inventory.deleteOne( { id: id }, function(err, result) {
        //     console.log("Updated the document with the field a equal to 2");
        //      response.json({shit})
        //   }); )
        app.put("/sensor/{id}", sensor.updateSensor);
        // const collection = db.collection('sensor');
        // collection.updateOne({ id : id }
        //     , { $set: req.body }, function(err, result) {
        //     console.log("Updated the document with the field a equal to 2");
        //      response.json({shit})
        //   });
      }
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://${host}:${port}`);
});
