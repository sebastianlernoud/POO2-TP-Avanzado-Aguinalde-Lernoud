function Distribucion(){
    this.procesarPaquetes=(colaDeEspera,colaDeSalida)=>{
        for (let i=0;i<10;i++){
            let paquete=colaDeEspera.shift();
            colaDeSalida.push(paquete);
        }
        return this.despacharPaquetes(colaDeSalida);
    }
    this.despacharPaquetes = (colaDeSalida) => {
        var texto = "Entregando paquete id ";
        
        texto += colaDeSalida[0].id+" al "+colaDeSalida[0].destino+", ttl="+colaDeSalida[0].ttl;
         
        return texto;
    }
}

module.exports=Distribucion;