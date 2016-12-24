var express = require('express');
var router = express.Router();
var sql = require("mssql");
var result;

// config for your database
var config = {
    user: 'INFO445',
    password: 'GoHuskies!',
    server: 'is-hay04.ischool.uw.edu',
    database: 'MSJapan'
};

// connect to database
sql.connect(config, function (err) {

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
       
    // query to the database and get the records
    request.query('SELECT * FROM PRODUCT', function (err, results) {
        
        if (err) console.log(err);

        // send records as a response
        // res.send(recordset);
        result = results;
        console.log(results[0]);
        
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'New Application', result: result});
});

module.exports = router;
