import express from "express";
import mongoose from "mongoose";
import { PORT, DBurl } from "./config.js";
import bookRoute from "./routes/bookRoute.js"
import cors from 'cors';
const app = express();

// Middleware for parsing requst body
app.use(express.json());

app.use('/books', bookRoute)

// Connecting to the Database
mongoose
  .connect(DBurl)
  .then(() => {
    console.log("Connected to a DataBase");
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//HTTP route

// Middleware for handling CORS plicy
app.use(cors())
app.use(cors({
    origin:'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))

app.get("/", (req, res) => {
  return res.status(234).send("Welcome to MERN Stack Book Store Project");
});

