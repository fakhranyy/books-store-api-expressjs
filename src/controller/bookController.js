const {
  Book,
  validateUpdateBook,
  validateCreateBook,
} = require("../models/Book");
const asyncHandler = require("express-async-handler");

/**
 * @desc   Get all books
 * @route  /api/books
 * @method GET
 * @access public
 */
//* comparison Query operators => from mongoDB , you'll find more on the mongoDB website
//? $eq (equal)
//? $ne (not equal)
//? $lt (less than)
//? $lte (less than & equal)
//? $gt (greater than)
//? $gte (greater than & equal)
//? $in (matches any of the values specified in an array) => take an array
//? $nin (matches none of the values specified in an array) => take an array
module.exports.getAllBooks = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  let books;
  if (minPrice && maxPrice) {
    books = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice },
    }).populate("author", ["_id", "firstName", "lastName"]);
  } else {
    books = await Book.find().populate("author", [
      "_id",
      "firstName",
      "lastName",
    ]);
  }
  res.json(books); // send response as json file
});

/**
 * @desc   Get book by id
 * @route  /api/book/:id
 * @method GET
 * @access public
 */
module.exports.getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate("author");
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "book is not found" });
  }
});

/**
 * @desc   Create new book
 * @route  /api/books
 * @method POST
 * @access private (only admin)
 */
module.exports.createNewBook = asyncHandler(async (req, res) => {
  const { error } = validateCreateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  });
  const result = await book.save();
  res.status(201).json(result); //* 201 => created successfully.
});

/**
 * @desc   update a book
 * @route  /api/books/:id
 * @method PUT
 * @access private (only admin)
 */
module.exports.updateBook = asyncHandler(async (req, res) => {
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
});

/**
 * @desc   delete a book
 * @route  /api/books/:id
 * @method DELETE
 * @access private (only admin)
 */
module.exports.deleteBook = asyncHandler(async (req, res) => {
  const book = await findById(req.params.id);
  if (book) {
    await Book.findByIdAndDelete(req.params.id);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});
