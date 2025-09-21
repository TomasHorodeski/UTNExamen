const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controller/auth.controller');
const { validate } = require('../middleware/validate');

const router = express.Router();
const path = '/auth';

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Password mínimo de 6 caracteres'),
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    validate
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    validate
  ],
  login
);

module.exports = { router, path };
