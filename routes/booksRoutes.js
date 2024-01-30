const express = require("express");
const router = express.Router();
const joi = require("joi");

const books = [
  {
    id: 1,
    title: "rich dad poor dad",
    author: "robert",
    description: "About econimcs",
    price: 10,
    cover: "soft cover",
  },
  {
    id: 2,
    title: "dreams",
    author: "mustafa mahmoud",
    description: "About dreams",
    price: 10,
    cover: "soft cover",
  },
];
// * Http Methods / Http verbs
// * 1st argument (url), 2nd argument (callback function -> in express we called it route handler)

/*
 * @desc   Get all books
 * @route  /api/books
 * @method GET
 * @access public
 */
router.get("/", (req, res) => {
  res.json(books); // send response as json file
});

/*
 * @desc   Get book by id
 * @route  /api/book/:id
 * @method GET
 * @access public
 */
router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id)); // we use parseInt to convert id to number, because all params are string even ids
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "book is not found" });
  }
});

/*
 * @desc   Create new book
 * @route  /api/books
 * @method POST
 * @access public
 */
router.post("/", (req, res) => {
  const { error } = validateCreateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const book = {
    id: books.length + 1,
    title: req.body.title,
    autor: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  };
  books.push(book);
  res.status(201).json(book); //* 201 => created successfully.
});

/*
 * @desc   update a book
 * @route  /api/books/:id
 * @method PUT
 * @access public
 */
router.put("/:id", (req, res) => {
  const { error } = validateUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book){
    res.status(200).json({ message: "Book has been updated"})
  } else {
    res.status(404).json({ message: "Book not found"})
  }
});

/*
 * @desc   delete a book
 * @route  /api/books/:id
 * @method DELETE
 * @access public
 */
router.delete("/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book){
      res.status(200).json({ message: "Book has been deleted !"})
    } else {
      res.status(404).json({ message: "Book not found"})
    }
  });
  

//* validate create book
function validateCreateBook(obj) {
  const schema = joi.object({
    title: joi.string().trim().min(3).max(200).required(),
    author: joi.string().trim().min(3).max(200).required(),
    description: joi.string().trim().min(3).max(200).required(),
    price: joi.number().min(0).required(),
    cover: joi.string().required(),
  });

  return schema.validate(obj);
}

//* validate update book
function validateUpdateBook(obj) {
  const schema = joi.object({
    title: joi.string().trim().min(3).max(200),
    author: joi.string().trim().min(3).max(200),
    description: joi.string().trim().min(3).max(200),
    price: joi.number().min(0),
    cover: joi.string(),
  });

  return schema.validate(obj);
}

module.exports = router;
