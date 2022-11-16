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


test("Crear paquetes y que lleguen a destino teniendo solo una fila",()=>{
    var mapa=new Mapa(1,2);

    let local1=new Centro(new Local(),4);
    let facturacion1=new Centro(new Facturacion(),5);
    
    mapa.agregarFila([local1,facturacion1]);
    mapa.pasarTurno(2);
    let id1=local1.colaDeSalida[0].id;
    let id2=local1.colaDeSalida[1].id;
    mapa.pasarTurno(0);
    expect(facturacion1.colaDeEspera[0].id).toBe(id1);
    expect(facturacion1.colaDeEspera[1].id).toBe(id2);
});

test("Crear paquetes y que lleguen a destino teniendo solo una fila",()=>{
    var mapa=new Mapa(1,4);

    let local1=new Centro(new Local(),4);
    let facturacion1=new Centro(new Facturacion(),5);
    let calidad1 = new Centro(new Calidad(),3);
    let distribucion1 = new Centro(new Distribucion(),3);
    


    mapa.agregarFila([local1,facturacion1,calidad1,distribucion1]);
    mapa.pasarTurno(2);
    let id1=local1.colaDeSalida[0].id;
    let id2=local1.colaDeSalida[1].id;
    let ttl1=local1.colaDeSalida[0].ttl-4;
    let ttl2=local1.colaDeSalida[1].ttl-5;
    let destino = local1.colaDeSalida[0].destino;
    for (let i=0;i<3;i++){
        mapa.pasarTurno(0);
    }
    
    expect(mapa.pasarTurno()).toBe("Entregando paquete id "+id1+" al "+destino+", ttl="+ttl1);
    expect(mapa.pasarTurno()).toBe("Entregando paquete id "+id2+" al "+destino+", ttl="+ttl2);
});

test("Crear paquetes y que lleguen a destino teniendo dos filas",()=>{
    var mapa=new Mapa(2,2);

    let local1=new Centro(new Local(),4);
    let facturacion1=new Centro(new Facturacion(),5);

    let local2=new Centro(new Local(),3);
    let facturacion2=new Centro(new Facturacion(),5);
    var paquete1=new Paquete("Destino 1","Muy rapido",4);
    local1.colaDeSalida.push(paquete1);
    
    mapa.agregarFila([local1,facturacion1]);
    mapa.agregarFila([local2,facturacion2]);
    
    mapa.pasarTurno(0);
    expect(facturacion1.colaDeEspera[0].id).toBe(paquete1.id);
}); 

test("Decidir el siguiente salto teniendo dos(2) filas",()=>{
    var mapa=new Mapa(2,2);

    let local1=new Centro(new Local(),4);
    let facturacion1=new Centro(new Facturacion(),5);

    let local2=new Centro(new Local(),3);
    let facturacion2=new Centro(new Facturacion(),5);
    var paquete1=new Paquete(2,"Muy rapido",4);
    local1.colaDeSalida.push(paquete1);
    
    mapa.agregarFila([local1,facturacion1]);
    mapa.agregarFila([local2,facturacion2]);
    
    expect(mapa.siguienteSalto(paquete1,[0,0])).toBe(1);
}); 

test("Decidir el siguiente salto teniendo 3 filas",()=>{
    var mapa=new Mapa(3,2);

    let local1=new Centro(new Local(),4);
    let facturacion1=new Centro(new Facturacion(),5);

    let local2=new Centro(new Local(),3);
    let facturacion2=new Centro(new Facturacion(),5);
    
    let local3=new Centro(new Local(),3);
    let facturacion3=new Centro(new Facturacion(),5);
    var paquete1=new Paquete(1,"Muy rapido",4);
    var paquete2=new Paquete(2,"Muy rapido",4);
    var paquete3=new Paquete(2,"Muy rapido",4);
    
    mapa.agregarFila([local1,facturacion1]);
    mapa.agregarFila([local2,facturacion2]);
    mapa.agregarFila([local3,facturacion3]);
    
    expect(mapa.siguienteSalto(paquete1,[0,0])).toBe(0); //Derecho
    expect(mapa.siguienteSalto(paquete2,[0,0])).toBe(1); //Diagonal abajo
    expect(mapa.siguienteSalto(paquete3,[2,0])).toBe(1); //Diagonal arriba

}); 

test("Enviar al siguiente salto teniendo 2 filas",()=>{
    var mapa=new Mapa(2,2);

    let local1=new Centro(new Local(),4);
    let facturacion1=new Centro(new Facturacion(),5);

    let local2=new Centro(new Local(),3);
    let facturacion2=new Centro(new Facturacion(),5);
    
    var paquete1=new Paquete(1,"Muy rapido",4);
    var paquete2=new Paquete(2,"Muy rapido",4);
    var paquete3=new Paquete(2,"Muy rapido",4);
    
    mapa.agregarFila([local1,facturacion1]);
    mapa.agregarFila([local2,facturacion2]);
    local1.colaDeSalida.push(paquete1);
    local1.colaDeSalida.push(paquete2);
    local2.colaDeSalida.push(paquete3);
    mapa.pasarTurno(0);

    expect(facturacion1.colaDeEspera[0].id).toBe(paquete1.id);
    expect(facturacion2.colaDeEspera[0].id).toBe(paquete3.id);
    expect(facturacion2.colaDeEspera[1].id).toBe(paquete2.id);
}); 