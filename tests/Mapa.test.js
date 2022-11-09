const Calidad = require("../src/Calidad");
const Centro = require("../src/Centro");
const Distribucion = require("../src/Distribucion");
const Facturacion = require("../src/Facturacion");
const Local = require("../src/Local");
const Mapa = require("../src/Mapa")
const Paquete = require("../src/Paquete")

test("Crear mapa",()=>{
    var mapa = new Mapa(1,5);
    expect(mapa.cantidadFilas).toBe(1);
    expect(mapa.cantidadColumnas).toBe(5);
});

// test("Introducir un nuevo paquete al mapa",()=>{
//     let paquete= new Paquete("destino 1","Muy rapido");
//     paquete.sumarProducto("",2);
//     var mapa = new Mapa(1,5);
//     mapa.enviarPaquete(paquete);
//     expect(mapa.filas[0][0]).toBe(paquete);
// });

// test("Introducir varios paquetes al mapa",()=>{
//     let paquete1= new Paquete("destino 1","Muy rapido");
//     let paquete2= new Paquete("destino 2","rapido");
    
//     var mapa = new Mapa(1,5);
//     mapa.enviarPaquete(paquete1);
//     mapa.enviarPaquete(paquete2);
//     expect(mapa.filas[0]).toEqual([paquete1,paquete2]);
// });

// test("Mover paquetes del mapa",()=>{
//     let paquete1= new Paquete("destino 1","Muy rapido");
//     var mapa = new Mapa(1,5);
//     mapa.enviarPaquete(paquete1);
//     mapa.moverPaquetes();
//     expect(mapa.filas[1]).toEqual([paquete1]);
//     expect(mapa.filas[0]).toEqual([]);
// });


// test("Mover un paquete hasta el final del mapa",()=>{
//     let paquete1= new Paquete("destino 1","Muy rapido");
//     var mapa = new Mapa(1,5);
//     mapa.enviarPaquete(paquete1);
//     for (let i=0;i<4;i++){
//         mapa.moverPaquetes();
//     }
//     expect(mapa.filas[4]).toEqual([paquete1]);
//     expect(mapa.filas[0]).toEqual([]);
// });

// test("Mover varios paquetes hasta el final del mapa",()=>{
//     let paquete1= new Paquete("destino 1","Muy rapido");
//     let paquete2= new Paquete("destino 1","Normal");
//     var mapa = new Mapa(1,5);
//     mapa.enviarPaquete(paquete1);
//     mapa.enviarPaquete(paquete2);
    
//     for (let i=0;i<4;i++){
//         mapa.moverPaquetes();
//     }
//     expect(mapa.filas[4]).toEqual([paquete1,paquete2]);
//     expect(mapa.filas[0]).toEqual([]);
    
// });

test("Armar matriz con centros",()=>{
    var mapa = new Mapa(1,4);
    let local=new Centro(new Local(),5)
    let facturacion=new Centro(new Facturacion(),5);
    let calidad = new Centro(new Calidad(),5);
    let distribucion = new Centro(new Distribucion(),5);
    mapa.agregarCentro(local);
    mapa.agregarCentro(facturacion);
    mapa.agregarCentro(calidad);
    mapa.agregarCentro(distribucion);
    expect(mapa.filas).toEqual([local,facturacion,calidad,distribucion]);
});

test("Crear un paquete desde la matriz",()=>{
    var mapa = new Mapa(1,4);
    let local=new Local();
    let facturacion=new Centro(new Facturacion(),5);
    let calidad = new Centro(new Calidad(),5);
    let distribucion = new Centro(new Distribucion(),5);
    mapa.agregarCentro(local);
    mapa.agregarCentro(facturacion);
    mapa.agregarCentro(calidad);
    mapa.agregarCentro(distribucion);
    mapa.pasarTurno();
    expect(mapa.filas[0].colaDeSalida.length>0).toBeTruthy();
});

test("Crear un paquete desde la matriz y pasarlo a facturacion",()=>{
    var mapa = new Mapa(1,4);
    let local=new Local();
    let facturacion=new Centro(new Facturacion(),5);
    let calidad = new Centro(new Calidad(),5);
    let distribucion = new Centro(new Distribucion(),5);
    mapa.agregarCentro(local);
    mapa.agregarCentro(facturacion);
    mapa.agregarCentro(calidad);
    mapa.agregarCentro(distribucion);
    mapa.pasarTurno();
    mapa.pasarTurno();
    expect(mapa.filas[1].colaDeEspera.length>0).toBeTruthy();
    expect(facturacion.colaDeSalida[0].ttl).toBe(5);
});