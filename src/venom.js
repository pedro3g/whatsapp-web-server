const venom = require('venom-bot')

venom
  .create('hello', () => {}, () => {}, { useChrome: false })
  .then(client => start(client))
  .catch(err => { throw err })

function start (client) {
  client.onMessage((message) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result)
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro)
        })
    }
  })
}
