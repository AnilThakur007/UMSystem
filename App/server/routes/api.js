const express = require('express');
const router = express.Router();
var _sqlPackage = require("mssql");

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

//Set up your sql connection string, i am using here my own, you have to replace it with your own.
var dbConfig = {
  user: "sa",
  password: "@password1",
  server: "LAPTOP-7G1PNTT6",
  database: "UMSystem"
};


//GET API
router.get("/CheckUserLogin", function (_req, _res) {
  var _username = _req.query.username;
  var _password = _req.query.password;
  //close sql connection before creating an connection otherwise you will get an error if connection already exists.
  _sqlPackage.close();
  //Now connect your sql connection
  _sqlPackage.connect(dbConfig, function (error) {
    if (error) {
      console.log("Error while connecting to database :- " + error);
      _res.send(error);
    }
    else {
      //let's create a request for sql object
      var request = new _sqlPackage.Request();//calling a stored procedure
      request.input('Username', _sqlPackage.VarChar(50), _username);
      request.input('Password', _sqlPackage.VarChar(50), _password);
      request.execute('sp_CheckLogin', function (err, result, returnValue) {
        _res.send(result.recordset);
      });
    }
  });

  //CheckLogin(_res, _username, _password);
});
module.exports = router;
