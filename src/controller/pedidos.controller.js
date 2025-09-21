const { OrderService } = require('../services/order.service');
const orderService = new OrderService();

async function createPedido(req, res) {
  if (!req.user) return res.status(401).json({ message: 'No autenticado' });
  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  if (!items.length) return res.status(400).json({ message: 'Items requeridos' });
  const { pedidoId } = await orderService.crearPedido(req.user.id, items);
  return res.status(201).json({ pedidoId });
}

async function reportPedidos(_req, res) {
  const data = await orderService.reportePedidos();
  return res.json(data);
}

module.exports = { createPedido, reportPedidos };
