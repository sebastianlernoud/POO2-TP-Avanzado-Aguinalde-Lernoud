function Centro (tipo,longitudCola) {
    this.tipo = tipo;
    this.colaDeEspera=[];
    this.colaDeSalida=[];
    this.longitudCola=longitudCola;
    this.recibirPaquete = (paquete) => {
        if (this.colaDeEspera.length<this.longitudCola){
            this.colaDeEspera.push(paquete);
        } else{
            throw new Error("Cola de espera llena");
        }
    }
    this.procesarPaquetes=()=>{
        if (this.tipo==="Centro de calidad"){
            let paquete=this.colaDeEspera.shift();
            this.colaDeSalida.push(paquete);
        } else if (this.tipo==="Centro de facturacion"){
            for (let i=0;i<3;i++){
                let paquete=this.colaDeEspera.shift();
                this.colaDeSalida.push(paquete);
            }
        } else if(this.tipo==="Centro de distribucion"){
            for (let i=0;i<10;i++){
                let paquete=this.colaDeEspera.shift();
                this.colaDeSalida.push(paquete);
            }
        }
        
    }
}

module.exports=Centro; 