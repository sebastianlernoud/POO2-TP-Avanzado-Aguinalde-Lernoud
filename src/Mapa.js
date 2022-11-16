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
        for(let i=0;i<this.cantidadFilas;i++){
            texto += this.filas[i][this.cantidadColumnas-1].procesarPaquetes();
            for (let j=this.cantidadColumnas-2;j>=0;j--){
                this.filas[i][j].procesarPaquetes();
                while (this.filas[i][j].colaDeSalida.length>0){
                    try {
                        let paquete=this.filas[i][j].masUrgenteEnSalida();
                        this.filas[i][j].traspasarPaquete(paquete,this.filas[i][j+1]);
                    }
                    catch(error){
                        break;
                    }
                }
            }
        }

        if (cantidadPaquetes!=0){
            this.filas[0][0].crearPaquetes(cantidadPaquetes,this.cantidadColumnas);
        }
        return texto;
    }
}
module.exports=Mapa;