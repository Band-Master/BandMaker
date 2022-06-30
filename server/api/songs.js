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

// add song  /api/songs/add

router.post("/add", async (req, res, next) => {
  try {
    const newSong = await Song.create({
      title: req.body.title,
      bpm: req.body.bpm,
      bandId: req.body.bandId
    });
    res.status(201).send(newSong);
  } catch (error) {
    next(error);
  }
})

// DELETE /api/songs/delete/:songId
router.delete("/delete/:songId", async (req, res, next) => {
  try {
    const song = await Song.findByPk(req.params.songId);
    await song.destroy();
    res.send(song);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
