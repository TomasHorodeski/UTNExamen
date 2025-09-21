const express = require('express');
const { body } = require('express-validator');
const {
  createProducto,
  listProductos,
  getProducto,
  updateProducto,
  deleteProducto
} = require('../controller/productos.controller');
const { requireAuth, allowRoles } = require('../middleware/guards');
const { validate } = require('../middleware/validate');

const router = express.Router();
const path = '/productos';

router.get('/', listProductos);
router.get('/:id', getProducto);

router.post(
  '/',
  [
    requireAuth,
    allowRoles('admin', 'superAdmin'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('precio').isFloat({ min: 0 }).withMessage('Precio debe ser mayor o igual a 0'),
    body('stock').isInt({ min: 0 }).withMessage('Stock debe ser mayor o igual a 0'),
    validate
  ],
  createProducto
);

router.put(
  '/:id',
  [
    requireAuth,
    allowRoles('admin', 'superAdmin'),
    body('precio').optional().isFloat({ min: 0 }),
    body('stock').optional().isInt({ min: 0 }),
    validate
  ],
  updateProducto
);

router.delete(
  '/:id',
  requireAuth,
  allowRoles('admin', 'superAdmin'),
  deleteProducto
);

module.exports = { router, path };
