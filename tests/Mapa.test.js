const Mapa = require("../src/Mapa")
const Paquete = require("../src/Paquete")

test("Crear mapa",()=>{
    var mapa = new Mapa(1,5);
    expect(mapa.cantidadFilas).toBe(1);
    expect(mapa.cantidadColumnas).toBe(5);
});

test("Introducir un nuevo paquete al mapa",()=>{
    let paquete= new Paquete("destino 1","Muy rapido");
    paquete.sumarProducto("",2);
    var mapa = new Mapa(1,5);
    mapa.enviarPaquete(paquete);
    expect(mapa.filas[0][0]).toBe(paquete);
});