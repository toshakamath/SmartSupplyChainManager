const tableName = "smartsupplychain_db.users"

let login = (request, response) => {
  console.log("request.BODY: ", request.body);
  let sql = `SELECT * FROM ${tableName} WHERE email='${request.body.email}' AND password='${request.body.password}'`;
  request.sqldb.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length == 0) {
        response.json({ status: "error", reason: "user not found" });
      } else {
        console.log(result[0]);
        response.json({ status: "success", reason: "logged in successfully" });
      }
    }
  });
};
//update for get customers with role only supplier
let getAllCustomers = (request, response) =>{
    console.log("request.BODY: ", request.body);
    let sql = `SELECT * FROM ${tableName}`;
    request.sqldb.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length == 0) {
          response.json({ status: "error", reason: "no users found" });
        } else {
          console.log(result[0]);
          result.forEach(user => {
            delete user.password;
          });
          response.json({ status: "success", reason: "list of users", users: result});
        }
      }
    });
}

let getCustomerDetails = (request, response) =>{
    return response.json({"status":"success"})
}

module.exports={login, getAllCustomers, getCustomerDetails}