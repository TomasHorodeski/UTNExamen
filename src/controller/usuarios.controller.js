const { UserService } = require('../services/user.service');
const userService = new UserService();

async function reportUsuariosPedidos(_req, res) {
  const data = await userService.reportUsuariosPedidos();
  return res.json(data);
}

async function removeUsuario(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: 'ID inválido' });
  const ok = await userService.eliminarUsuario(id);
  return ok ? res.status(204).send() : res.status(404).json({ message: 'Usuario no encontrado' });
}

module.exports = { reportUsuariosPedidos, removeUsuario };
