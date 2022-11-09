const Paquete = require("./Paquete");

function Local(){
    this.colaDeSalida=[];
    this.crearPaquetes=(cantidad,columnas)=>{
        if (cantidad>5 || cantidad<=0){
            throw new Error("La cantidad no es valida");
        } 

        for(let i =0;i<cantidad;i++){
            this.colaDeSalida.push(new Paquete("Destino 1","Rapido",columnas));
        }
    }
    this.traspasarPaquete=(paquete,centro)=>{
        var index = this.colaDeSalida.findIndex(element=> element==paquete);
        var paquete=this.colaDeSalida[index];
        this.colaDeSalida.splice(index,1);
        centro.recibirPaquete(paquete);
    }
    
}

module.exports=Local;