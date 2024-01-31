const express = require("express");
const router = express.Router();
const { Author, validateUpdateAuthor, validateCreateAuthor } = require("../models/Author");
// * Http Methods / Http verbs
// * 1st argument (url), 2nd argument (callback function -> in express we called it route handler)

/*
 * @desc   Get all authors
 * @route  /api/authors
 * @method GET
 * @access public
 */

router.get("/", async (req, res) => {
  try {
    const authorList = await Author.find(); //* find All authors and assign it in (authorList)
    res.status(200).json(authorList);
  } catch (error) {
    console.log("something went wrong");
  }
});

/*
 * @desc   Get author by id
 * @route  /api/author/:id
 * @method GET
 * @access public
 */
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "author is not found" });
    }
  } catch (error) {
    console.log("some thing went wrong");
  }
});

/*
 * @desc   Create new author
 * @route  /api/authors
 * @method POST
 * @access public
 */
router.post("/", async (req, res) => {
  const { error } = validateCreateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });

    const result = await author.save();

    res.status(201).json(result);
  } catch (error) {
    console.log("the error is " + error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/*
 * @desc   update a author
 * @route  /api/authors/:id
 * @method PUT
 * @access public
 */
router.put("/:id", async (req, res) => {
  const { error } = validateUpdateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          nationality: req.body.nationality,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(author);
  } catch (error) {
    console.log("the error is " + error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/*
 * @desc   delete an author
 * @route  /api/author/:id
 * @method DELETE
 * @access public
 */
router.delete("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.body.id);
    if (author) {
      await Author.findByIdAndDelete(req.body.id);
      res.status(200).json({ message: "author has been deleted !" });
    } else {
      res.status(404).json({ message: "author not found" });
    }
  } catch (error) {
    console.log("something went wrong");
  }
});


module.exports = router;
