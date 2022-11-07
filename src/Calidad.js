function Calidad(){
    this.procesarPaquetes=(colaDeEspera,colaDeSalida)=>{
        let paquete=colaDeEspera.shift();
        colaDeSalida.push(paquete);
    }
}

module.exports=Calidad;