function Centro (tipo) {
    this.tipo = tipo;
    cola=[];
    this.recibirPaquete = (paquete) => {
        this.cola.push(paquete);
    }
}

module.exports=Centro;