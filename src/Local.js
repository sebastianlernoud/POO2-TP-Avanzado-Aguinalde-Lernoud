const Paquete = require("./Paquete");

function Local(){
    this.colaDeSalida=[];
    this.crearPaquetes=(cantidad)=>{
        if (cantidad>5 || cantidad<=0){
            throw new Error("La cantidad no es valida");
        } 

        for(let i =0;i<cantidad;i++){
            this.colaDeSalida.push(new Paquete());
        }
    }
    this.traspasarPaquete=(paquete,centro)=>{
        var paquete = this.colaDeSalida.find(element=> element==paquete)
        centro.recibirPaquete(paquete);

    }
    
}

module.exports=Local;