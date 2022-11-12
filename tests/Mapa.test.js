const Calidad = require("../src/Calidad");
const Centro = require("../src/Centro");
const Distribucion = require("../src/Distribucion");
const Facturacion = require("../src/Facturacion");
const Local = require("../src/Local");
const Mapa = require("../src/Mapa");
const Paquete = require("../src/Paquete");

var mapa;
beforeEach(()=>{
    mapa = new Mapa(1,4);
});

test("Crear mapa",()=>{
    expect(mapa.cantidadFilas).toBe(1);
    expect(mapa.cantidadColumnas).toBe(4);
});

test("Armar matriz con centros",()=>{
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
    expect(facturacion.colaDeEspera[0].ttl).toBe(5);
});

test("Paquete de local a destino",()=>{
    let local=new Local();
    let facturacion=new Centro(new Facturacion(),5);
    let calidad = new Centro(new Calidad(),5);
    let distribucion = new Centro(new Distribucion(),5);
    mapa.agregarCentro(local);
    mapa.agregarCentro(facturacion);
    mapa.agregarCentro(calidad);
    mapa.agregarCentro(distribucion);
    local.crearPaquetes(1,4);
    let id=local.colaDeSalida[0].id;
    let destino = local.colaDeSalida[0].destino;
    let ttl=local.colaDeSalida[0].ttl -4;
    for (let i=0;i<3;i++){
        mapa.pasarTurno();
        expect(mapa.filas[i+1].colaDeEspera.length).toBe(1);
    }
    expect(distribucion.procesarPaquetes()).toBe("Entregando paquete id "+id+" al "+destino+", ttl="+ttl);
    expect(mapa.filas[3].colaDeEspera.length).toBe(0);
});

test("Paquetes de local a destino, misma urgencia y mismo destino",()=>{
    let local=new Local();
    let facturacion=new Centro(new Facturacion(),5);
    let calidad = new Centro(new Calidad(),5);
    let distribucion = new Centro(new Distribucion(),5);
    mapa.agregarCentro(local);
    mapa.agregarCentro(facturacion);
    mapa.agregarCentro(calidad);
    mapa.agregarCentro(distribucion);
    local.crearPaquetes(3,4);
    let id1=local.colaDeSalida[0].id;
    let id2=local.colaDeSalida[1].id;
    let id3=local.colaDeSalida[2].id;
    let ttl1=local.colaDeSalida[0].ttl -4;
    let ttl2=local.colaDeSalida[0].ttl -5;
    let ttl3=local.colaDeSalida[0].ttl -6;
    let destino = local.colaDeSalida[0].destino;
    
    for (let i=0;i<3;i++){
        mapa.pasarTurno();
        expect(mapa.filas[i+1].colaDeEspera.length).toBe(1);
    };
    expect(distribucion.procesarPaquetes()).toBe("Entregando paquete id "+id1+" al "+destino+", ttl="+ttl1);
    expect(mapa.filas[3].colaDeEspera.length).toBe(0);
    expect(mapa.filas[2].colaDeEspera[0].ttl).toBe(2); //Se recibe 4 cuando debe recibir 2
    mapa.pasarTurno();
//     expect(distribucion.procesarPaquetes()).toBe("Entregando paquete id "+id2+" al "+destino+", ttl="+ttl2);
//     expect(mapa.filas[3].colaDeEspera.length).toBe(0);
//     mapa.pasarTurno();
//     expect(distribucion.procesarPaquetes()).toBe("Entregando paquete id "+id3+" al "+destino+", ttl="+ttl3);
//     expect(mapa.filas[3].colaDeEspera.length).toBe(0);
// 
});