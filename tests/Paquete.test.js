const Paquete = require("../src/Paquete")
test("Crear paquete",()=>{
    let paquete = new Paquete("destino 1");
    expect(paquete.destino).toBe("destino 1");
});

test("Crear urgencia de paquete",()=>{
    let paquete = new Paquete("destino 1","Muy rapido");
    expect(paquete.urgencia).toBe("Muy rapido");
});

test("Añadir productos al paquete",()=>{
    let paquete = new Paquete("destino 1","Muy rapido");
    paquete.sumarProducto("Shampoo",3);
    expect(paquete.mostrarProductos()).toBe("3 unidades de Shampoo, ");
});


test("Añadir otro producto al paquete",()=>{
    let paquete = new Paquete("destino 1","Muy rapido");
    paquete.sumarProducto("atun",8);
    expect(paquete.mostrarProductos()).toBe("8 unidades de atun, ");
});

test("Añadir varios productos al paquete",()=>{
    let paquete = new Paquete("destino 1","Muy rapido");
    paquete.sumarProducto("atun",8);
    paquete.sumarProducto("Lavarropas",1);
    expect(paquete.mostrarProductos()).toBe("8 unidades de atun, 1 unidades de Lavarropas, ");
});


test("Distintos id",()=>{
    let paquete1 = new Paquete("destino 1","Muy rapido");
    let paquete2 = new Paquete("destino 1","Muy rapido");
    expect(paquete1.id == paquete2.id).toBeFalsy();
});


