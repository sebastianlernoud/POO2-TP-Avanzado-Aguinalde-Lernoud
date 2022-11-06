const Paquete = require("./Paquete")
test("Crear paquete",()=>{
    let paquete = new Paquete("destino 1");
    expect(paquete.destino).toBe("destino 1");
});

test("Crear urgencia de paquete",()=>{
    let paquete = new Paquete("destino 1","Muy rapido");
    expect(paquete.urgencia).toBe("Muy rapido");
});