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

mapa.pasarTurno(3);


