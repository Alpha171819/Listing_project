var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const stripe = require('stripe')('sk_test_51Nxt8KSDfcGF2ukLoRDMm5eXxCQJcrtiyHmekDL9C31CwEgP7jmoQycxiOaez97DsBIVtqahVWsL8nD5uWUH42Jz00UfslSv2H');

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

// post method for payment

router.post('/payment', async (req, res) => {
  const product = JSON.parse(req.body.item);

  const lineitems = {
    price_data: {
      currency: 'inr',
      product_data: {
        name: product.title,
      },
      unit_amount: product.price * 100,
    },
    quantity: 1,


  }


  const session = await stripe.checkout.sessions.create({
   
    payment_method_types: ['card'],
    line_items: lineitems,
    mode: 'payment',
    success_url: 'http://localhost:3000/dashboard',
    cancel_url: 'http://localhost:3000/login',
  });
  res.json({ id: session.id});
  console.log(session , "session");
}
);




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

    res.json(results);
  });
});

// post product details

router.post('/', function(req, res, next) {

  // SQL query to fetch product details

  var sql = 'INSERT INTO products (title, price, description, category, image, rating_rate, rating_count ) VALUES (?, ?, ?, ?, ?, ?, ?)';
  var values = [req.body.title,req.body.price, req.body.description, req.body.category,  req.body.image , 5.0, 1];
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