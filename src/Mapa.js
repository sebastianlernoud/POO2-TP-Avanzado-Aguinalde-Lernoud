function Mapa(filas,columnas){
    
    this.cantidadFilas = filas;
    this.cantidadColumnas=columnas;
    this.filas=[];
    this.agregarCentro=(centro)=>{
        this.filas.push(centro);
    }

    this.pasarTurno=()=>{
        //let texto = this.filas[this.cantidadColumnas-1].procesarPaquetes();
        for (let i=this.cantidadColumnas-2;i>0;i--){
            
            this.filas[i].procesarPaquetes();
            if (this.filas[i].colaDeSalida.length!=0){
                this.filas[i].traspasarPaquete(this.filas[i].colaDeSalida[0],this.filas[i+1]);
            }
        }
        
        if (this.filas[0].colaDeSalida.length==0){
            this.filas[0].crearPaquetes(4,this.cantidadColumnas);
        } else{
            this.filas[0].traspasarPaquete(this.filas[0].colaDeSalida[0],this.filas[1]);
        }
    }
}
module.exports=Mapa;