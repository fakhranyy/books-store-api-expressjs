const express = require("express");
const booksPath = require("./routes/booksRoutes")
// * init app, this app icludes all http methods LIKE ( app.get(), app.post(), etc )
const app = express();
const port = 5000;
// * apply middlewares
app.use(express.json());

//* Routes
app.use("/api/books",booksPath)
// Running the server
app.listen(port, () => console.log("Server is running on port " + port)); //* port , callback function
