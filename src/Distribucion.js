function Distribucion(){
    this.procesarPaquetes=(colaDeEspera,colaDeSalida)=>{
        for (let i=0;i<10;i++){
            let paquete=colaDeEspera.shift();
            colaDeSalida.push(paquete);
        }
    }
}

module.exports=Distribucion;