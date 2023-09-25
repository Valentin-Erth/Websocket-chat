import express from "express";

const router=express.Router()
//создали endpoint
router.get("/", (req,res)=>{
    res.send("Hi, It's Websocket server brilliant!")
})
export default router