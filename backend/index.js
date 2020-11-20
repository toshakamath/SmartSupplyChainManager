const express = require('express')
const cors = require('cors')

const app = express()
const port = 3001
const host = "localhost"

const warehouse = require('./Controller/Warehouse')
app.use(cors())

app.get('/login', login)

app.get('/warehouses', warehouse.getAllWarehouses)
app.get('/users', getAllCustomers)
app.get('/user/{id}', getCustomerDetails)
app.get('/warehouse/user/{id}', getWarehousesForCustomer)
app.get('/warehouse/{id}/sensors', getAllSensorsForWarehouse)
app.get('/sensor/{id}', getSensorDetails)
app.get('/sensor/constants', getSensorTypeAndUnit)
app.get('/sensor/{id}/history', getSensorHistory)

app.post('/sensor', addSensorInWarehouse)
app.delete('/sensor', deleteSensor)
app.put('/sensor', updateSensor)
app.post('/warehouse', addWarehouse)
app.delete('/warehouse', deleteWarehouse)
app.put('/warehouse', updateWarehouse)

app.listen(port, () => {
  console.log(`Example app listening at http://${host}:${port}`)
})
