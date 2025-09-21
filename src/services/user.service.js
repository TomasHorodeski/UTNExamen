const { deleteUsuario, reportUsuariosCantidadPedidos } = require('../models/user.model');

class UserService {
  async reportUsuariosPedidos() {
    return reportUsuariosCantidadPedidos();
  }
  async eliminarUsuario(id) {
    return deleteUsuario(id);
  }
}

module.exports = { UserService };
