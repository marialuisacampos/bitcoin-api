const axios = require('axios');

const readMarketPrice = async () => {
  const result = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl');
  const data = result.data;
  const price = data.bitcoin.brl;
  return price;
}

module.exports = {
  readMarketPrice
}