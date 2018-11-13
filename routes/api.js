var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('api/api', { title: 'Orden.ar API' });
});

/* GET home page. */
router.get('/algo', function(req, res) {
  res.render('api/api', { title: 'THE JUNGLE!' });
});

/********************** PRODUCTOS *******************/

	/* GET home page. */
	router.get('/productos', function(req, res) {
		var db = req.db;
	 	db.collection('productos').find().toArray(function (err, items) {
			res.json(items);
		})
	});

// REST
	/* GET home page. */
	router.get('/productos/:id', function(req, res) {
		var db = req.db;
		var id = req.params.id;
		console.log(id);
	 	db.collection('productos').findById(id,function (err, items) {
			res.json(items);
		})
	});

//POST
	 router.post('/productos/add',function(req, res){
	 	var db = req.db;
	 	db.collection('productos').insert(req.body,function (err, result) {
	 		res.send(
	 			(err === null) ? { msg: ''} : { msg: err }
	 		);
	 	})
	 });

	router.delete('/productos/delete/:id',function(req, res){
		var db = req.db;
		var id = req.params.id;
		db.collection('productos').removeById(id,function (err, result) {
			res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
		})
	})

/************************** PEDIDOS *******************/

	router.get('/pedidos',function(req, res){
	 	var db = req.db;
    console.log('pepe');
    db.collection('pedidos').find().toArray(function (err, items) {
			res.json(items);
		})
	 });

   router.post('/pedidos/add',function(req, res){
   	 	var db = req.db;
   	 	db.collection('pedidos').insert(req.body,function (err, result) {
   	 		res.send(
   	 			(err === null) ? { msg: ''} : { msg: err }
   	 		);
   	 	})
   	 });

/************************* FIN ***********************/

module.exports = router;
