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
    let local=new Centro(new Local(),3);
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
    let local=new Centro(new Local(),3);
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
    let local=new Centro(new Local(),3);
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
    let local=new Centro(new Local(),3);
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
    let local=new Centro(new Local(),3);
    let facturacion=new Centro(new Facturacion(),50);
    let calidad = new Centro(new Calidad(),100);
    let distribucion = new Centro(new Distribucion(),50);
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
    }
    expect(mapa.pasarTurno()).toBe("Entregando paquete id "+id1+" al "+destino+", ttl="+ttl1);
    expect(mapa.filas[3].colaDeEspera[0].ttl).toBe(2);
    expect(mapa.pasarTurno()).toBe("Entregando paquete id "+id2+" al "+destino+", ttl="+ttl2);
    expect(mapa.pasarTurno()).toBe("Entregando paquete id "+id3+" al "+destino+", ttl="+ttl3);
});

test("Manejando la excepción",()=>{
    let local=new Centro(new Local(),3);
    let facturacion=new Centro(new Facturacion(),1);
    let calidad = new Centro(new Calidad(),3);
    let distribucion = new Centro(new Distribucion(),3);
    mapa.agregarCentro(local);
    mapa.agregarCentro(facturacion);
    mapa.agregarCentro(calidad);
    mapa.agregarCentro(distribucion);
    mapa.pasarTurno(); //Creo 4 paquetes
    mapa.pasarTurno(); // Creo 4 paquetes y paso 1 a facturacion
    expect(mapa.filas[1].colaDeEspera.length).toBe(1);
});

test("Manejando la excepción, y que un paquete llegue al destino",()=>{
    let local=new Centro(new Local(),3);
    let facturacion=new Centro(new Facturacion(),1);
    let calidad = new Centro(new Calidad(),3);
    let distribucion = new Centro(new Distribucion(),3);
    mapa.agregarCentro(local);
    mapa.agregarCentro(facturacion);
    mapa.agregarCentro(calidad);
    mapa.agregarCentro(distribucion);
    mapa.pasarTurno();
    let id1=local.colaDeSalida[0].id;
    let ttl1=local.colaDeSalida[0].ttl -4;
    let destino= local.colaDeSalida[0].destino;
    for (let i=0;i<3;i++){
        mapa.pasarTurno();
    }
    expect(mapa.pasarTurno()).toBe("Entregando paquete id "+id1+" al "+destino+", ttl="+ttl1);
});


test("Que el paquete con mayor urgencia llegue a destino primero",()=>{
    let local=new Centro(new Local(),3);
    let facturacion=new Centro(new Facturacion(),1);
    let calidad = new Centro(new Calidad(),3);
    let distribucion = new Centro(new Distribucion(),3);
    mapa.agregarCentro(local);
    mapa.agregarCentro(facturacion);
    mapa.agregarCentro(calidad);
    mapa.agregarCentro(distribucion);
    var paquete1=new Paquete("Destino 1","Muy rapido",4);
    var paquete2 = new Paquete("Destino 1","Rapido",4);
    var paquete3 = new Paquete("Destino 1","Normal",4);
    local.colaDeSalida.push(paquete2);
    local.colaDeSalida.push(paquete1);
    local.colaDeSalida.push(paquete3);
    let id1=paquete1.id;
    let ttl1=paquete1.ttl -4;
    let destino= local.colaDeSalida[0].destino;
    for (let i=0;i<3;i++){
        mapa.pasarTurno();
    }
    expect(mapa.pasarTurno()).toBe("Entregando paquete id "+id1+" al "+destino+", ttl="+ttl1);
});


test("Que los dos paquetes con mayor urgencia lleguen a destino primero",()=>{
    let local=new Centro(new Local(),3);
    let facturacion=new Centro(new Facturacion(),5);
    let calidad = new Centro(new Calidad(),3);
    let distribucion = new Centro(new Distribucion(),3);
    mapa.agregarCentro(local);
    mapa.agregarCentro(facturacion);
    mapa.agregarCentro(calidad);
    mapa.agregarCentro(distribucion);
    var paquete1=new Paquete("Destino 1","Muy rapido",4);
    var paquete2 = new Paquete("Destino 1","Muy rapido",4);
    var paquete3 = new Paquete("Destino 1","Normal",4);
    local.colaDeSalida.push(paquete2);
    local.colaDeSalida.push(paquete1);
    local.colaDeSalida.push(paquete3);
    let id1=paquete1.id;
    let id2=paquete2.id;
    let ttl2=paquete2.ttl-4;
    let ttl1=paquete1.ttl-5;
    let destino= local.colaDeSalida[0].destino;
    for (let i=0;i<3;i++){
        mapa.pasarTurno();
    }
    
    expect(mapa.pasarTurno()).toBe("Entregando paquete id "+id2+" al "+destino+", ttl="+ttl2);
    expect(mapa.pasarTurno()).toBe("Entregando paquete id "+id1+" al "+destino+", ttl="+ttl1);
});



test("Que el paquete mas urgente creado despues pase a los menos urgentes que estaban antes",()=>{
    let local=new Centro(new Local(),3);
    let facturacion=new Centro(new Facturacion(),5);
    let calidad = new Centro(new Calidad(),3);
    let distribucion = new Centro(new Distribucion(),3);
    mapa.agregarCentro(local);
    mapa.agregarCentro(facturacion);
    mapa.agregarCentro(calidad);
    mapa.agregarCentro(distribucion);
    
    var paquete1=new Paquete("Destino 1","Rapido",4);
    var paquete2=new Paquete("Destino 1","Rapido",4);
    var paquete3=new Paquete("Destino 1","Rapido",4);
    
    var paquete4 = new Paquete("Destino 1","Muy rapido",4);
    local.colaDeSalida.push(paquete1);
    local.colaDeSalida.push(paquete2);
    local.colaDeSalida.push(paquete3);
    mapa.pasarTurno(0);

    local.colaDeSalida.push(paquete4);
    let id4=paquete4.id;
    let ttl4=paquete4.ttl-4;
    let destino= paquete1.destino;
    for (let i=0; i<3;i++){
        mapa.pasarTurno(0);
    }
    expect(mapa.pasarTurno()).toBe("Entregando paquete id "+id4+" al "+destino+", ttl="+ttl4);
});

test("Paquete que se queda esperando en la cola de salida, disminuye su ttl",()=>{
    let mapa2=new Mapa(1,2);
    let distribucion = new Centro(new Distribucion(),1);
    let facturacion=new Centro(new Facturacion(),2);
    var paquete1=new Paquete("Destino 1","Rapido",4);
    var paquete2=new Paquete("Destino 1","Rapido",4);

    let id1=paquete1.id;
    let ttl1=paquete1.ttl-1;
    let destino= paquete1.destino;
    let id2=paquete1.id;
    let ttl2=paquete1.ttl-3;

    mapa2.agregarCentro(calidad);
    mapa2.agregarCentro(distribucion);
    facturacion.recibirPaquete(paquete1);
    facturacion.recibirPaquete(paquete2);
    mapa2.pasarTurno();
    expect(mapa2.pasarTurno()).toEqual("Entregando paquete id "+id1+" al "+destino+", ttl="+ttl1);
    expect(mapa2.pasarTurno()).toEqual("Entregando paquete id "+id2+" al "+destino+", ttl="+ttl2);
    //expect()
});

test("Paquete que se queda esperando en la cola de salida, disminuye su ttl",()=>{
    let mapa2=new Mapa(1,2);
    let local = new Centro(new Local(),1);
    let facturacion=new Centro(new Facturacion(),1);
    mapa2.agregarCentro(local);
    mapa2.agregarCentro(facturacion);
    mapa2.pasarTurno(); //Crea 4 paquetes y deja en la cola de salida de local
    let ttl1=local.colaDeSalida[0].ttl;
    let ttl2=local.colaDeSalida[1].ttl;
    let ttl3=local.colaDeSalida[2].ttl;
    let ttl4=local.colaDeSalida[3].ttl;
    mapa2.pasarTurno(0);//Intenta pasar 4 paquetes, solo pasa 1 
    expect(local.colaDeSalida.length).toBe(3);
    expect(facturacion.colaDeEspera.length).toBe(1);
    expect(facturacion.colaDeEspera[0].ttl).toBe(ttl1-1);
    expect(local.colaDeSalida[0].ttl).toBe(ttl2-1);
});
