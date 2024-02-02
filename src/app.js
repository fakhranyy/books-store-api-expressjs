const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
const authPath = require("./routes/auth");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const { notFound, errorHandler } = require("./middleware/errors");

dotenv.config();
// * connection to database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected To MongoDB"))
  .catch((err) => console.log("Connection failed..And the error is " + err));

// * init app, this app icludes all http methods LIKE ( app.get(), app.post(), etc )
const app = express();
const port = process.env.PORT;
// * apply middlewares
app.use(express.json());

//? to know the http method in the current request & original route
//* Like -> POST http://localhost:5000/api/books
app.use(logger);

//* Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);
app.use("/api/auth", authPath);
//* Error handling middleware
app.use(notFound);

app.use(errorHandler);

// Running the server
app.listen(port, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${port} `
  )
); //* port , callback function
