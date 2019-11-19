const { Router } = require("express");

const User = require("../models/user");
const router = Router();

router.get("/:id", async (req, res) => {
  const user = await User.getUser(req.params.id);

  res.render("user", {
    title: user.name,
    user
  });
});

module.exports = router;
