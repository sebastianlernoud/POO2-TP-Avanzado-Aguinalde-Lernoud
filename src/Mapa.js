function Mapa(filas,columnas){
    
    this.cantidadFilas = filas;
    this.cantidadColumnas=columnas;
    this.filas=[];
    for (let j=0;j<this.cantidadColumnas;j++){
        this.filas.push([]);
    }

    this.enviarPaquete = (paquete) =>{
        this.filas[0].push(paquete);
    }

    this.moverPaquetes = () => {
        for (let i=0; i<this.cantidadFilas-1;i++){
            this.filas[i+1].push(this.filas[i][0]);
            this.filas[i].shift();
        }
    }
}
module.exports=Mapa;