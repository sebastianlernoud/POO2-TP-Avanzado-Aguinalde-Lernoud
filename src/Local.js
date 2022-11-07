const Paquete = require("./Paquete");

function Local(){
    this.colaDeSalida=[];
    this.crearPaquetes=(cantidad)=>{
        for(let i =0;i<cantidad;i++){
            this.colaDeSalida.push(new Paquete());
        }
    }
}

module.exports=Local;