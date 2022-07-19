const express = require("express");
const router = express.Router();
const uuid = require("uuid");

let books = [];

//get all books
router.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, results: books.length, data: { books } });
});

//get one book
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const foundBook = books.find((book) => book.id == id);
  if (!foundBook) {
    return res
      .status(400)
      .json({ success: false, msg: "No book exist with such id" });
  }
  res.status(200).json({
    success: true,
    msg: "Search successful",
    data: { Book: foundBook },
  });
});

//add book
router.post("/", (req, res) => {
  if (!req.body) {
    res.status(400).json({
      success: false,
      msg: "please provide book title and author name",
    });
  }

  const book = { ...req.body, id: uuid.v4(), createdAt: new Date().toString() };

  const idx = books.find(
    (b) => b.title == book.title && b.authorName == book.authorName
  );

  if (idx) {
    res.status(200).json({
      success: false,
      msg: "Book already exist",
      count: books.length,
      data: { books },
    });
  } else books.push(book);

  res.status(201).json({
    success: true,
    msg: "Book successfully added",
    count: books.length,
    data: { books },
  });
});

//update book
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const bookIndex = books.findIndex((book) => book.id == id);

  if (bookIndex < 0) {
    res.status(404).json({ success: false, msg: `no book with id ${id}` });
  }

  const updatedBook = {
    ...books[bookIndex],
    ...req.body,
    updatedAt: new Date().toString(),
  };

  books[bookIndex] = updatedBook;
  res.status(200).json({
    success: true,
    msg: "Book Updated",
    count: books.length,
    data: { books },
  });
});

//delete books
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const book = books.find((book) => book.id == id);
  if (!book) {
    res.status(404).json({ success: false, msg: `no book with id ${id}` });
  }

  books = books.filter((book) => book.id !== id);
  res.status(200).json({
    success: true,
    msg: "Book Successfully deleted",
    count: books.length,
    data: { books },
  });
});

module.exports = router;
