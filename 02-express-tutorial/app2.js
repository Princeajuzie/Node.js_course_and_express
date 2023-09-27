const express = require("express");
const { products } = require("./data");
const app = express();

app.get("/", (req, res) => {
  res.send('<h1> Home Page</h1> <a href="/api/products"> products  </a>');
});
app.get("/api/products", (req, res) => {
  const NewProducts = products.map((product) => {
    const { id, image, name } = product;
    return { id, image, name };
  });
  res.json(NewProducts);
});
app.get("/api/products/:productID", (req, res) => {
  // console.log(req)
  // console.log(req.params)
  const { productID } = req.params;
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );
  if (!singleProduct) {
    return res.status(404).send("<h1>data not found</h1>");
  }
  return res.json(singleProduct);
  console.log(singleProduct);
});

app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  res.send("hello world");
});

app.get("/api/v1/query", (req, res) => {
  // console.log(req.query)
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    const regex = new RegExp(search, "i");
    sortedProducts = sortedProducts.filter((product) => {
      return regex.test(product.name);
    });
  }
  if (limit) {
    return (sortedProducts = sortedProducts.slice(0, Number(limit)));
  }
  if (sortedProducts.length < 1) {
    // res.status(200).send('no products matched your search');
    return res.status(200).json({ sucess: true, data: [] });
  }
  res.status(200).json(sortedProducts);
  res.send("<h1>Hello World</h1>");
});

app.listen(5000, () => {
  console.log("listening to port 5000...");
});
