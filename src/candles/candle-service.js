const Candle = require('./candle-model');

const saveCandleOnDatabase =  (candle) => Candle(candle).save();

const findLastCandlesOnDatabase = async (quantity) => {
  const n = quantity > 0 ? quantity : 10;
  const lastCandles = await Candle.find().sort({ _id: -1 }).limit(n);
  return lastCandles
};

module.exports = {
  saveCandleOnDatabase,
  findLastCandlesOnDatabase
}