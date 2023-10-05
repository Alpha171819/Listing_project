var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// Create a MySQL connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Shiva@1802',
    database : 'listing'
  });

// Connect to the MySQL server
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
 
  // Execute the query
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
    // SQL query to insert user details
    var sql = 'INSERT INTO users (first_name, email, password, last_name, seller) VALUES (?, ?, ?, ?, ?)';
   
    
    // Execute the query
    connection.query(sql, [req.body.first_name, req.body.email, req.body.password, req.body.last_name, req.body.isseller], function(err, results) {
        if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).send('Internal Server Error');
        return;
        }
    
        // Send the product details as JSON response
        res.json(results);
    });
    });

    // GET user details

    router.get('/', function(req, res, next) {
        // SQL query to fetch user details
        var sql = 'SELECT * FROM users';
      
        // Execute the query
        connection.query(sql, function(err, results) {
          if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
          }
      
          // Send the product details as JSON response
          res.json(results);
        });
      }
      );


module.exports = router;
