const { Book } = require("./models/Book");
const { Author } = require("./models/Author");
const { books, authors } = require("./data");
const connectToDB = require("./config/db");
require("dotenv").config();

// * Connection To DB
connectToDB();

// * Import books (seeding database)
const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log("Books Imported");
  } catch (error) {
    console.log(error);
    process.exit(1); // cut the db connection
  }
};

// * Import Authors (seeding database)
const importAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log("Authors Imported");
  } catch (error) {
    console.log(error);
    process.exit(1); // cut the db connection
  }
};

// * Remove books ()
const removeBooks = async () => {
  try {
    await Book.deleteMany(); //! delete all data in book collection
    console.log("Books Removed !");
  } catch (error) {
    console.log(error);
    process.exit(1); // cut the db connection
  }
};

// * Remove books ()
const removeAuthors = async () => {
  try {
    await Author.deleteMany(); //! delete all data in book collection
    console.log("Authors Removed !");
  } catch (error) {
    console.log(error);
    process.exit(1); // cut the db connection
  }
};

//* to trigger the seeding run this command =>( node seeder -import-books ) ,etc
if (process.argv[2] === "-import-books") {
  importBooks();
} else if (process.argv[2] === "-remove-books") {
  removeBooks();
} else if (process.argv[2] === "-import-authors") {
  importAuthors();
} else if (process.argv[2] === "-remove-authors") {
  removeAuthors();
}
