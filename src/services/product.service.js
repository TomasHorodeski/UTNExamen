const { createProducto, listProductos, getProducto, updateProducto, deleteProducto } = require('../models/product.model');

class ProductService {
  async crear(data) { return createProducto(data); }
  async listar() { return listProductos(); }
  async obtener(id) { return getProducto(id); }
  async actualizar(id, data) { return updateProducto(id, data); }
  async eliminar(id) { return deleteProducto(id); }
}

module.exports = { ProductService };
