const { config } = require('dotenv');
const { connect } = require('amqplib');

const createMessageChanel = async () => {
  config()

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
module.exports = {
  createMessageChanel,
  sendMenssageToQueue
}