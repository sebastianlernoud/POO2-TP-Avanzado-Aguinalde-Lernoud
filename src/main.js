const Calidad = require("./Calidad");
const Centro = require("./Centro");
const Distribucion = require("./Distribucion");
const Facturacion = require("./Facturacion");
const Local = require("./Local");
const Mapa = require("./Mapa");
const Paquete = require("./Paquete");


var mapa=new Mapa(4,4);

for (let i=3;i<7;i++){
    mapa.agregarFila([new Centro(new Local()),new Centro(new Facturacion(),i),new Centro(new Calidad(),i),new Centro(new Distribucion(),i)]);
}

mapa.pasarTurno();

for (let k=0; k<6;k++){
    console.log("\n\nTurno "+k+"\n");
    console.log(mapa.pasarTurno(0));
    for (let i=0; i<4;i++){
        console.log("|| Local " +i+" S="+mapa.filas[i][0].colaDeSalida.length +
                    "  -- Facturacion "+i+ " E="+mapa.filas[i][1].colaDeEspera.length +" S="+mapa.filas[i][1].colaDeSalida.length+
                    "  -- Calidad "+i+ " E="+mapa.filas[i][2].colaDeEspera.length +" S="+mapa.filas[i][2].colaDeSalida.length+
                    "  --  Distribucion "+i+ " E="+mapa.filas[i][3].colaDeEspera.length +" ||");
    }
}


