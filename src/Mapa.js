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
        for (let j=this.cantidadColumnas-1;j>=0;j--){
            for(let i=0;i<this.cantidadFilas;i++){
                if (j==this.cantidadColumnas-1){
                    texto += this.filas[i][this.cantidadColumnas-1].procesarPaquetes(i+1);
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
        let cantDiagonales=paquete.destino-1 - posicion[0];
        let posibilidades=[];
        if (destinoFinal >posicion[0]){
            posibilidades.push(posicion[0]+1);
        } else if (destinoFinal <posicion[0]){
            posibilidades.push( posicion[0]-1);
        }else{
            posibilidades.push( posicion[0]);
        }
        if (posicion[1]< this.cantidadColumnas-2){
            if (this.cantidadColumnas-1-posicion[1]>cantDiagonales){
                if (posicion[0]!=0){
                    posibilidades.push(posicion[0]-1);
                }
                if (posicion[0]!=this.cantidadFilas-1){
                    posibilidades.push(posicion[0]+1);
                }
                
            }


        }


        return posibilidades;
    }
}
module.exports=Mapa;