const Paquete = require("./Paquete")
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
    paquete.sumarProducto("shampoo",3);
    expect(paquete.productos).toBe("3 unidades de shampoo");
});


test("Añadir otro producto al paquete",()=>{
    let paquete = new Paquete("destino 1","Muy rapido");
    paquete.sumarProducto("atun",8);
    expect(paquete.productos).toBe("8 unidades de atun");
});

test("Añadir varios productos al paquete",()=>{
    let paquete = new Paquete("destino 1","Muy rapido");
    paquete.sumarProducto("atun",8);
    paquete.sumarProducto("Lavarropas",1);
    expect(paquete.productos).toBe("8 unidades de atun");
});