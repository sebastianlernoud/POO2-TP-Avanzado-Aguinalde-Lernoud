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
}
module.exports=Mapa;