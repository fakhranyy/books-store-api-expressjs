const express = require("express");
const router = express.Router();
const {
  Book,
  validateUpdateBook,
  validateCreateBook,
} = require("../models/Book");
const asyncHandler = require("express-async-handler");

// * Http Methods / Http verbs
// * 1st argument (url), 2nd argument (callback function -> in express we called it route handler)

/*
 * @desc   Get all books
 * @route  /api/books
 * @method GET
 * @access public
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.find();
    res.json(books); // send response as json file
  })
);

/*
 * @desc   Get book by id
 * @route  /api/book/:id
 * @method GET
 * @access public
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "book is not found" });
    }
  })
);

/*
 * @desc   Create new book
 * @route  /api/books
 * @method POST
 * @access public
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { error } = validateCreateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const book = new Book({
      title: req.body.title,
      autor: req.body.author,
      description: req.body.description,
      price: req.body.price,
      cover: req.body.cover,
    });
    const result = await book.save();
    res.status(201).json(result); //* 201 => created successfully.
  })
);

/*
 * @desc   update a book
 * @route  /api/books/:id
 * @method PUT
 * @access public
 */
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          autor: req.body.author,
          description: req.body.description,
          price: req.body.price,
          cover: req.body.cover,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedBook);
  })
);

/*
 * @desc   delete a book
 * @route  /api/books/:id
 * @method DELETE
 * @access public
 */
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await findById(req.params.id);
    if (book) {
      await Book.findByIdAndDelete(req.params.id);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  })
);

module.exports = router;
