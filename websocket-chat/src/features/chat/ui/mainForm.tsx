import s from "./mainForm.module.css"
import {NavLink} from "react-router-dom";
import {ChangeEvent, useState} from "react";

const FIELDS = {
    username: "username",
    room: "room"
}
type FIELDSType=typeof FIELDS
export const MainForm = () => {
    // const {USERNAME, ROOM} = FIELDS
    const [values, setValues] = useState<FIELDSType>({username: "", room: ""})
    console.log(values)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log(e.currentTarget.name, e.currentTarget.value)
        setValues({...values, [e.currentTarget.name]: e.currentTarget.value})
    }
    return (
        <div className={s.wrap}>
            <div className={s.container}>
                <h1 className={s.heading}> Join</h1>
                <form className={s.form}>
                    <input type={"text"}
                           name="username"
                           placeholder={"Username"}
                           value={values.username}
                           onChange={handleChange}
                           className={s.input}
                           autoComplete="off"
                    />
                    <input type={"text"}
                           name="room"
                           placeholder={"Room"}
                           value={values.room}
                           onChange={handleChange}
                           className={s.input}
                           autoComplete="off"/>
                    <NavLink to={`/chat?name=${values.username}& room=${values.room}`}>
                        <button type={"submit"} className={s.button}>
                            Sign In
                        </button>
                    </NavLink>
                </form>
            </div>

        </div>
    );
};
