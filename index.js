const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const routes = require("./Routes/books");

app.use(bodyParser.json());
app.use("/books", routes);

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
