import s from  './messages.module.css'

type MessagesType={
    messages:{
        name: string,
        room: string,
        message: string
    }[],
    name:string
}
export const Messages = ({messages,name}:MessagesType) => {
    return (
        <div className={s.messages}>
            {messages && messages.map((m, i) => {
                const itsMe=m.name?.trim().toLowerCase()===name.trim().toLowerCase()
                const className = itsMe ? s.me : s.user
                return (
                    <div key={i} className={`${s.message} ${className}`}>
                        <div className={s.user}>
                            <span>{m.name}</span>
                        </div>
                        <div className={s.text}>
                            <span>{m.message}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

