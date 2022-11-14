function Calidad(){
    this.procesarPaquetes=(colaDeEspera,colaDeSalida)=>{
        if (colaDeEspera.length!=0){
            let paquete=colaDeEspera.shift();
            colaDeSalida.push(paquete);
        }
    }
}

module.exports=Calidad;