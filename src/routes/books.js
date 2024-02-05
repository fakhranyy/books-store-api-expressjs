const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const {
  getAllBooks,
  getBookById,
  createNewBook,
  updateBook,
  deleteBook,
} = require("../controller/bookController");

//* /api/books
router.route("/")
.get(getAllBooks)
.post(verifyTokenAndAdmin, createNewBook);

//* /api/books/:id
router.route("/:id")
  .get(getBookById)
  .put(verifyTokenAndAdmin, updateBook)
  .delete(verifyTokenAndAdmin, deleteBook);

module.exports = router;
