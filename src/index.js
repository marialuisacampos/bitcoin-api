const { generateCandles } = require('./bitcoin/candle-generator');
const { createServer } = require('./server');

generateCandles();
createServer();