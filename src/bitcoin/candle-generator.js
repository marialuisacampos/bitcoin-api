const { readMarketPrice } = require('./candle-get-price');
const { createMessageChanel, sendMenssageToQueue } = require('../messages/messages-channel');
const { Candle } = require('./candle-class');


const generateCandles = async () => {
  const rabbitChannel = await createMessageChanel()

  if (rabbitChannel) {
    const loopTimes = 300000 / 30000 //nova candle a cada 5min, com leitura a cada 30segundos
  const candle = new Candle('BTC')

  console.log('-----------------------------------')
  console.log('Generating new candle')

  for (let i = 0; i < loopTimes; i++) {
    const price = await readMarketPrice();
    candle.addPrice(price);
    console.log(`Market price #${i + 1} of ${loopTimes}`);
    await new Promise(r => setTimeout(r, 10000))
  }

  candle.closeCandle()
  console.log('Candle closed')
  const candleCreated = candle.toSimpleObject()
  console.log(candleCreated)
  const candleToRabbit = JSON.stringify(candleCreated)
  
  sendMenssageToQueue(rabbitChannel, process.env.QUEUE_NAME, Buffer.from(candleToRabbit))
}
}


module.exports = {
  generateCandles,
}