const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");

const homeRoute = require("./routes");
const aboutRoute = require("./routes/about");
const contactRoute = require("./routes/contact");
const usersRoute = require("./routes/users");

const app = express();

const hbs = handlebars.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoute);
app.use("/about", aboutRoute);
app.use("/contact", contactRoute);
app.use('/users', usersRoute)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Serever was started on port ${PORT}!!!`);
});
