const { ProductService } = require('../services/product.service');
const productService = new ProductService();

async function createProducto(req, res) {
  const { nombre, precio, stock } = req.body || {};
  if (!nombre || typeof precio !== 'number' || typeof stock !== 'number') {
    return res.status(400).json({ message: 'Datos inválidos' });
  }
  const prod = await productService.crear({ nombre, precio, stock });
  return res.status(201).json(prod);
}

async function listProductos(_req, res) {
  const list = await productService.listar();
  return res.json(list);
}

async function getProducto(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
  const prod = await productService.obtener(id);
  return prod ? res.json(prod) : res.status(404).json({ message: 'No encontrado' });
}

async function updateProducto(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
  const data = {};
  if (typeof req.body?.nombre === 'string') data.nombre = req.body.nombre;
  if (typeof req.body?.precio === 'number') data.precio = req.body.precio;
  if (typeof req.body?.stock === 'number') data.stock = req.body.stock;
  const prod = await productService.actualizar(id, data);
  return prod ? res.json(prod) : res.status(404).json({ message: 'No encontrado' });
}

async function deleteProducto(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
  const ok = await productService.eliminar(id);
  return ok ? res.status(204).send() : res.status(404).json({ message: 'No encontrado' });
}

module.exports = { createProducto, listProductos, getProducto, updateProducto, deleteProducto };
