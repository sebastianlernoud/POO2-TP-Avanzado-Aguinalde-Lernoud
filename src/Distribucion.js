function Distribucion(){
    this.procesarPaquetes=(colaDeEspera,colaDeSalida)=>{
        let i=0;
        let paquete;
        while (i<10 || colaDeEspera.length>0){
            paquete=colaDeEspera.shift();
            colaDeSalida.push(paquete);  
            i+=1
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