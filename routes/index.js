var express = require('express');
var router = express.Router();
var mydb = require('../myDb');

/* GET home page. */
router.get('/', function(req, res, next) {
    var nowd = new Date();
    // the threshholds are based on seconds of time
    // so the collection rate is key here, 10 minutes = 600
    var t1 = 600;
    var t2 = 2000;
    var ctime = Math.floor(nowd.valueOf()/1000);
    mydb.all("select * from checkin order by host",[],function(err,rows){
        var len = rows.length;
        for(var i=0; i<len;i++ ){
            rows[i].age = ctime - rows[i].ctime;
            //var age = parseInt(rows[i].age);
            var age = rows[i].age;
            if ( age < t1 ) {
                rows[i].class = 'good';
            }
            else if(age >= t1 && age < t2){
                rows[i].class = 'warn';
            }
            else {
                rows[i].class = 'fail';
            }
        }
        res.render('index', { title: 'Checkin', rows: rows, len: len });
    });
});

module.exports = router;
