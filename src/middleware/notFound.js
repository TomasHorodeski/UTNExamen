function notFound(_req, res, _next) {
  res.status(404).json({ message: 'Recurso no encontrado' });
}
module.exports = { notFound };
