const Centro = require("../src/Centro")
const Paquete = require("../src/Paquete")
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

test("Procesar paquetes",()=>{
    var paquete= new Paquete();
    var centro = new Centro("Local",2);

    centro.recibirPaquete(paquete);
    centro.procesarPaquetes();
    expect(centro.colaDeSalida).toEqual([paquete]);
})
