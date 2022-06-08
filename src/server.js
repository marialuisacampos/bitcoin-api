const { config } = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const { configSocketIo } = require('./messages/messages-channel');
const cors = require('cors');
const logger = require('morgan');
const candleRoutes = require('./candles/candle-routes');

const createServer = async () => {
  config()
  await mongoose.connect(process.env.DATABASE)
  const app = express();
  const server = app.listen(process.env.PORT);
  configurateServer(app);
}

const configurateServer = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(logger('dev'));
  configSocketIo(app);
  configurateRoutes(app);
}

const configurateRoutes = (app) => {
  candleRoutes(app);
};

module.exports = {
  createServer,
  configurateServer
}