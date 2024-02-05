const mongoose = require("mongoose");

async function connectToDB() {
  // * connection to database
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected To MongoDB");
  } catch (err) {
    console.log("Connection failed..And the error is " + err);
  }
}
module.exports = connectToDB;

/* 
! the old way to connection to database And it also works
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected To MongoDB"))
    .catch((err) => console.log("Connection failed..And the error is " + err));
*/
