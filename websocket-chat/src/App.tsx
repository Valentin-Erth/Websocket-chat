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
        message: string, id: string, user: { id: string, name: string }
    }[]>([])
    const [message, setMessage] = useState('Hello')
    const [name, setName] = useState('Valek')
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
                <input type="text" style={{color: "black", marginTop:"5px"}} value={name} onChange={(e)=>setName(e.currentTarget.value)}/>
                <button onClick={() => {
                    socket.emit("client-name-send", name)

                }} style={{color: "black", padding: "3px", margin:"5px"}}>Send name
                </button>
            </div>
            <div>
                <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}
                          style={{color: "black", marginTop:"5px"}}></textarea>
                <button onClick={() => {
                    socket.emit("client-message-send", message)
                    setMessage("")
                }} style={{color: "black", padding: "3px", margin:"5px"}}>Send
                </button>
            </div>
            <div>

            </div>

        </div>

    )
}

export default App
