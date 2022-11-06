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
        this.filas[1].push(this.filas[0][0]);
        this.filas[0].shift();
    }
}
module.exports=Mapa;