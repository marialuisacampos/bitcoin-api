const { config } = require('dotenv');
const { connect } = require('amqplib');
const { Server } = require('socket.io');
const http = require('http');
const Candle = require('../candles/candle-model');
const { saveCandleOnDatabase } = require('../candles/candle-service');

const configSocketIo = async (server) => {
  config();

  const newServer = new Server(http.createServer(server), {
    cors: {
      origin: process.env.SOCKET_CLIENT_SERVER,
      methods: ["GET", "POST"]
    }
  })

  newServer.on('connection', () => console.log('Web Socket connection created.'))
  createMessageChanel()
    .then(r => consumeMessages(r, newServer))
    .catch(err => console.log('Error: ', err))
};

const createMessageChanel = async () => {
  config();

  try {
    const connection = await connect(process.env.AMQP_SERVER)
    const channel = await connection.createChannel()
    await channel.assertQueue(process.env.QUEUE_NAME)
    console.log('Connected to RabbitMQ')

    return channel
  } catch (err) {
    console.log('Error connecting to RabbitMQ')
    console.log(err)

    return null
  }
}

const sendMenssageToQueue = async (channel, queueName, message) => {
  await channel.sendToQueue(queueName, message)
  console.log('Message send')
}

const consumeMessages = async (channel, socketio) => {
  if (channel) {
    channel.consume(process.env.QUEUE_NAME, async msg => { //callback utiliza a mensagem recebida para algo
      const candle = JSON.parse(msg.content.toString());
      console.log('Message received');
      console.log(candle);
      channel.ack(msg); //reconhece que recebeu a mensagem

      await saveCandleOnDatabase(candle);
      console.log('Candle saved on database');
      socketio.emit(process.env.SOCKET_EVENT_NAME, candle);
      console.log('New candle emited by web socket')
    })
  }
}

module.exports = {
  createMessageChanel,
  sendMenssageToQueue,
  configSocketIo,
  consumeMessages
}