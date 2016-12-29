var express = require('express');
var router = express.Router();
var sql = require("mssql");
var results;

// config for your database
var config = {
    user: 'INFO445',
    password: 'GoHuskies!',
    server: 'is-hay04.ischool.uw.edu',
    database: 'MSJapan'
};

// connect to database
sql.connect(config, function (err) {

    if (err) {
        console.log(err);
    }

    // create request object
    var request = new sql.Request();
       
    // query the database and get the records
    request.query('SELECT * FROM PRODUCT', function (err, result) {
    console.log('preparing query');
    //request.execute('dbo.uspGetAllProducts', function (err, recordsets, returnValue) {
        results = result;
        console.log('saving results');
        console.log(result[1000]);
        //console.log(recordsets.length); // count of recordsets returned by the procedure 
        // console.log(recordsets[0].length); // count of rows contained in first recordset 
        // console.log(returnValue); // procedure return value 
        // console.log(recordsets.returnValue); // same as previous line
    });
        // results = result;
        // console.log(result[0]);
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Home', results: results});
});

router.post('/', function(req, res, next) {
    res.render('index', {title: 'Test', results: results});
});


module.exports = router;
