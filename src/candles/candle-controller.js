const { findLastCandlesOnDatabase } = require('./candle-service');

const findCandles = async (req, res) => {
  try {
    const quantity = req.params.quantity;
    const lastCandles = await findLastCandlesOnDatabase(quantity);
    
    return res.status(200).json(lastCandles);
  } catch (error) {
    res.status(404).json({
      message: 'Error finding last candles',
      error
    })
  }
}

module.exports = {
  findCandles
}