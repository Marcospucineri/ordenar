$(function () {

	// SETEAR
	console.log('JQ is alive!');

	$('.btnIndexDeleteProducto').click(function () {

		var rta = confirm("¿Esta seguro que desea eliminar este producto?");
		if (rta == true) {
    		var id = $(this).attr('rel');
			$.ajax({
	    		type:'DELETE',
	    		url:'/api/productos/delete/'+id
	    	}).done(function (response) {
	    		
	            // Check for a successful (blank) response
	            if (response.msg === '') {
	            	quitarElemento(id);
	            }
	            else {
	                alert('Error: ' + response.msg);
	            }

	            // Update the table

	    	});
		}
	});

	$('#btnCreateAddProducto').click(function () {
		var producto = new Object();
		producto.nombre = $('#inputNombre').val();
		producto.descripcion = $('#inputDescripcion').val();
		producto.categoria = $('#inputCategoria').val();
		producto.precio = $('#inputPrecio').val();
		console.log(producto);
		$.ajax({
    		type:'POST',
    		data:producto,
    		url:'/api/productos/add'
    	}).done(function (response) {
    		
            // Check for a successful (blank) response
            if (response.msg === '') {
            	alert('elemento guardado exitosamente!');
            	window.location.replace("/productos/");
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table

    	});
	});
	
});
		

function quitarElemento(id)
{
	$('#tableProductos tr').each(function()
	{
		check = false;
		var row = $(this);
		console.log('ROW:'+row.html())
		$(this).find('td').each(function () {
			console.log('TD:'+$(this).html())
			if ($(this).hasClass("idRow") != false) {
                if ($(this).html() == id) {
                	console.log('check!');
                    check = true;
                }
            }
		});
		if (check == true)
		{
			row.remove();
		}
	})
}
