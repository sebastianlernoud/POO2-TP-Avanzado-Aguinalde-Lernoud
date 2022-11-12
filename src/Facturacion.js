function Facturacion(){
    this.procesarPaquetes=(colaDeEspera,colaDeSalida)=>{
        for (let i=0;i<3;i++){
            let paquete=colaDeEspera.shift();
            colaDeSalida.push(paquete);
        }
    }

    this.traspasarPaquete = (colaDeEspera,colaDeSalida) =>{
        this.procesarPaquetes(colaDeEspera,colaDeSalida);
    }
}

module.exports=Facturacion;