import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {api} from "@/features/chat/api/socket.api.ts";

const slice = createSlice({
    name: "chat",
    initialState: {
        messages: [],
    },
    reducers: {
        setMessages: (state, action: PayloadAction<[]>) => {
            state.messages = action.payload
        },
        addMessage: (state, action: PayloadAction<any>) => {
            state.messages.push(action.payload)
        }
    }
})
const creatConnection = createAsyncThunk("chat/getMessages", (_, thunkAPI) => {
    const {dispatch} = thunkAPI
    api.creatConnection()
    api.subscribe((messages: any) => {
        dispatch(chatActions.setMessages(messages))
    }, (message: any) => {
        dispatch(chatActions.addMessage(message))
    })
})
const setClientName = createAsyncThunk("chat/getMessages", (name: string) => {
    api.sendName(name)
})
const sendMessage = createAsyncThunk("chat/getMessages", (message: string) => {
    api.sendMessage(message)
})

const destroyConnection = createAsyncThunk("chat/getMessages", () => {
    api.destroyConnection()
})

export const chatSlice = slice.reducer
export const chatActions = slice.actions
export const chatThunks = {creatConnection, destroyConnection, setClientName,sendMessage}

