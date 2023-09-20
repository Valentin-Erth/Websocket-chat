import {io, Socket} from "socket.io-client";

export const socket = io("http://localhost:3009");


export const api = {
    socket: null as null | Socket,
    creatConnection() {
        this.socket = io("http://localhost:3009")
    },
    subscribe(initMessageHandler: (messages: any) => void,
              newMessageSendHandler: (message: any) => void) {
        this.socket?.on('init-messages-published', initMessageHandler)
        this.socket?.on('new-message-send', newMessageSendHandler)
    },
    destroyConnection() {
        this.socket?.disconnect()
        this.socket = null
    },
    sendName(name:string){
        this.socket?.emit('client-name-send',name)
    },
    sendMessage(message:string){
        this.socket?.emit('client-message-send', message)
    }
}