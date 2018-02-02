var _expressPackage = require("express");
var _bodyParserPackage = require("body-parser");
var _sqlPackage = require("mssql");
//Initilize app with express web framework
var app = _expressPackage();
//To parse result in json format
app.use(_bodyParserPackage.json());

//Here we will enable CORS, so that we can access api on cross domain.
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Lets set up our local server now.
var server = app.listen(process.env.PORT || 4000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

//Set up your sql connection string, i am using here my own, you have to replace it with your own.
var dbConfig = {
    user: "sa",
    password: "@password1",
    server: "LAPTOP-7G1PNTT6",
    database: "UMSystem"
};

//Function to connect to database and execute query
var QueryToExecuteInDatabase = function (response, strQuery,spType) {
    //close sql connection before creating an connection otherwise you will get an error if connection already exists.
    _sqlPackage.close();
    //Now connect your sql connection
    _sqlPackage.connect(dbConfig, function (error) {
        if (error) {
            console.log("Error while connecting to database :- " + error);
            response.send(error);
        }
        else {
            //let's create a request for sql object
            var request = new _sqlPackage.Request();
            if (spType == "sp") {
                //calling a stored procedure
                request.input('Username', _sqlPackage.VarChar(50), 'admin');
                request.input('Password', _sqlPackage.VarChar(50), 'admin@123');
                request.execute('sp_CheckLogin', function (err, result, returnValue) {
                    response.send(result);
                    console.log(result.recordsets.length) // count of recordsets returned by the procedure
                    console.log(result.recordsets[0].length) // count of rows contained in first recordset
                    console.log(result.recordset) // first recordset from result.recordsets

                });
            }
            else {

                //Query to run in our database
                request.query(strQuery, function (error, responseResult) {
                    if (error) {
                        console.log("Error while connecting to database:- " + error);
                        response.send(error);
                    }
                    else {
                        response.send(responseResult);
                    }
                });
            }
        }
    });           
 }


//Function to connect to database and execute query
var CheckLogin = function (response,strUsername,strPassword) {
    //close sql connection before creating an connection otherwise you will get an error if connection already exists.
    _sqlPackage.close();
    //Now connect your sql connection
    _sqlPackage.connect(dbConfig, function (error) {
        if (error) {
            console.log("Error while connecting to database :- " + error);
            response.send(error);
        }
        else {
            //let's create a request for sql object
            var request = new _sqlPackage.Request();//calling a stored procedure
            request.input('Username', _sqlPackage.VarChar(50), strUsername);
            request.input('Password', _sqlPackage.VarChar(50), strPassword);
            request.execute('sp_CheckLogin', function (err, result, returnValue) {
                response.send(result.recordset);
             
            });
        }
    });
}

//GET API
app.get("/StudentList", function(_req ,_res){
    var Sqlquery = "select * from tbl_studentdetails";
    QueryToExecuteInDatabase(_res, Sqlquery,"sp");
});

//GET API
app.get("/api/CheckUserLogin", function (_req, _res) {
    var _username = _req.query.username;
    var _password = _req.query.password;
    CheckLogin(_res, _username, _password);
});

////POST API
// app.post("/api/user", function(req , res){
//                var query = "INSERT INTO [user] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password”);
//                executeQuery (res, query);
//});

////PUT API
// app.put("/api/user/:id", function(req , res){
//                var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
//                executeQuery (res, query);
//});

//// DELETE API
// app.delete("/api/user /:id", function(req , res){
//                var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
//                executeQuery (res, query);
//});