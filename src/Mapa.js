function Mapa(filas,columnas){
    
    this.cantidadFilas = filas;
    this.cantidadColumnas=columnas;
    this.filas=[];
    this.agregarCentro=(centro)=>{
        this.filas.push(centro);
    }

    this.pasarTurno=()=>{
        let texto = this.filas[this.cantidadColumnas-1].procesarPaquetes();
        for (let i=this.cantidadColumnas-2;i>=0;i--){
            this.filas[i].procesarPaquetes();
            while (this.filas[i].colaDeSalida.length>0){
                try {
                    let paquete=this.filas[i].masUrgenteEnSalida();
                    this.filas[i].traspasarPaquete(paquete,this.filas[i+1]);
                }
                catch(error){
                    break;
                }
            }
        }
        this.filas[0].crearPaquetes(4,this.cantidadColumnas);
        return texto;
    }
}
module.exports=Mapa;