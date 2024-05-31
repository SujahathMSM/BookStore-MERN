import express from "express";
import mongoose from "mongoose";
import { Book } from "./Models/BookModel.js";
import { PORT, DBurl } from "./config.js";

const app = express();

// Middleware for parsing requst body
app.use(express.json());

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

// Send a book to database
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({
        message: "Send all required fields: ttile, author and publishedYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get all the books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Get book by an ID
app.get("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Update a book
app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({
        message: "Send all required fields: ttile, author and publishedYear",
      });
    }

    const id = req.params.id;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      res.status(500).json({ message: "Book not found" });
    }

    res.status(200).send({ message: "Updated the book successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Delete a book

app.delete("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = Book.findByIdAndDelete(id);
    if (!result){
        return res.status(500).send({message: "Book not found"})
    }

    return res.status(200).send({message: "Book is deleted successfully"})
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
