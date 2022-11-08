function Distribucion(){
    this.procesarPaquetes=(colaDeEspera,colaDeSalida)=>{
        for (let i=0;i<10;i++){
            let paquete=colaDeEspera.shift();
            colaDeSalida.push(paquete);
        }
        return this.despacharPaquetes(colaDeSalida);
    }
    this.despacharPaquetes = (colaDeSalida) => {
        var texto ="";
        colaDeSalida.forEach(paquete=>{
            texto +="Entregando paquete id "+ paquete.id+" al "+paquete.destino+", ttl="+paquete.ttl+"\n";

        }); 
        return texto.slice(0,-1);
    }
}

module.exports=Distribucion;