const express = require('express');
const { reportUsuariosPedidos, removeUsuario } = require('../controller/usuarios.controller');
const { requireAuth, allowRoles } = require('../middleware/guards');

const router = express.Router();
const path = '/usuarios';

router.get(
  '/reporte',
  requireAuth,
  allowRoles('admin', 'superAdmin'),
  reportUsuariosPedidos
);

router.delete(
  '/:id',
  requireAuth,
  allowRoles('superAdmin'),
  removeUsuario
);

module.exports = { router, path };

