const { getPool } = require('../config/db');

async function createPedido(input) {
  const pool = getPool();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [res] = await conn.execute('INSERT INTO Pedido (usuarioId) VALUES (?)', [input.usuarioId]);
    const pedidoId = res.insertId;

    for (const it of input.items) {
      const [prodRows] = await conn.query('SELECT precio, stock FROM Producto WHERE id = ?', [it.productoId]);
      if (!prodRows.length) throw new Error('Producto no existe');
      const precioUnit = typeof it.precioUnit === 'number' ? it.precioUnit : Number(prodRows[0].precio);
      const stock = Number(prodRows[0].stock);
      if (stock < it.cantidad) throw new Error('Stock insuficiente');

      await conn.execute(
        'INSERT INTO OrderItem (pedidoId, productoId, cantidad, precioUnit) VALUES (?,?,?,?)',
        [pedidoId, it.productoId, it.cantidad, precioUnit]
      );
      await conn.execute('UPDATE Producto SET stock = stock - ? WHERE id = ?', [it.cantidad, it.productoId]);
    }

    await conn.commit();
    return { pedidoId };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

async function listarPedidosDetalle() {
  const pool = getPool();
  const [rows] = await pool.query(
    `SELECT p.id AS pedidoId, p.usuarioId, oi.productoId, prod.nombre, oi.cantidad, oi.precioUnit
     FROM Pedido p
     JOIN OrderItem oi ON oi.pedidoId = p.id
     JOIN Producto prod ON prod.id = oi.productoId
     ORDER BY p.id DESC`
  );

  const map = new Map();
  for (const r of rows) {
    const pid = Number(r.pedidoId);
    const item = {
      productoId: Number(r.productoId),
      nombre: String(r.nombre),
      cantidad: Number(r.cantidad),
      precioUnit: Number(r.precioUnit),
      subtotal: Number(r.cantidad) * Number(r.precioUnit)
    };
    if (!map.has(pid)) {
      map.set(pid, { pedidoId: pid, usuarioId: Number(r.usuarioId), total: 0, items: [] });
    }
    const entry = map.get(pid);
    entry.items.push(item);
    entry.total += item.subtotal;
  }

  return Array.from(map.values());
}

module.exports = { createPedido, listarPedidosDetalle };
