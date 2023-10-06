var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Shiva@1802',
    database : 'listing'
  });

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL from users');
});

// post user details with validation
router.post('/verify', function(req, res, next) {
  console.log(req?.body)
  var sql = 'SELECT * FROM users where email = ? and password = ?'
 
  connection.query(sql,[req.body.email, req.body.password], function(err, results) {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }else if(results.length > 0){
      res.send(results[0]);
    }else if (results.length == 0){
      res.send("invalid user");
    }

 
  });
  

});

// POST user details

router.post('/', function(req, res, next) {
    var sql = 'INSERT INTO users (first_name, email, password, last_name, seller) VALUES (?, ?, ?, ?, ?)';
   
    
    connection.query(sql, [req.body.first_name, req.body.email, req.body.password, req.body.last_name, req.body.isseller], function(err, results) {
        if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).send('Internal Server Error');
        return;
        }
    
        res.json(results);
    });
    });

    // GET user details

    router.get('/', function(req, res, next) {
        var sql = 'SELECT * FROM users';
      
        connection.query(sql, function(err, results) {
          if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
          }
      
          res.json(results);
        });
      }
      );


module.exports = router;
