const { getPool } = require('../config/db');

function mapUsuario(r) {
  return {
    id: Number(r.id),
    nombre: String(r.nombre),
    email: String(r.email),
    password: String(r.password),
    role: r.role,
    creadoEn: new Date(String(r.creadoEn)),
    actualizadoEn: new Date(String(r.actualizadoEn))
  };
}

async function createUsuario(input) {
  const pool = getPool();
  const [res] = await pool.execute(
    'INSERT INTO Usuario (nombre, email, password, role) VALUES (?,?,?,?)',
    [input.nombre, input.email, input.password, input.role]
  );
  const id = res.insertId;
  const [rows] = await pool.query('SELECT * FROM Usuario WHERE id = ?', [id]);
  return mapUsuario(rows[0]);
}

async function findUsuarioByEmail(email) {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM Usuario WHERE email = ?', [email]);
  return rows.length ? mapUsuario(rows[0]) : null;
}

async function deleteUsuario(id) {
  const pool = getPool();
  const [res] = await pool.execute('DELETE FROM Usuario WHERE id = ?', [id]);
  return res.affectedRows > 0;
}

async function reportUsuariosCantidadPedidos() {
  const pool = getPool();
  const [rows] = await pool.query(
    `SELECT u.id, u.nombre, u.email, u.role, COUNT(p.id) AS pedidos
     FROM Usuario u
     LEFT JOIN Pedido p ON p.usuarioId = u.id
     GROUP BY u.id, u.nombre, u.email, u.role
     ORDER BY pedidos DESC`
  );
  return rows.map(r => ({
    id: Number(r.id),
    nombre: String(r.nombre),
    email: String(r.email),
    role: r.role,
    pedidos: Number(r.pedidos)
  }));
}

module.exports = {
  createUsuario,
  findUsuarioByEmail,
  deleteUsuario,
  reportUsuariosCantidadPedidos
};
