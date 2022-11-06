function Centro (tipo) {
    this.tipo = tipo;
    this.cola=[];
    this.recibirPaquete = (paquete) => {
        this.cola.push(paquete);
    }
}

module.exports=Centro;