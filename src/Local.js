const Paquete = require("./Paquete");

function Local(centro){
    this.centro=centro;
    this.crearPaquetes=(cantidad,columnas)=>{
        if (cantidad>5 || cantidad<=0){
            throw new Error("La cantidad no es valida");
        } 
        for(let i =0;i<cantidad;i++){
            this.centro.colaDeSalida.push(new Paquete("Destino 1","Rapido",columnas));
        }
    }
    this.procesarPaquetes=()=>{ }

    
    this.traspasarPaquete=(paquete,centro)=>{
        this.centro.traspasarPaquete(paquete,centro);
    }
}

module.exports=Local;