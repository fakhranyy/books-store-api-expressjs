const express = require("express");
const logger = require("./middleware/logger");
const { notFound, errorHandler } = require("./middleware/errors");
const connectToDB = require("./config/db");
require("dotenv").config(); //* that let us use the .env variables


// * connection to database function
connectToDB();

// * init app, this app icludes all http methods LIKE ( app.get(), app.post(), etc )
const app = express();

// * apply middlewares
app.use(express.json());

//? to know the http method in the current request & original route
//* Like -> POST http://localhost:5000/api/books
app.use(logger);

//* Routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));


//* Error handling middleware
app.use(notFound);
app.use(errorHandler);

//* Running the server
app.listen(process.env.PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT} `
  )
); //* port , callback function
