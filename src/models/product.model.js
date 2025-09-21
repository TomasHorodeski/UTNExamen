const { getPool } = require('../config/db');

function mapProducto(r) {
  return {
    id: Number(r.id),
    nombre: String(r.nombre),
    precio: Number(r.precio),
    stock: Number(r.stock),
    creadoEn: new Date(String(r.creadoEn)),
    actualizadoEn: new Date(String(r.actualizadoEn))
  };
}

async function createProducto(input) {
  const pool = getPool();
  const [res] = await pool.execute('INSERT INTO Producto (nombre, precio, stock) VALUES (?,?,?)', [input.nombre, input.precio, input.stock]);
  const id = res.insertId;
  const [rows] = await pool.query('SELECT * FROM Producto WHERE id = ?', [id]);
  return mapProducto(rows[0]);
}

async function listProductos() {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM Producto ORDER BY id DESC');
  return rows.map(mapProducto);
}

async function getProducto(id) {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM Producto WHERE id = ?', [id]);
  return rows.length ? mapProducto(rows[0]) : null;
}

async function updateProducto(id, input) {
  const pool = getPool();
  const fields = [];
  const values = [];
  if (typeof input.nombre === 'string') { fields.push('nombre = ?'); values.push(input.nombre); }
  if (typeof input.precio === 'number') { fields.push('precio = ?'); values.push(input.precio); }
  if (typeof input.stock === 'number') { fields.push('stock = ?'); values.push(input.stock); }
  if (!fields.length) return getProducto(id);
  values.push(id);
  await pool.execute(`UPDATE Producto SET ${fields.join(', ')} WHERE id = ?`, values);
  return getProducto(id);
}

async function deleteProducto(id) {
  const pool = getPool();
  const [res] = await pool.execute('DELETE FROM Producto WHERE id = ?', [id]);
  return res.affectedRows > 0;
}

module.exports = {
  createProducto,
  listProductos,
  getProducto,
  updateProducto,
  deleteProducto
};
