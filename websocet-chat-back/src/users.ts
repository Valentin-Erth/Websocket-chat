import {trimStr} from "./utils";
export type Userstype={
    name:string,
    room:string
}
let users=[] as Userstype[]

export const addUser=(user:Userstype)=>{
    const userName=trimStr(user.name)
    const userRoom=trimStr(user.room)

    const isExist=users.find(u=>u.name===userName && u.room===userRoom)

    !isExist && users.push(user)// если юзера не сущ то добавить в users

    const  currentUser=isExist || user
    return {isExist: !!isExist, user: currentUser}
}