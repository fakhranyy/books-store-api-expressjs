const express = require("express");
const booksPath = require("./routes/booksRoutes");
const authorsPath = require("./routes/authorsRoutes");
const mongoose = require("mongoose");

// * connection to database
mongoose
  .connect("mongodb://localhost/bookStoreDB")
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Connection failed..And the error is " + err));

// * init app, this app icludes all http methods LIKE ( app.get(), app.post(), etc )
const app = express();
const port = 5000;
// * apply middlewares
app.use(express.json());

//* Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);

// Running the server
app.listen(port, () => console.log("Server is running on port " + port)); //* port , callback function
