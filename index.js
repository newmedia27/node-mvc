const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const handlebars = require("express-handlebars");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const homeRoute = require("./routes");
const aboutRoute = require("./routes/about");
const articlesRoute = require("./routes/articles");
const authRoute = require("./routes/auth");
const User = require("./models/user");

const MONGO_URL = `mongodb+srv://jart:57312043@cluster0-6me1r.mongodb.net/blog`;

const varMiddleware = require("./midleware/variables");

const app = express();

const store = new MongoStore({
  collection: "sessions",
  uri: MONGO_URL
});
const hbs = handlebars.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "newmedia",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(varMiddleware);

app.use("/", homeRoute);
app.use("/about", aboutRoute);
app.use("/articles", articlesRoute);
app.use("/auth", authRoute);

const PORT = process.env.PORT || 8080;

async function start() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    });

    app.listen(PORT, () => {
      console.log(`Serever was started on port ${PORT}!!!`);
    });
  } catch (err) {
    console.log(err);
  }
}
start();
