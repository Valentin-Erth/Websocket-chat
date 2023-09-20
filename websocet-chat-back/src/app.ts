import express from 'express'
import http from 'http'
import {Server} from "socket.io"
import cors from 'cors'

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});//socket
app.use(cors())
const PORT = process.env.PORT || 3009

app.get('/', (req, res) => {
    res.send("Hi, It's Websocket server!")//создали endpoint
});
const messages = [
    {message: "Hello Valek", id: "23f441", user: {id: "sdgsdgs", name: "Valek Tem"}},
    {message: "Hello", id: "23f440", user: {id: "sdgsdgs", name: "Tem"}},
    {message: "Hello Petr Yoyo", id: "23f447", user: {id: "sdgsdgs", name: "Petr"}},
]
const usersState = new Map()

io.on('connection', (socketChanel) => {
    // socketChanel подписался на событие connection, и когда оно произойдет выполняется код ниже, клиентское сообщение и имя отправлено, сщздаем аноним пользователя
    usersState.set(socketChanel, {id: new Date().getTime().toString(), name: "anon"})
    socketChanel.on('disconnect', () => {
        usersState.delete(socketChanel)
    })
    io.on('client-name-send', (name: string) => {
        if (typeof name !== "string") {
            return
        }
        const user = usersState.get(socketChanel)//присваиваем имя с фронта
        user.name = name
    })

    socketChanel.on('client-message-send', (message: string) => {
        if (typeof message !== "string") {
            return
        }
        const user = usersState.get(socketChanel)
        // console.log(message)
        let messageItem = {message: message, id: new Date().getTime().toString(), user: {id: user.id, name: user.name}}
        messages.push(messageItem)

        socketChanel.emit('new-message-send', messageItem)//отправлем это сообщение
    })

    socketChanel.emit('init-messages-published', messages)

    console.log('a user connected');
});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});


