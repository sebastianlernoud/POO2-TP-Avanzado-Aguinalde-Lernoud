const ProductoCantidad = require("../src/ProductoCantidad")

function Paquete (destino,urgencia){
    var id=0;
    this.identificador=id;
    id++;
    this.destino = destino;
    this.urgencia = urgencia;
    this.productos = [];
    this.sumarProducto = (producto,cantidad)=>{
        let prodCant = new ProductoCantidad(producto,cantidad);
        this.productos.push(prodCant);

    }

    this.mostrarProductos = () => {
        let resultado="";
        this.productos.forEach(prod => {resultado += prod.informacion+", "});
        return resultado;
    }
}

module.exports = Paquete;