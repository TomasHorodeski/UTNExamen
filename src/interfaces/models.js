/**
 * @typedef {'superAdmin'|'admin'|'user'} Role
 */

/**
 * @typedef {Object} Usuario
 * @property {number} id
 * @property {string} nombre
 * @property {string} email
 * @property {string} password
 * @property {Role} role
 * @property {Date} creadoEn
 * @property {Date} actualizadoEn
 */

/**
 * @typedef {Object} Producto
 * @property {number} id
 * @property {string} nombre
 * @property {number} precio
 * @property {number} stock
 * @property {Date} creadoEn
 * @property {Date} actualizadoEn
 */

/**
 * @typedef {Object} PedidoDetalleItem
 * @property {number} productoId
 * @property {string} nombre
 * @property {number} cantidad
 * @property {number} precioUnit
 * @property {number} subtotal
 */

/**
 * @typedef {Object} PedidoDetalle
 * @property {number} pedidoId
 * @property {number} usuarioId
 * @property {number} total
 * @property {PedidoDetalleItem[]} items
 */

module.exports = {};
