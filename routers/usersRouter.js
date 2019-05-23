const router = require("express").Router();
const db = require("../data/helpers/users-model.js");



//get all tools
router.get("/", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "User with specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ message: `Server error, request failed ${error}.` });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.remove(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({
      message: `The user's information could not be modified: ${error}.`
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, username, password, thumbnailUrl } = req.body;
  const user = {
    username,
    password,
    first_name: firstName,
    last_name: lastName,
    thumbnail_url: thumbnailUrl
  };
  try {
    const editedUser = await db.update(user, id);
    if (editedUser) {
      res.status(200).json(editedUser);
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist yet."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Server error, user information could not be updated: ${error}.`
    });
  }
});

module.exports = router;
