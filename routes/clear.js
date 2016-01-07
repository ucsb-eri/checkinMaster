var express = require('express');
var router = express.Router();
//var sqlite3 = require('sqlite3').verbose();
var mydb = require('../myDb');

/* GET users listing. */
router.get('/:hostname', function(req, res, next) {
    var hostname = req.params.hostname;
    mydb.run("delete from  checkin where host = ? ",[ hostname ]);
    res.send('OK');
});

module.exports = router;
