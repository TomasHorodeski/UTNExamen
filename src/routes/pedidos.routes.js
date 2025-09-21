const express = require('express');
const { body } = require('express-validator');
const { createPedido, reportPedidos } = require('../controller/pedidos.controller');
const { requireAuth, allowRoles } = require('../middleware/guards');
const { validate } = require('../middleware/validate');

const router = express.Router();
const path = '/pedidos';

router.post(
  '/',
  [
    requireAuth,
    body('items').isArray({ min: 1 }).withMessage('Debe enviar un array de items'),
    body('items.*.productoId').isInt({ min: 1 }).withMessage('productoId inválido'),
    body('items.*.cantidad').isInt({ min: 1 }).withMessage('Cantidad debe ser al menos 1'),
    validate
  ],
  createPedido
);

router.get(
  '/reporte',
  requireAuth,
  allowRoles('admin', 'superAdmin'),
  reportPedidos
);

module.exports = { router, path };
