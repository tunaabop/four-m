const { User, Follower } = require("../../models");
const User_Follower = require("../../models/User_Follower");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    req.session.isLoggedIn = true;
    req.session.user_id = user.user_id;
    req.session.save(() => res.json({ id: user.user_id }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error("User not found.");
    }
    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
    req.session.isLoggedIn = true;
    req.session.user_id = user.user_id;
    req.session.save(() => res.json({ id: user.user_id }));
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid username or password." });
  }
});

router.post("/logout", (req, res) => {
  console.log("logging out (users router)")
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    res.end();
  });
});

router.get("/:username", (req, res) => {
  User.findOne({
    where: {
      username: req.params.username,
    },
    include:[
      {
        model: User, 
        through: User_Follower,
        as: 'follower'
      },
      {
        model: User, 
        through: User_Follower,
        as: 'following'
      }
    ]
  }).then((userData) => {
    if (!userData) {
      res.status(404).json({ message: "User cannot be found" });
      return;
    }

    res.json(userData);
  })
  .catch((err) => 
  {
    console.log(err);
    res.status(500).json(err);
  });
});
module.exports = router;
