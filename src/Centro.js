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
        this.ordenar(this.colaDeEspera);
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
    this.ordenar=(cola)=>{
        return cola.sort((paquete1,paquete2)=>{
            paquete1.ttl-paquete2.ttl;
        });
    }
    this.masUrgenteEnEspera=()=>{
        this.colaDeEspera=this.ordenar(this.colaDeEspera);
        return this.colaDeEspera[0];
    }
    this.masUrgenteEnSalida=()=>{
        this.colaDeSalida=this.ordenar(this.colaDeSalida);
        return this.colaDeSalida[0];
    }
}

module.exports=Centro; 