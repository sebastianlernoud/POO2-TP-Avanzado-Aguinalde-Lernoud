const Paquete = require("./Paquete");

function Local(centro){
    this.centro=centro
    this.colaDeSalida=[];
    this.crearPaquetes=(cantidad,columnas)=>{
        if (cantidad>5 || cantidad<=0){
            throw new Error("La cantidad no es valida");
        } 
        for(let i =0;i<cantidad;i++){
            this.colaDeSalida.push(new Paquete("Destino 1","Rapido",columnas));
        }
    }
    this.procesarPaquetes=()=>{ }

    
    this.traspasarPaquete=(paquete,centro)=>{
        this.centro.traspasarPaquetes(paquete,centro);
    }
}

module.exports=Local;