const Calidad = require("../src/Calidad");
const Centro = require("../src/Centro");
const Distribucion = require("../src/Distribucion");
const Facturacion = require("../src/Facturacion");
const Local = require("../src/Local");
const Mapa = require("../src/Mapa");
const Paquete = require("../src/Paquete");

test("Crear una matriz y añadirle centros",()=>{
    var mapa=new Mapa(2,4);

    let local1=new Centro(new Local(),4);
    let facturacion1=new Centro(new Facturacion(),5);
    let calidad1 = new Centro(new Calidad(),3);
    let distribucion1 = new Centro(new Distribucion(),3);

    let local2=new Centro(new Local(),3);
    let facturacion2=new Centro(new Facturacion(),5);
    let calidad2 = new Centro(new Calidad(),3);
    let distribucion2 = new Centro(new Distribucion(),3);

    mapa.agregarFila([local1,facturacion1,calidad1,distribucion1]);
    mapa.agregarFila([local2,facturacion2,calidad2,distribucion2])
    
    expect(mapa.filas[0].length).toBe(4);
    expect(mapa.filas[1].length).toBe(4);
    expect(mapa.filas[0][0].colaDeEspera).toEqual([]);
});

// [[l1,l2,l3],//
//  [f1,f2,f3],[] ]
