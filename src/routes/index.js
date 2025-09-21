const express = require('express');
const Auth = require('./auth.routes');
const Usuarios = require('./usuarios.routes');
const Productos = require('./productos.routes');
const Pedidos = require('./pedidos.routes');

const router = express.Router();

router.use(Auth.path, Auth.router);
router.use(Usuarios.path, Usuarios.router);
router.use(Productos.path, Productos.router);
router.use(Pedidos.path, Pedidos.router);

router.get('/ping', (_req, res) => res.json({ ok: true, message: 'pong' }));

module.exports = { router };

