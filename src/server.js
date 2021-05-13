const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const port = process.env.PORT || 3001

app.use(express.static('/public'))

io.on('connection', socket => {
  console.info('A user connected')
})

server.listen(port, () => {
  console.log('Servidor iniciado.')
})
