import express from 'express'
import http from 'http'
import { Server } from "socket.io"
import cors from 'cors'

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }});//socket
app.use(cors())
const PORT = process.env.PORT || 3009

app.get('/', (req, res) => {
    res.send("Hi, It's Websocket server!")//создали endpoint
});
const messages=[
    {message: "Hello Valek", id: "23f441", user: {id: "sdgsdgs", name: "Valek Tem"}},
    {message: "Hello", id: "23f440", user: {id: "sdgsdgs", name: "Tem"}},
    {message: "Hello Petr Yoyo", id: "23f447", user: {id: "sdgsdgs", name: "Petr"}},
]
io.on('connection', (socket) => {
    // socket подписался на событие connection, и когда оно произойдет выполняется этот код, клиентское сообщение отправлено
    socket.on('client-message-send', (message: string)=>{
        console.log(message)
        let messageItem={message: message, id: "23f441"+new Date().getTime(), user: {id: "sdgsdgs", name: "Valek Tem"}}
        messages.push(messageItem)

        socket.emit('new-message-send', messageItem)//отправлем это сообщение
    })

    socket.emit('init-messages-published', messages)

    console.log('a user connected');
});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});


