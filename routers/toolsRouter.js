const router = require("express").Router();
const Tools = require("../data/helpers/tools-model");

//middleware for rental Deletion
const deleteRentalRequest = async function (req, res, next) {
  try {
    const tool_id = req.params.id;
    const lentTool = await rented - tools.findBy({ tool_id });
    if (!lentTool) {
      next();
    } else {
      try {
        const tool = await rented - tools.remove(lentTool.id);
        if (tool > 0) {
          res.status(200).json({ message: "tool request has been deleted!" });
          next();
        } else {
          res
            .status(404)
            .json({ message: "tool request with that ID could not be found" });
        }
      } catch (error) {
        res.status(500).json({ message: "tool could not be removed" });
      }
    }
  } catch (error) {
    res.send(error);
  }
};


//get all tools
router.get("/", (req, res) => {
  Tools.find()
    .then(tools => {
      res.status(200).json({ tools });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


//get tool by ID
router.get("/:id", async (req, res) => {
  try {
    const tool = await Tools.findById(req.params.id);

    if (tool) {
      res.status(200).json(tool);
    } else {
      res.status(404).json({ message: "tool with that ID does not exist!" });
    }
  } catch (error) {
    res.status(500).json({
      message: " Error getting the tool"
    });
  }
});

router.post("/", async (req, res) => {
  console.log('req.body-tool-price-bod', req.body.toolName, req.body.price, req.body.userId);
  if (!req.body.toolName || !req.body.price || !req.body.userId) {
    res.status(400).json({ error: "must specify a toolName, price, and userId on the request object" });
  } else {
    try {
      const tool = await Tools.create(req.body);

      res.status(201).json({ tool });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
});

router.put("/:id", async (req, res) => {
  console.log('req.body', req.body, req.params.id);
  if (!req.body.toolName || !req.body.price || !req.body.userId) {
    res.status(400).json({ error: "must enter toolName, price, and userId" });
  } else {
    try {
      // const count = await db("tools")
      //   .where({ id: req.params.id })
      //   .update(req.body);

      const tool = await Tools.update(req.body, req.params.id);
      console.log('tool returned from the db', tool);

      if (tool) {
        res.status(200).json(tool);
      } else {
        res.status(404).json({ error: "tool not found" });
      }
      ////////

      // const count = await Tools.update(req.body, req.params.id)

      // if (count > 0) {
      //   const tool = await db("tools")
      //     .where({ id: req.params.id })
      //     .first();

      //   res.status(200).json(tool);
      // } else {
      //   res.status(404).json({ error: "tool not found" });
      // }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
});
//deleteRentalRequest as 2nd argument in delete
router.delete("/:id", async (req, res) => {
  try {
    const tool = await Tools.remove(req.params.id);
    if (tool > 0) {
      res.status(200).json({ message: "tool deleted" });
    } else {
      res.status(404).json({ message: "tool with that ID could not be found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;