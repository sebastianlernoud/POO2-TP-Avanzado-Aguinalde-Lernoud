
test("Crear paquete",()=>{
    let paquete = new Paquete("destino 1");
    expect(paquete.destino).toBe("destino 1");
});