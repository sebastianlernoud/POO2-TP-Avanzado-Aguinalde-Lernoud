function Mapa(filas,columnas){
    
    this.cantidadFilas = filas;
    this.cantidadColumnas=columnas;
    this.filas=[];
    for (j=0;j<cantidadColumnas;j++){
        this.filas[j].push("");
    }

}
// ["","",paquete,"",""]
module.exports=Mapa;