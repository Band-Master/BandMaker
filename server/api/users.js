const router = require("express").Router();
const {
  models: { User, ModelSong, Band },
} = require("../db");
module.exports = router;

// GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:id
router.get("/:id", async (req, res, next) => {
  try {
    // console.log(req.user.id);  see if you can get id from req.user
    const singleUser = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: { model: Band, as: "member" },
    });
    res.json(singleUser);
  } catch (error) {
    next(error);
  }
});

//Update User /api/users/:id
router.put("/:id", async (req, res, next) => {
  try {
    console.log(req);
    if (req.body.id == req.params.id) {
      await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id/ModelSongs
router.get("/:id/ModelSongs", async (req, res, next) => {
  try {
    const modelSongs = await ModelSong.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.json(modelSongs);
  } catch (err) {
    next(err);
  }
});

// Get /api/users
