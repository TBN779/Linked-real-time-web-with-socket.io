const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = 5000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})
app.get('/javascript', (req, res) => {
    res.sendFile(__dirname + '/public/javascript.html')
})
app.get('/java', (req, res) => {
    res.sendFile(__dirname + '/public/java.html')
})
app.get('/css', (req, res) => {
    res.sendFile(__dirname + '/public/css.html')
})


const tech = io.of('/tech')

tech.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room)
        tech.in(data.room).emit('message', `New user join ${data.room} room`)
    })

    socket.on('message', (data) => {
        console.log(data)
        tech.in(data.room).emit('message', data.msg)
    })

    socket.on('disconnect', (data) => {
        console.log('user disconnected', data)
        tech.emit('message', 'user disconnected')
    })
})

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
