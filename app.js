const express = require("express");

// * init app, this app icludes all http methods LIKE ( app.get(), app.post(), etc )
const app = express();
const port = 5000;
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

app.get("/api/books", (req, res) => {
  res.json(books); // send response as json file
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id)); // we use parseInt to convert id to number, because all params are string even ids
  if (book) {
    res.status(200).json(book); 
  } else { 
    res.status(404).json({ message: "book is not found"})
  }
});

// Running the server
app.listen(port, () => console.log("Server is running on port " + port)); //* port , callback function
