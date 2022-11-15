function Facturacion(){
    this.procesarPaquetes=(colaDeEspera,colaDeSalida)=>{
        let i=0;
        while (i<3 && colaDeEspera.length!=0){
            let paquete=colaDeEspera.shift();
            colaDeSalida.push(paquete);
            i++;
        }
    }
    this.crearPaquetes = () => {}
}

module.exports=Facturacion;