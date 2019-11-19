const { Router } = require("express");
const Article = require("../models/article");
const auth = require("../midleware/auth");
const router = Router();

router.get("/", async (req, res) => {
  const list = await Article.find();

  res.render("articles/articles", {
    isArticles: true,
    list
  });
});

router.get("/create", auth, (req, res) => {
  const { id } = req.params;

  res.render("articles/add-article", {});
});

router.post("/create", auth, async (req, res) => {
  const { body } = req;
  const article = new Article({
    title: body.title,
    description: body.description,
    image: body.image,
    // userId: req.user,
    author: body.author
  });
  try {
    await article.save();
    res.redirect("articles/articles");
  } catch (err) {
    console.log(err);
  }
});

router.post("/edit", auth, async (req, res) => {
  const { body } = req;
  const { id } = body;
  delete req.body.id;
  try {
    await Article.findByIdAndUpdate(id, body);
    res.redirect("articles/articles");
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id/edit", auth, async (req, res) => {
  const list = await Article.findById(req.params.id);

  res.render("articles/edit-article", {
    list
  });
});

router.get("/:id/delete", auth, async (req, res) => {
  try {
    await Article.deleteOne({ _id: req.params.id });
    res.redirect("articles/articles");
  } catch (err) {
    console.log(err);
  }
});
router.get("/:id", auth, async (req, res) => {
  const article = await Article.findById(req.params.id);

  res.render("articles/article", {
    article
  });
});

module.exports = router;
