$(function () {
	$('#btnPedidoAddProducto').click(function () {
		var valId = $('#inputProducto').val();
		var valCant = $('#inputCantidad').val();
		if(verificaProducto(valId,valCant) == true) 
		{	
			var row = "";
			row += '<tr class="detalle">';
			row += '<td>';
			row += valId;
			row += '</td>';
			row += '<td>';
			row += valCant;
			row += '</td>';
			row += '</tr>';
			$('#tablePedidos').append(row);
		}
	});

	$('#btnPedidoSavePedido').click(function () {
		var pedido = new Object();
		pedido.fecha = new Date();
		pedido.activo = true;
		pedido.mesaId = 1;
		var JSONproductos = [];
		$('#tablePedidos tr.detalle').each(function () {
			JSONproductos.push({
				productoId:$(this).find('td:eq(0)').html(),
				cantidad:$(this).find('td:eq(1)').html()
			}); 
		})
		pedido.productos = JSONproductos;
		$.ajax({
    		type:'POST',
    		data:pedido,
    		url:'/api/pedidos/add'
    	}).done(function (response) {
    		
            // Check for a successful (blank) response
            if (response.msg === '') {
            	alert('Pedido guardado exitosamente!');
            }
            else {
                alert('Error: ' + response.msg);
            }
            // Update the table
    	});
	})
})

function verificaProducto	(id,cant) {
	rta = true;
	$('#tablePedidos tr.detalle').each(function () {
		var idRow = $(this).find('td:eq(0)').html();
		var cantRow = $(this).find('td:eq(1)').html();
		if(idRow == id)
		{
			rta = false;
			var total = parseInt(cant) + parseInt(cantRow);
			$(this).find('td:eq(1)').html(total);
		}
	})
	return rta;
}