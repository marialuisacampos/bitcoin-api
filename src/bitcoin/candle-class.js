class Candle {
  constructor(currency) {
    this.currency = currency,
    this.finalDateTime = 0,
    this.lowPrice = Infinity,
    this.highPrice = 0,
    this.closePrice = 0,
    this.openPrice = 0,
    this.values = [],
    this.color = 'grey'
  }

  addPrice(value) {
    this.values.push(value);

    if(this.values.length === 1) {
      this.openPrice = value
    }

    if(this.lowPrice > value) {
       this.lowPrice = value
    }

    if(this.highPrice < value) {
      this.highPrice = value
    }
  }

  closeCandle() {
    if (this.values.length > 0) {
      this.closePrice = this.values[this.values.length - 1]
      this.finalDateTime = new Date()

      if (this.openPrice > this.closePrice) {
        this.color = 'red'
      } else if (this.closePrice > this.openPrice) {
        this.color = 'green'
      } else {
        this.color = 'grey'
      }
    }
  }

  toSimpleObject() {
    const { values, ...candle } = this
    return candle
  }
}

module.exports = {
  Candle,
}