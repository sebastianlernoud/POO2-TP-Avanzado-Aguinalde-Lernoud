function Centro (tipo,longitudCola) {
    this.tipo = tipo;
    this.colaDeEspera=[];
    this.colaDeSalida=[];
    this.longitudCola=longitudCola;
    this.recibirPaquete = (paquete) => {
        if (this.colaDeEspera.length<this.longitudCola){
            this.colaDeEspera.push(paquete);
        } else{
            throw new Error("Cola de espera llena");
        }
    }
    this.procesarPaquetes=()=>{
        this.tipo.procesarPaquetes(this.colaDeEspera,this.colaDeSalida);
        
    }
}

module.exports=Centro; 