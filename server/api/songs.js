const router = require("express").Router();
const {
  models: { Song, Part, User },
} = require("../db");

// single song  /api/songs/:songId
router.get("/:songId", async (req, res, next) => {
  try {
    const song = await Song.findOne({
      where: {
        id: req.params.songId,
      },
      include: [Part, { model: Part, include: [User] }],
    });
    res.json(song);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
