const ProductoCantidad = require("../src/ProductoCantidad")

var Paquete = (function(){
    var contador=1;
    var newPaquete =function(destino,urgencia,columnas){
        this.id=contador;
        contador++;
        this.destino = destino;
        this.urgencia = urgencia;
        
        this.productos = [];
        this.sumarProducto = (producto,cantidad)=>{
            let prodCant = new ProductoCantidad(producto,cantidad);
            this.productos.push(prodCant);
    
        }
    
        this.mostrarProductos = () => {
            let resultado="";
            this.productos.forEach(prod => {resultado += prod.informacion()+", "});
            return resultado;
        }
    }
    return newPaquete;
}) ();

module.exports = Paquete;



