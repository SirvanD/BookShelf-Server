//Require Mongoose
var mongoose = require("mongoose");
var { Schema, Query } = mongoose;
const BookSchema = require("../db/book.schema");

// Compile model from schema
const BookModel = mongoose.model("books", BookSchema.bookSchema);

async function donate_book(book) {
  book.status = "available";
  const document = new BookModel(book);
  return await document.save();
}

async function list_books(searchQuery) {
  return await BookModel.find({
    "volumeInfo.title": { $regex: ".*" + searchQuery + ".*" },
  });
  // return await document.save();
}

module.exports = {
  donate_book,
  BookModel,
  list_books,
};
