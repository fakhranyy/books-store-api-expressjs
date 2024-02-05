const express = require("express");
const {
  getAllAuthors,
  getAuthorById,
  createNewAuthor,
} = require("../controller/authorsController");
const router = express.Router();
const {
  validateUpdateAuthor,
  validateCreateAuthor,
} = require("../models/Author");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

//* /api/authors
router.route("/")
.get(getAllAuthors)
.post(verifyTokenAndAdmin, createNewAuthor);


//* /api/authors/:id
router.route("/:id")
  .get(getAuthorById)
  .put(verifyTokenAndAdmin)
  .delete(verifyTokenAndAdmin);

module.exports = router;
