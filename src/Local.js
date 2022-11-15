const Paquete = require("./Paquete");

function Local(){
    this.crearPaquetes=(cantidad,columnas,colaDeSalida)=>{
        if (cantidad>5 || cantidad<=0){
            throw new Error("La cantidad no es valida");
        } 
        for(let i =0;i<cantidad;i++){
            colaDeSalida.push(new Paquete("Destino 1","Rapido",columnas));
        }
    }
    this.procesarPaquetes=(colaDeEspera,colaDeSalida)=>{}
}

module.exports=Local;


/* this.procesarPaquetes=()=>{  
    this.ordenar(this.colaDeSalida);
    this.colaDeSalida.forEach(paquete => {
        paquete.disminuirTTL();
    });
}



/* this.traspasarPaquete=(paquete,centro)=>{
    var index = this.colaDeSalida.findIndex(element=> element.id==paquete.id);
    if (index!=-1){
        var paquete=this.colaDeSalida[index];
        centro.recibirPaquete(paquete);
        this.colaDeSalida.splice(index,1);
    }
} */

/*
this.ordenar=(cola)=>{
    cola.sort((paquete1,paquete2)=>{
        return paquete1.ttl-paquete2.ttl;
    });
}
this.masUrgenteEnSalida=()=>{
    this.ordenar(this.colaDeSalida);
    return this.colaDeSalida[0];
} */