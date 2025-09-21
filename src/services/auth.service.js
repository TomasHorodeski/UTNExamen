const bcrypt = require('bcryptjs');
const { createUsuario, findUsuarioByEmail } = require('../models/user.model');
const { signToken } = require('../config/jwt');
const { env } = require('../config/env');

class AuthService {
  async register({ nombre, email, password, role = 'user' }) {
    const existing = await findUsuarioByEmail(email);
    if (existing) {
      const err = new Error('Email ya registrado');
      err.status = 409;
      throw err;
    }
    const hash = await bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS);
    const user = await createUsuario({ nombre, email, password: hash, role });
    const token = signToken({ id: user.id, email: user.email, role: user.role });
    return { token, user: { id: user.id, nombre: user.nombre, email: user.email, role: user.role } };
  }

  async login({ email, password }) {
    const user = await findUsuarioByEmail(email);
    if (!user) {
      const err = new Error('Credenciales inválidas');
      err.status = 401;
      throw err;
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      const err = new Error('Credenciales inválidas');
      err.status = 401;
      throw err;
    }
    const token = signToken({ id: user.id, email: user.email, role: user.role });
    return { token, user: { id: user.id, nombre: user.nombre, email: user.email, role: user.role } };
  }
}

module.exports = { AuthService };
