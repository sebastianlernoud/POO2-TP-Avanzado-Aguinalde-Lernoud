function Mapa(filas,columnas){
    
    this.cantidadFilas = filas;
    this.cantidadColumnas=columnas;
    this.filas=[];
    this.agregarCentro=(centro)=>{
        this.filas.push(centro);
    }
    this.agregarFila=(fila)=>{
        this.filas.push(fila);
    }

    this.pasarTurno=(cantidadPaquetes=4)=>{
        
        let texto = "";
        for (let j=this.cantidadColumnas-2;j>=0;j--){
            
            for(let i=0;i<this.cantidadFilas;i++){
                if (j==this.cantidadColumnas-1){
                    texto += this.filas[i][this.cantidadColumnas-1].procesarPaquetes();
                } else{
                    this.filas[i][j].procesarPaquetes();
                    while (this.filas[i][j].colaDeSalida.length>0){
                        try {
                            let paquete=this.filas[i][j].masUrgenteEnSalida();
                            let destino = this.siguienteSalto(paquete,[i,j]);
                            this.filas[i][j].traspasarPaquete(paquete,this.filas[destino][j+1]);
                        }
                        catch(error){
                            break;
                        }
                    }
                }
            }
        }

        if (cantidadPaquetes!=0){
            this.filas[0][0].crearPaquetes(cantidadPaquetes,this.cantidadColumnas);
        }
        return texto;
    }

    this.siguienteSalto=(paquete,posicion)=>{
        let destinoFinal=paquete.destino-1;
        if (destinoFinal >posicion[0]){
            return posicion[0]+1;
        } else if (destinoFinal <posicion[0]){
            return posicion[0]-1;
        }else{
            return posicion[0];
        }
    }
}
module.exports=Mapa;