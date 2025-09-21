const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { router: apiRouter } = require('./routes');
const { notFound } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', apiRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = { app };

