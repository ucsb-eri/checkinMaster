var express = require('express');
var router = express.Router();
//var sqlite3 = require('sqlite3').verbose();
var mydb = require('../myDb');

/* GET users listing. */
router.get('/:hostname', function(req, res, next) {
    // response here doesn't really matter, just want to log the goodies into
    // the db
    //var db = new sqlite3.Database('./myDb.sqlite3');
    var nowd = new Date();
    var ctime = Math.floor(nowd.valueOf()/1000);
    var hostname = req.params.hostname;
    var ip = req.connection.remoteAddress;
    //var ip = req.headers['x-forwarded-for'];
    //mydb.run("insert or replace into checkin ( host, ip, ctime ) VALUES ( $host, $ip, $ctime )",{ $host: hostname, $ip: ip, $ctime: ctime });
    mydb.run("insert or replace into checkin ( host, ip, ctime ) VALUES ( ? , ? , ? )",[ hostname, ip, ctime ]);
    res.send('OK');
});

module.exports = router;
