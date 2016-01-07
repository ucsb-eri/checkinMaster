var sqlite3 = require('sqlite3').verbose();
//var dbpath='./myDb.sqlite3';
var conf = require('./config.json');
var db = new sqlite3.Database(conf.dbpath);


module.exports = {
    init: function(){
        db.run("create table if not exists checkin (host text primary key, ip text, ctime int)",[]);
    },
    run: function(query,params){
        db.run(query,params);
    }
};