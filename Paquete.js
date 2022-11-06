function Paquete (destino,urgencia){
    this.destino = destino;
    this.urgencia = urgencia;
    this.productos;
    this.sumarProducto = (producto,cantidad)=>{
        this.productos = cantidad +" unidades de " + producto;

    }
}

module.exports = Paquete;