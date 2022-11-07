function Facturacion(){
    this.procesarPaquetes=(colaDeEspera,colaDeSalida)=>{
        for (let i=0;i<3;i++){
            let paquete=colaDeEspera.shift();
            colaDeSalida.push(paquete);
        }
    }
}

module.exports=Facturacion;