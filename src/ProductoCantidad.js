function ProductoCantidad(producto,cantidad){
    this.producto=producto;
    this.cantidad=cantidad;
    this.informacion= ()=>{
        return this.cantidad+" unidades de "+this.producto;
    }
}

module.exports =ProductoCantidad;