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

    let local1=new Centro(new Local(),1);
    let facturacion1=new Centro(new Facturacion(),2);

    let local2=new Centro(new Local(),3);
    let facturacion2=new Centro(new Facturacion(),4);
    
    var paquete1=new Paquete(1,"Muy rapido",4);
    var paquete2=new Paquete(2,"Muy rapido",4);
    var paquete3=new Paquete(2,"Muy rapido",4);
    
    mapa.agregarFila([local1,facturacion1]);
    mapa.agregarFila([local2,facturacion2]);
    local1.colaDeSalida.push(paquete1);
    local1.colaDeSalida.push(paquete2);
    local2.colaDeSalida.push(paquete3);
    mapa.pasarTurno(0);
    //Chequeamos que  este en facturacion 1
    //Chequeamos que  este en facturacion 2
    //Chequeamos que  este local2
    //Chequeamos que  este local1
    expect(facturacion1.colaDeEspera[0].id).toBe(paquete1.id);
    expect(facturacion2.colaDeEspera[1].id).toBe(paquete3.id);
    expect(facturacion2.colaDeEspera[0].id).toBe(paquete2.id);
}); 

test("",()=>{

});

test("Que el paquete con mayor urgencia llegue a destino primero",()=>{
    let mapa=new Mapa(2,4);
    let local1=new Centro(new Local(),3);
    let facturacion1=new Centro(new Facturacion(),1);
    let calidad1 = new Centro(new Calidad(),3);
    let distribucion1 = new Centro(new Distribucion(),3);

    let local2=new Centro(new Local(),3);
    let facturacion2=new Centro(new Facturacion(),1);
    let calidad2 = new Centro(new Calidad(),3);
    let distribucion2 = new Centro(new Distribucion(),3);
    
    mapa.agregarFila([local1,facturacion1,calidad1,distribucion1]);
    mapa.agregarFila([local2,facturacion2,calidad2,distribucion2]);

    var paquete1=new Paquete(1,"Muy rapido",4);
    var paquete2 = new Paquete(2,"Rapido",4);
    var paquete3 = new Paquete(1,"Normal",4);

    local1.colaDeSalida.push(paquete2); // va derecho
    local1.colaDeSalida.push(paquete1); // baja
    local2.colaDeSalida.push(paquete3); //sube
    let id1=paquete1.id;
    let id2=paquete2.id;
    let id3=paquete3.id;
    let ttl1=paquete1.ttl -4;
    let ttl2=paquete2.ttl -4;
    let ttl3=paquete3.ttl -5;
    for (let i=0;i<3;i++){
        mapa.pasarTurno(0);
    }
    expect(mapa.pasarTurno(0)).toContain("Entregando paquete id "+id1+" al Destino "+1+", ttl="+ttl1+
    "Entregando paquete id "+id2+" al Destino "+2+", ttl="+ttl2);
    expect(mapa.pasarTurno()).toBe("Entregando paquete id "+id3+" al Destino "+1+", ttl="+ttl3)
});


// test("Que un paquete pueda decidir seguir derecho en vez de ir en diagonal si la cola de espera está llena",()=>{
//     let mapa=new Mapa(2,4);
//     let local1=new Centro(new Local(),3);
//     let facturacion1=new Centro(new Facturacion(),1);
//     let calidad1 = new Centro(new Calidad(),3);
//     let distribucion1 = new Centro(new Distribucion(),3);

//     let local2=new Centro(new Local(),3);
//     let facturacion2=new Centro(new Facturacion(),1);
//     let calidad2 = new Centro(new Calidad(),3);
//     let distribucion2 = new Centro(new Distribucion(),3);
    
//     mapa.agregarFila([local1,facturacion1,calidad1,distribucion1]);
//     mapa.agregarFila([local2,facturacion2,calidad2,distribucion2]);

//     var paquete1=new Paquete(1,"Muy rapido",4);
//     var paquete2 = new Paquete(1,"Rapido",4);
   
//     let id1=paquete1.id;
//     let id2=paquete2.id;
//     local1.colaDeSalida.push(paquete1); 
//     local1.colaDeSalida.push(paquete2);

//     mapa.pasarTurno();
//     expect(facturacion1.colaDeEspera[0].id).toBe(id1);
//     expect(facturacion2.colaDeEspera[0].id).toBe(id2);


// });


test("Ofrecer todas las movidas posibles para un paquete",()=>{
    let mapa=new Mapa(4,4);
    var paquete1=new Paquete(1,"Muy rapido",4);
    expect(mapa.siguienteSalto(paquete1,[0,0])).toEqual([0,1]);
    expect(mapa.siguienteSalto(paquete1,[1,0])).toEqual([1,0,1,2]);
    expect(mapa.siguienteSalto(paquete1,[2,0])).toEqual([1,1,2]);
    expect(mapa.siguienteSalto(paquete1,[3,0])).toEqual([2]);

})