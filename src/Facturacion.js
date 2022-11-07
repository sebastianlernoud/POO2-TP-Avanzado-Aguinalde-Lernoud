function Facturacion(){
    this.procesarPaquetes=(colaDeEspera,colaDeSalida)=>{
        for (let i=0;i<3;i++){
            let paquete=this.colaDeEspera.shift();
            this.colaDeSalida.push(paquete);
        }
    }
}

module.exports=Facturacion;