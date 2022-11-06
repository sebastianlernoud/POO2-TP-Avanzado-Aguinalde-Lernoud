const Mapa = require("../src/Mapa")

test("Crear mapa",()=>{
    var mapa = new Mapa(1,5);
    expect(mapa.cantidadFilas).toBe(1);
    expect(mapa.cantidadColumnas).toBe(5);
});