const { createPedido, listarPedidosDetalle } = require('../models/order.model');

class OrderService {
  async crearPedido(usuarioId, items) {
    return createPedido({ usuarioId, items });
  }
  async reportePedidos() {
    return listarPedidosDetalle();
  }
}

module.exports = { OrderService };
