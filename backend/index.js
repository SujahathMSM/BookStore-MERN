import express from 'express';
import {  PORT} from './config.js'
const app = express();

app.listen(PORT, () =>{
    console.log(`Listening on port: ${PORT}`)
})

//HTTP route

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send("Welcome to MERN Stack Book Store Project")
})