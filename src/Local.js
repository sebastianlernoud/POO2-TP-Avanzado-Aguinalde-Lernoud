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

    
}

module.exports=Local;