module.exports = function (carritoCompleto) {
    let carritoNuevo = [];

    var meses = [
        "Enero", "Febrero", "Marzo",
        "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre",
        "Noviembre", "Diciembre"
      ]
      
      var dia;
      var mes;
      var anio;
      var hora;
      var minutos;
      var segundos;
      

    carritoCompleto.forEach(carrito => {
        dia = carrito.updated_at.getDay();   
        mes = carrito.updated_at.getMonth();
        anio = carrito.updated_at.getFullYear();
        hora = carrito.updated_at.getHours();  
        segundos = carrito.updated_at.getSeconds();   
        minutos = carrito.updated_at.getMinutes(); 
        carritoNuevo.push({
            id:carrito.id,
            total_price:carrito.total_price,
            products_total:carrito.products_total,
            sold: carrito.sold,
            fecha: dia + ' de ' + meses[mes] + ' de ' + anio,
            hora: hora+":"+minutos+":"+segundos,
            deleted_at:carrito.deleted_at,
            address_id:carrito.address_id,
            user_id:carrito.user_id
        }
        );
    });
    return carritoNuevo;
} 