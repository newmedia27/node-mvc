const { Router } = require("express");

const User = require('../models/user')

const router = Router();



router.get("/", async (req, res) => {

  const list = await User.getAll()


  res.render("users", {
    title: "Users",
    isUsers: true,
    list,
  });
});

module.exports = router;
