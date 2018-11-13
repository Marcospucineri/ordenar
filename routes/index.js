var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Orden.ar' });
});

/* GET home page. */
router.get('/pedidos', function(req, res) {
	var db = req.db;
 	db.collection('productos').find().toArray(function (err, items) {
 		console.log(items);
		res.render('armarpedido', { title: 'Pedidos', docs: items });
	})
  
});

/* GET home page. */
router.get('/productos', function(req, res) {
	var db = req.db;
 	db.collection('productos').find().toArray(function (err, items) {
 		console.log(items);
		res.render('p_index', { title: 'Productos', docs: items });
	})
  
});

/* GET home page. */
router.get('/productos/create', function(req, res) {
  res.render('p_create', { title: 'Crear producto' });
});

module.exports = router;
