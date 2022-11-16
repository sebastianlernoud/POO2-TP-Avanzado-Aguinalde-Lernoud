function Distribucion(){
    this.procesarPaquetes=(colaDeEspera,colaDeSalida,posicion)=>{
        let i=0;
        var texto ="";
        let paquete;
        while (i<10 && colaDeEspera.length>0){
            
            paquete=colaDeEspera.shift();
            if (posicion==undefined){
                posicion=paquete.destino;
            }
            texto +="Entregando paquete id "+ paquete.id+" al Destino "+posicion+", ttl="+paquete.ttl+"\n";
            i++;
        }
        return texto.slice(0,-1);
    }

    this.crearPaquetes = () => {}
}

module.exports=Distribucion;