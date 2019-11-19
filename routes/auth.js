const { Router } = require("express");

const router = Router();

router.get("/login", async (req, res) => {
  res.render("auth/login", {
    title: "Login",
    isLogin: true
  });
});
router.post("/login", async (req, res) => {
  const user = {
    name: "Jart",
    email: "proc2@i.ua",
    avatar: "avatar"
  };
  req.session.user = user;
  req.session.isAuth = true;
  req.session.save(err => {
    if (err) throw err;
    res.redirect("/");
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
