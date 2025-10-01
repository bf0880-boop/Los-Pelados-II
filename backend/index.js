import{sucribeGETEvent,sucribePOSTEvent,realTimeEvent,startServer} from "soquetic";
import fs from "fs";

function enviarSabores(){
    let sabores = JSON.parse(fs.readFileSync("data/sabores.json","utf-8"));
    return sabores;
}
function enviarProductos(){
    let productos= JSON.parse(fs.readFileSync("data/productos.json","utf-8"));
    return productos;
}
function enviarPedido(producto, sabores, nombre){
    let pedidos = JSON.parse(fs.readFileSync("data/pedidos.json","utf-8"));
    if(!Array.isArray(pedidos)) pedidos = [];
    let nuevoPedido = {producto, sabores, nombre: nombre};
    pedidos.push(nuevoPedido);
    let pedidosJSON = JSON.stringify(pedidos, null, 2);
    fs.writeFileSync("data/pedidos.json", pedidosJSON, "utf-8");
    return {ok:true};
}
sucribeGETEvent("sabores", enviarSabores);
sucribeGETEvent("productos", enviarProductos);
sucribePOSTEvent("pedido", enviarPedido);
startServer(3000);