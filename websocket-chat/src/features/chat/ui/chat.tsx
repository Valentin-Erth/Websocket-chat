import {useEffect, useState} from 'react';
import s from "@/app/app.module.css";
import {useLocation} from "react-router-dom";
import {io} from "socket.io-client";

const socket = io("http://localhost:3009");
export const Chat = () => {
    // console.log('App rendered')
    const location = useLocation()
    const [params, setParams] = useState<null | {
        [p: string]: string
    }>(null)
    const [state, setState] = useState<{
        name: string,
        room: string
    }[]>([])
    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(location.search))//перобразуем строку после ?,из параметров запросаиз урла в по ключ-значению в объект
        setParams(searchParams)
        socket.emit("join", searchParams)
    }, [location.search])
    console.log(params)

    useEffect(() => {
        socket.on("message", ({data}) => {
            // console.log(data)
            setState((prevState) => ([...prevState, data]))
        })
    }, []);
    console.log("state", state)
    return (
        <div className={s.box}>
            <h1>Chat</h1>
        </div>
    )
}
// export const Chat = () => {
//     // console.log('App rendered')
//     const messages = useAppSelector(selectMessages)
//     const typingUsers = useAppSelector(selectTypingusers)
//     const dispatch = useAppDispatch()
//     // подписываемся, получаем мессаджи с бэка
//     useEffect(() => {
//         dispatch(chatThunks.creatConnection())
//         return () => {
//             dispatch(chatThunks.destroyConnection())
//         }
//     }, [])
//
//     // const [messages, setMessages] = useState<{
//     //     message: string,
//     //     id: string,
//     //     user: {
//     //         id: string,
//     //         name: string
//     //     }
//     // }[]>([])
//     const [message, setMessage] = useState('Hello')
//     const [name, setName] = useState('Valek')
//     const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)
//     const [lastScrollTop, setLastScrollTop] = useState(0)
//     useEffect(() => {
//         if (isAutoScrollActive) {
//             messagesAncorRef.current?.scrollIntoView({behavior: "smooth"})// плавная прокрутка до последнего элемента через ref
//         }
//     }, [messages])
//
//     const messagesAncorRef = useRef<HTMLDivElement>(null)
//
//     return (
//         <div className={s.box}>
//             <div className={s.content} onScroll={(e) => {
//                 // console.log(e.currentTarget.scrollTop)
//                 const element = e.currentTarget
//                 const maxScrollPosition = element.scrollHeight - element.clientHeight
//                 if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollHeight)) {
//                     setIsAutoScrollActive(true)
//                 } else {
//                     setIsAutoScrollActive(false)
//                 }
//                 setLastScrollTop(element.scrollTop)
//             }}>
//                 {messages && messages.map((m: any) => {
//                     return (
//                         <div key={m.id}>
//                             <b>{m.user.name}:</b> {m.message}
//                             <hr/>
//                         </div>
//                     )
//                 })}
//                 {typingUsers && typingUsers.map((u: any) => {
//                     return (
//                         <div key={u.id}>
//                             <b>{u.user.name}:</b> ...
//                         </div>
//                     )
//                 })}
//                 <div ref={messagesAncorRef}></div>
//             </div>
//             <div>
//                 <input type="text" style={{color: "black", marginTop: "5px"}} value={name}
//                        onChange={(e) => setName(e.currentTarget.value)}/>
//                 <button onClick={() => {
//                     dispatch(chatThunks.setClientName(name))
//                 }} style={{color: "black", padding: "3px", margin: "5px"}}>Send name
//                 </button>
//             </div>
//             <div>
//                 <textarea value={message} onKeyDown={() => {
//                     dispatch(chatThunks.typeMessage())
//                 }} onChange={(e) => setMessage(e.currentTarget.value)}
//                           style={{color: "black", marginTop: "5px"}}></textarea>
//                 <button onClick={() => {
//                     dispatch(chatThunks.sendMessage(message))
//                     setMessage("")
//                 }} style={{color: "black", padding: "3px", margin: "5px"}}>Send
//                 </button>
//             </div>
//             <div>
//             </div>
//         </div>
//     )
// }

