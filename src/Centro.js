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
        this.colaDeEspera.forEach(paquete => {
            paquete.disminuirTTL();
        })
        this.colaDeEspera.sort((paquete1,paquete2)=>{
            paquete1.ttl-paquete2.ttl;
        })
        return this.tipo.procesarPaquetes(this.colaDeEspera,this.colaDeSalida);
    }
    this.traspasarPaquete=(paquete,centro)=>{
        var index = this.colaDeSalida.findIndex(element=> element.id==paquete.id);
        if (index!=-1){
            var paquete=this.colaDeSalida[index];
            this.colaDeSalida.splice(index,1);
            centro.recibirPaquete(paquete);
        }
    }
}

module.exports=Centro; 