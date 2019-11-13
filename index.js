const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");

const app = express();

const hbs = handlebars.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.get("/", (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Serever was started on port ${PORT}!!!`);
});
