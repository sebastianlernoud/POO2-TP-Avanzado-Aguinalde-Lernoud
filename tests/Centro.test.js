const Centro = require("../src/Centro");
const Paquete = require("../src/Paquete");
const Distribucion=require("../src/Distribucion");
const Calidad = require("../src/Calidad");
const Facturacion = require("../src/Facturacion");
const Local=require("../src/Local");
test("Crear un centro",()=> {
    var centro = new Centro("Local");
    expect(centro.tipo).toBe("Local");
}
);

test("Manejar paquetes",()=>{
    var paquete= new Paquete();
    var centro = new Centro("Local",2);

    centro.recibirPaquete(paquete);
    expect(centro.colaDeEspera).toEqual([paquete]);
});   

test("Procesar 1 paquete en centro de calidad",()=>{
    var paquete= new Paquete();
    var centro = new Centro(new Calidad(),2);

    centro.recibirPaquete(paquete);
    centro.procesarPaquetes();
    expect(centro.colaDeSalida).toEqual([paquete]);
});

test("Procesar paquetes en un centro de calidad",()=>{
    var paquete1= new Paquete();
    var paquete2= new Paquete();
    var centro = new Centro(new Calidad(),2);

    centro.recibirPaquete(paquete1);
    centro.recibirPaquete(paquete2);
    centro.procesarPaquetes();
    expect(centro.colaDeSalida).toEqual([paquete1]);
    expect(centro.colaDeEspera).toEqual([paquete2]);
});

test("Procesar paquetes en un centro de facturacion",()=>{
    var paquete1= new Paquete();
    var paquete2= new Paquete();
    var centro = new Centro(new Facturacion(),2);

    centro.recibirPaquete(paquete1);
    centro.recibirPaquete(paquete2);
    centro.procesarPaquetes();
    expect(centro.colaDeSalida).toEqual([paquete1,paquete2]);
    expect(centro.colaDeEspera).toEqual([]);
});

test("Procesar paquetes en un centro de distribucion",()=>{
    var paquete= new Paquete();
    var centro = new Centro(new Distribucion(),10);
    for (let i=0;i<10;i++){
        centro.recibirPaquete(paquete);
    }
    
    centro.procesarPaquetes();
    expect(centro.colaDeEspera).toEqual([]);
});

test("Crear un local",()=>{
    var local = new Local();
    expect(local.colaDeSalida).toEqual([]);
});

test("Generar un paquete desde un local",()=>{
    var local = new Local();
    local.crearPaquetes(1);
    expect(local.colaDeSalida.length).toBe(1);
});

test("Generar cinco paquetes desde un local",()=>{
    var local = new Local();
    local.crearPaquetes(5);
    expect(local.colaDeSalida.length).toBe(5);
});

test("Error por mas de cinco paquetes desde un local",()=>{
    var local = new Local(new Centro());
    
    expect(()=>{local.crearPaquetes(6);}).toThrow(new Error("La cantidad no es valida"));
}); 


test("Pasar un paquete de Local a Centro de Facturacion",()=>{
    var local = new Local();
    var centroFacturacion = new Centro(new Facturacion(),3);
    local.crearPaquetes(1);
    local.traspasarPaquete(local.colaDeSalida[0],centroFacturacion);
    expect(local.colaDeSalida).toEqual([]);
    expect(centroFacturacion.colaDeEspera.length).toBe(1);
});

test("Pasar 4 paquetes de Local a Centro de Facturacion con capacidad máxima de 3",()=>{
    var local = new Local();
    var centroFacturacion = new Centro(new Facturacion(),3);
    local.crearPaquetes(5,4);
    for (let i=0;i<3;i++){
        local.traspasarPaquete(local.colaDeSalida[0],centroFacturacion);
    }
    expect(()=>{local.traspasarPaquete(local.colaDeSalida[0],centroFacturacion);}).toThrow(new Error("Cola de espera llena"));
    
});

test("Despachar a destino",()=>{
    var distribucion=new Centro(new Distribucion(),5);
    var paquete = new Paquete("Destino 1","Muy rapido",4);
    distribucion.recibirPaquete(paquete);
    let id =paquete.id;
    expect(distribucion.procesarPaquetes()).toBe("Entregando paquete id "+id+" al Destino 1, ttl=3");
});

test("Despachar paquetes a destino",()=>{
    var distribucion=new Centro(new Distribucion(),5);
    var paquete1 = new Paquete("Destino 1","Muy rapido",4);
    var paquete2 = new Paquete("Destino 1","Muy rapido",4);
    distribucion.recibirPaquete(paquete1);
    distribucion.recibirPaquete(paquete2);
    let id1 =paquete1.id;
    let id2 =paquete2.id;
    expect(distribucion.procesarPaquetes()).toBe("Entregando paquete id "+id1+
    " al Destino 1, ttl=3\nEntregando paquete id "+id2+" al Destino 1, ttl=3");
});

test("Elegir al mas urgente",()=>{
    var distribucion=new Centro(new Distribucion(),5);
    var paquete1=new Paquete("Destino 1","Muy rapido",4);
    var paquete2 = new Paquete("Destino 1","Rapido",4);
    distribucion.recibirPaquete(paquete1);
    distribucion.recibirPaquete(paquete2);
    let id1 =paquete1.id;
    expect(distribucion.masUrgente().id).toBe(id1);
});

// test("Despachar por urgencia desde calidad a distribucion",()=>{
//     var distribucion=new Centro(new Distribucion(),5);
//     var calidad=new Centro(new Calidad(),5);
//     var paquete1=new Paquete("Destino 1","Muy rapido",4);
//     var paquete2 = new Paquete("Destino 1","Rapido",4);
//     calidad.recibirPaquete(paquete1);
//     calidad.recibirPaquete(paquete2);
//     let id1 =paquete1.id;
//     let id2=paquete2.id;
//     calidad.pasarTurno();

//     expect()
// });