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
                    texto += this.filas[i][this.cantidadColumnas-1].procesarPaquetes(i+1)+"\n";
                } else{
                    this.filas[i][j].procesarPaquetes();
                    var longitudCola= this.filas[i][j].colaDeSalida.length;
                    while (longitudCola>0){
                        let paso=false;
                        let paquete=this.filas[i][j].masUrgenteEnSalida();
                        let destinos = this.siguienteSalto(paquete,[i,j]);
                        let cont=0;
                        while (!paso && cont<destinos.length){
                            let destino = destinos[cont];
                            
                            try{
                                this.filas[i][j].traspasarPaquete(paquete,this.filas[destino][j+1]);
                                if (paquete.id==18){
                                    console.log(destino);
                                }
                                paso=true;
                            } catch(error){
                                cont++;
                                
                            }
                        }
                        longitudCola--;
                    }
                }
            }
        }

        if (cantidadPaquetes!=0){

            for (let k=0;k<this.cantidadFilas;k++){
                this.filas[k][0].crearPaquetes(cantidadPaquetes,this.cantidadColumnas,this.cantidadFilas);
            }
            
        }
        return texto.slice(0,-1);
    }

    this.siguienteSalto=(paquete,posicion)=>{
        let destinoFinal=paquete.destino-1;
        let posibilidades=[];
        if (destinoFinal >posicion[0]){
            posibilidades.push(posicion[0]+1);
        } else if (destinoFinal <posicion[0]){
            posibilidades.push( posicion[0]-1);
        }else{
            posibilidades.push( posicion[0]);
        }
    
        if (this.puedeSubir(paquete,posicion)){
            posibilidades.push(posicion[0]-1);
            
        } 
        if (this.puedeIrDerecho(paquete,posicion)){
            posibilidades.push(posicion[0]);
        }
        if (this.puedeBajar(paquete,posicion)){
            posibilidades.push(posicion[0]+1);
        }

        return posibilidades;
    }

    this.puedeBajar=(paquete,posicion)=>{
        let cantMovidas = this.cantidadColumnas-1-posicion[1];
        let cantDiagonalesSiBaja = posicion[0]+1-(paquete.destino-1);
        if (cantDiagonalesSiBaja<0){
            cantDiagonalesSiBaja=-1*cantDiagonalesSiBaja;
        }
        if (posicion[0]<(this.cantidadFilas-1) &&
            posicion[1]<(this.cantidadColumnas-2) &&
             cantDiagonalesSiBaja<=(cantMovidas-1)){
            return true;
        } 
        return false;
        

    }

    this.puedeSubir=(paquete,posicion)=>{
        let cantMovidas = this.cantidadColumnas-1-posicion[1];
        let cantDiagonalesSiSube = posicion[0]-1-(paquete.destino-1);
        if (cantDiagonalesSiSube<0){
            cantDiagonalesSiSube=-1*cantDiagonalesSiSube;
        }
        if(posicion[0]!=0 && 
            posicion[1]<this.cantidadColumnas-2 &&
            cantDiagonalesSiSube <=cantMovidas-1 ){
            return true;
        } else{
            return false;
        }
    }

    this.puedeIrDerecho=(paquete,posicion)=>{
        let cantMovidas = this.cantidadColumnas-1-posicion[1];
        let cantDiagonalesNecesarias = posicion[0]-(paquete.destino-1);
        if (cantDiagonalesNecesarias<0){
            cantDiagonalesNecesarias=-1*cantDiagonalesNecesarias;
        }
        if(cantDiagonalesNecesarias<=cantMovidas-1){
            return true;
        }
        return false;
    }
}
module.exports=Mapa;