import {AppRootStateType} from "@/app/store.ts";

export const selectMessages=(state:AppRootStateType) => state.chat.messages