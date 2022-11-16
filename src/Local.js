const Paquete = require("./Paquete");

function Local(){
    this.crearPaquetes=(cantidad,columnas,filas,colaDeSalida)=>{
        if (cantidad>5 || cantidad<=0){
            throw new Error("La cantidad no es valida");
        } 
        for(let i =0;i<cantidad;i++){
            let paquete=new Paquete(this.darDestino(filas),this.darUrgencia(),columnas)
            colaDeSalida.push(paquete);
            //console.log("Creando paquete "+paquete.id +", con destino "+paquete.destino+" y urgencia "+paquete.urgencia)
        }
    }
    this.procesarPaquetes=(colaDeEspera,colaDeSalida)=>{}

    this.darUrgencia=()=>{
        let choices=["Normal","Rapido","Muy rapido"]
        return choices[Math.floor(Math.random()*choices.length)];
    }
    this.darDestino=(filas)=>{
        return Math.floor(Math.random()*filas)+1;
    }
}

module.exports=Local;

