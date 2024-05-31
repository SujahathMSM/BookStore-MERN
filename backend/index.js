import express from "express";
import mongoose from "mongoose";
import { PORT, DBurl } from "./config.js";
import bookRoute from "./routes/bookRoute.js"

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

app.get("/", (req, res) => {
  return res.status(234).send("Welcome to MERN Stack Book Store Project");
});

