function Mapa(filas,columnas){
    
    this.cantidadFilas = filas;
    this.cantidadColumnas=columnas;
    this.filas=[];
    this.agregarCentro=(centro)=>{
        this.filas.push(centro);
    }

    this.pasarTurno=()=>{
        if (this.filas[0].colaDeSalida.length!=0){
            this.filas[0].traspasarPaquete(this.filas[0].colaDeSalida[0],this.filas[1]);
        }
        this.filas[0].crearPaquetes(4,this.cantidadColumnas);
        
    }

    this.enviarPaquete = (paquete) =>{
        this.filas[0].push(paquete);
    }

    this.moverPaquetes = () => {
        if(this.filas[4].length>0){
            this.filas[4].shift();
        }
        for (let i=3; i>=0;i--){
            this.filas[i].forEach((element,index)=>{
                this.filas[i+1].push(element);
                this.filas[i][index]=undefined;
            });   
             
        }
    }
}
module.exports=Mapa;