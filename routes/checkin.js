var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // response here doesn't really matter, just want to log the goodies into
    // the db
  res.send('respond with a resource');
});

module.exports = router;


var moment = require('moment');
var then = moment("2016-01-06 09:30:00");
var sqlite3 = require('sqlite3').verbose();
var opened = false

var db = new sqlite3.Database('./myDb.sqlite3');
db.run("create table if not exists checkin (host text primary key, ip text, ctime int)",[], function(err) {
        if ( err == null ){
               myLoop();
        }
});

//var now = moment();
//
//var y = moment().format('x');
//var x = Math.floor(moment().format('x')/1000);
//var diff = now.subtract(then.format('X'));
//console.log("moment ms timestamp: "+y);
//console.log("unix timestamp: "+x);
//console.log("diff: "+diff);
//

////console.log("nowd: "+nowd.valueOf());
////setTimeout(continueExecution, 1000);
////
////
////function continueExecution(){
////}

function myLoop(){
    console.log("Starting my loop");
    var nowd = new Date();
    var ctime = Math.floor(nowd.valueOf()/1000);
    var hostname = 'malia-mini';
    db.run("insert or replace into checkin ( host, ip, ctime ) VALUES ( $host, $ip, $ctime )",{ $host: hostname, $ip: '127.0.0.1', $ctime: ctime });
}
