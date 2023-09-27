const express = require("express");
const App = express();
const morgan = require("morgan");
const logger = require("./logger");
// req => middleware => res

//1. use vs route
//2. options - our own / express/ third party
//  App.use(express.static("./public"));

App.use(morgan("tiny"));
const authorize = require("./authorize");
// App.use([logger,authorize])
// api/home/about/products
App.get("/", (req, res) => {
  res.send("home");
});
App.get("/about", (req, res) => {
  res.send("about");
});

App.get("/api/products", (req, res) => {
  res.send("product");
});
App.get("/api/item", (req, res) => {
  console.log(req.user);
  res.send("items");
});

App.listen(5000, () => {
  console.log("server is listening to port 5000...");
});
