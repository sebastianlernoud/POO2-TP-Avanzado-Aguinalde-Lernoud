test("Crear mapa",()=>{
    var mapa = new Mapa(1,5);
    expect(mapa.filas).toBe(1);
    expect(mapa.columnas).toBe(5);
});