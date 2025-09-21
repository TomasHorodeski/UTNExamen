const { AuthService } = require('../services/auth.service');
const authService = new AuthService();

async function register(req, res) {
  try {
    const { nombre, email, password, role } = req.body || {};
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: 'Datos inválidos' });
    }
    const result = await authService.register({ nombre, email, password, role });
    return res.status(201).json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Error' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Datos inválidos' });
    }
    const result = await authService.login({ email, password });
    return res.json(result);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message || 'Error' });
  }
}

module.exports = { register, login };
