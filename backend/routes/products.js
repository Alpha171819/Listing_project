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
  console.log('Connected to MySQL from products');
});

/* GET product details. */
router.get('/', function(req, res, next) {
  // SQL query to fetch product details
  var sql = 'SELECT * FROM products';

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
});

// post product details

router.post('/', function(req, res, next) {

  // SQL query to fetch product details

  var sql = 'INSERT INTO products (title, price, description, category, image, rating_rate, rating_count ) VALUES (?, ?, ?, ?, ?, ?, ?)';
  var values = [req.body.title,req.body.price, req.body.description, req.body.category,  req.body.image , 5.0, 1];
  // Execute the query
  connection.query(sql, values, function(err, results) {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }else{
      res.send(results);
      console.log("product added");
    }

    
  });
}
);


module.exports = router;
