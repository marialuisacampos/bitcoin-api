const { config } = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

const createServer = () => {
  const app = express();
  configurateServer(app);
  return app;
}

const configurateServer = (app) => {
  app.use(express.json());
}

const initServer = async (app, port = 3000) => {
  config();
  app.listen(port);
  console.log(`Running! Port: ${port}`);
  await mongoose.connect(process.env.DATABASE)
  console.log('Connected to database')
}

module.exports = {
  createServer,
  configurateServer,
  initServer
}