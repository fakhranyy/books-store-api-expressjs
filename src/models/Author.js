const mongoose = require("mongoose");
const joi = require("joi");

const AuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    image: {
      type: String,
      default: "default-avatar.png",
    },
  },
  {
    timestamps: true,
  }
);
// * from here we'll build collection in our DB (collection name, collection schema)
const Author = mongoose.model("Author", AuthorSchema);

//* validate create book
function validateCreateAuthor(obj) {
  const schema = joi.object({
    firstName: joi.string().trim().min(3).max(200).required(),
    lastName: joi.string().trim().min(3).max(200).required(),
    nationality: joi.string().trim().min(3).max(200).required(),
    image: joi.string(),
  });

  return schema.validate(obj);
}

//* validate update book
function validateUpdateAuthor(obj) {
  const schema = joi.object({
    firstName: joi.string().trim().min(3).max(200),
    lastName: joi.string().trim().min(3).max(200),
    nationality: joi.string().trim().min(3).max(200),
    image: joi.string(),
  });

  return schema.validate(obj);
}

module.exports = {
  Author,
  validateUpdateAuthor,
  validateCreateAuthor,
};
