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

test("Paquetes de local a destino, mismo destino y misma urgencia",()=>{
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
    }
    expect(mapa.filas[3].colaDeEspera.length).toBe(1);
    expect(distribucion.procesarPaquetes()).toBe("Entregando paquete id "+id+" al "+destino+", ttl="+ttl);
    expect(mapa.filas[3].colaDeEspera.length).toBe(0);
});
