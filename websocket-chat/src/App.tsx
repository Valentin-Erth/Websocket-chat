import {useEffect, useState} from "react";
import s from './app.module.css'
import {io} from "socket.io-client";

const socket = io("http://localhost:3009");

function App() {
    useEffect(() => {
        // подписываемся, получаем мессаджи с бэка
        socket.on('init-messages-published', (messages: any) => {
            setMessages(messages)
        })
                socket.on('new-message-send', (message: any) => {
            setMessages((messages) => [...messages, message])
        })
    }, [])
    const [messages, setMessages] = useState<{
        message: string,
        id: string,
        user: {
            id: string,
            name: string
        }
    }[]>([])
    const [message, setMessage] = useState('Hello')

    return (
        <div className={s.box}>
            <div className={s.content}>
                {messages && messages.map(m => {
                    return (
                        <div key={m.id}>
                            <b>{m.user.name}:</b> {m.message}
                            <hr/>
                        </div>
                    )
                })}
            </div>
            <div>
                <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}
                          style={{color: "black"}}></textarea>
            </div>
            <div>
                <button onClick={() => {
                    socket.emit("client-message-send", message)
                    setMessage("")
                }} style={{color: "black", padding: "3px"}}>Send
                </button>
            </div>

        </div>

    )
}

export default App
