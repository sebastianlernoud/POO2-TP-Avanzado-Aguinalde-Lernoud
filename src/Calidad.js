function Calidad(){
    this.procesarPaquetes=(colaDeEspera,colaDeSalida)=>{
        let paquete=this.colaDeEspera.shift();
        this.colaDeSalida.push(paquete);
    }
}

module.exports=Calidad;