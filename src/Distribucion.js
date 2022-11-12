function Distribucion(){
    this.procesarPaquetes=(colaDeEspera)=>{
        let i=0;
        var texto ="";
        let paquete;
        while (i<10 && colaDeEspera.length>0){
            paquete=colaDeEspera.shift();
            texto +="Entregando paquete id "+ paquete.id+" al "+paquete.destino+", ttl="+paquete.ttl+"\n";
            i++;
        }
        return texto.slice(0,-1);
    }
}

module.exports=Distribucion;