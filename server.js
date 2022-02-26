const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const MongoDB = require("./db/mongodb");
const PORT = process.env.PORT || 2020;
const mongo = new MongoDB();
const cors = require("cors");

//import routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const userBooksRouter = require("./routes/userBooks");

//create the express app object
const app = express();

//connect to mongoDB
mongo.connect();

//app port listener
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

//set up middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "https://bookshelf-client-six.vercel.app",
  })
);

//assign route handling
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/books", booksRouter);

//export so the app can be used anywhere with a require.
module.exports = {
  app,
  mongo,
};
