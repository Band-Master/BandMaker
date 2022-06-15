const router = require("express").Router();
const {
  models: { Song, Band, Part },
} = require("../db");
const User = require("../db/models/User");

// "get all bands" /bands
router.get("/", async (req, res, next) => {
  try {
    const bands = await Band.findAll({
      include: { model: User },
    });
    res.json(bands);
  } catch (err) {
    next(err);
  }
});

// single band  /api/bands/:bandId
router.get("/:bandId", async (req, res, next) => {
  try {
    const band = await Band.findOne({
      where: {
        id: req.params.bandId,
      },
      include: [Song, { model: Part, include: [User] }, { model: User }],
    });
    res.json(band);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
