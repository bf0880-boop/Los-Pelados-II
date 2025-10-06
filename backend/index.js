import { subscribeGETEvent, subscribePOSTEvent, startServer } from "soquetic";
import fs from "fs";
function enviarSabores() {
  const sabores = JSON.parse(fs.readFileSync("../data/sabores.json", "utf-8"));
  return sabores;
}
function enviarProductos() {
  const productos = JSON.parse(fs.readFileSync("../data/productos.json", "utf-8"));
  return productos;
}
function enviarPedido(req) {
  let { producto, sabores, nombre } = req.data;
  let pedidos = [];
  try {
    pedidos = JSON.parse(fs.readFileSync("../data/pedidos.json", "utf-8"));
  } catch {
    pedidos = [];
  }
  if (!Array.isArray(pedidos)) pedidos = [];
  let nuevoPedido = { producto, sabores, nombre };
  pedidos.push(nuevoPedido);
  fs.writeFileSync("../data/pedidos.json", JSON.stringify(pedidos, null, 2));
  return { ok: true };
}
subscribeGETEvent("sabores", enviarSabores);
subscribeGETEvent("productos", enviarProductos);
subscribePOSTEvent("pedido", enviarPedido);
startServer();