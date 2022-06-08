const { findCandles } = require('./candle-controller');

module.exports = (app) => {
  app.get('/api/candles/:quantity',
  findCandles
  );
};