const express = require('express');
const Book = require('./books.model');
const { postBook, getAllBooks, getOneBook, UpdateBook, DeleteBook } = require('./book.control');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();



router.post("/create-book",verifyAdmin, postBook );

//Get Books

router.get("/", getAllBooks)

//Get one book
router.get("/:id", getOneBook)

//Update Book data
router.put("/edit/:id", UpdateBook)

//Delete Book data
router.delete("/:id", DeleteBook)

module.exports = router;