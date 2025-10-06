import { subscribeGETEvent, subscribePOSTEvent, startServer } from "soquetic";
import fs from "fs";
function enviarSabores() {
  const sabores = JSON.parse(fs.readFileSync("data/sabores.json", "utf-8"));
  return sabores;
}
function enviarProductos() {
  const productos = JSON.parse(fs.readFileSync("data/productos.json", "utf-8"));
  return productos;
}
function enviarPedido(producto, sabores, nombre) {
  let pedidos = JSON.parse(fs.readFileSync("data/pedidos.json", "utf-8"));

  if (!Array.isArray(pedidos)) pedidos = [];
  let Pedido = {producto: producto, sabores: sabores, nombre: nombre};
  pedidos.push(Pedido);
  let pedidosJSON = JSON.stringify(pedidos, null, 2)
  fs.writeFileSync("data/pedidos.json", pedidosJSON);
  return {ok: true};
}
subscribeGETEvent("sabores", enviarSabores);
subscribeGETEvent("productos", enviarProductos);
subscribePOSTEvent("pedido", enviarPedido);
startServer();