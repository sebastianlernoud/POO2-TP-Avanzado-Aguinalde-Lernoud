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
});

test("Procesar paquetes en un centro de calidad",()=>{
    var paquete1= new Paquete();
    var paquete2= new Paquete();
    var centro = new Centro("Local",2);

    centro.recibirPaquete(paquete1);
    centro.recibirPaquete(paquete2);
    centro.procesarPaquetes();
    expect(centro.colaDeSalida).toEqual([paquete1]);
    expect(centro.colaDeEspera).toEqual([paquete2]);
});
