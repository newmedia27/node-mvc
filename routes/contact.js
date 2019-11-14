const { Router } = require("express");
const User = require("../models/user");
const router = Router();

router.get("/", (req, res) => {
  res.render("contact", {
    title: "Contact",
    isContact: true
  });
});

router.post("/", async (req, res) => {
  const {
    body: { name, last_name, email }
  } = req;

  const user = new User(name, last_name, email);
  await user.save();
  res.redirect("/users");
});

module.exports = router;
