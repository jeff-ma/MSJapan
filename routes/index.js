var express = require('express');
var router = express.Router();
var sql = require("mssql");
var results;
var brands;
var storage;

// config for your database
var config = {
    user: 'INFO445',
    password: 'GoHuskies!',
    server: 'is-hay04.ischool.uw.edu',
    database: 'MSJapan'
};

// connect to database
sql.connect(config, function(err) {

    if (err) {
        console.log(err);
    }

    // create request object
    var request = new sql.Request();
       
    // query the database and get the records
    request.query('SELECT * FROM PRODUCT', function(err, recordset) {
        console.log('preparing query');
        results = recordset;
        console.log('saving results');
        console.log(recordset[1000]);
    });

    // query distinct brand names 
    request.query('SELECT DISTINCT ManufacturerName FROM MANUFACTURER JOIN PRODUCT ON MANUFACTURER.ManufacturerID=PRODUCT.ManufacturerID', function(err, recordset) {
    	console.log('getting brands');
    	brands = recordset;
    	console.log('saving brands');
    	console.log(recordset);
    });

    // request.query('SELECT DISTINCT StorageSpaceGB FROM STORAGE', function(err, recordset) {
    // 	console.log('getting storage sizes');
    // 	storage = recordset;
    // 	console.log('saving storage');
    // 	console.log(recordset);
    // });
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Home', results: results, brands: brands});
});

router.post('/', function(req, res, next) {
	console.log('getting storage');
	var store = req.body.Storage;
	console.log(req.body);
    console.log(store);
    res.render('index', {title: 'Test', results: results, brands: brands});
});

module.exports = router;
