var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // response here doesn't really matter, just want to log the goodies into
    // the db
  res.send('respond with a resource');
});

module.exports = router;
