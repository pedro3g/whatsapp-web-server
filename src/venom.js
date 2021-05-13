const venom = require('venom-bot')
const fs = require('fs')

// venom
//   .create('hello', () => { console.log('qrcode gerado') }, () => {}, { useChrome: false })
//   .then(client => start(client))
//   .catch(err => { throw err })

// function start (client) {
//   client.onMessage((message) => {
//     if (message.body === 'Hi' && message.isGroupMsg === false) {
//       client
//         .sendText(message.from, 'Welcome Venom 🕷')
//         .then((result) => {
//           console.log('Result: ', result)
//         })
//         .catch((erro) => {
//           console.error('Error when sending: ', erro)
//         })
//     }
//   })
// }

async function createSession (name, codeName) {
  try {
    await venom.create(name, (base64Qr, asciiQR, attempts, urlCode) => {
      // console.log(asciiQR) // Optional to log the QR in the terminal
      // eslint-disable-next-line no-useless-escape
      const matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
      const response = {}

      if (matches.length !== 3) {
        return new Error('Invalid input string')
      }
      response.type = matches[1]
      // eslint-disable-next-line new-cap
      response.data = new Buffer.from(matches[2], 'base64')

      const imageBuffer = response
      fs.writeFile(
        `public/tmp/${codeName}.png`,
        imageBuffer.data,
        'binary',
        function (err) {
          if (err != null) {
            console.log(err)
          }
        }
      )
    },
    undefined,
    { useChrome: false, logQR: false })
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  createSession
}
