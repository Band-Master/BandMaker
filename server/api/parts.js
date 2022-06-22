const router = require("express").Router();
const {
  models: { Part },
} = require("../db");
module.exports = router;

// POST /api/parts/add/:songId/:userId/:bandId
router.post("/add/:songId/:userId/:bandId", async (req, res, next) => {
  try {
    const part = {
      name: req.body.name,
      audioUrl: req.body.audioUrl,
      songId: req.params.songId,
      userId: req.params.userId,
      bandId: req.params.bandId,
    }
    res.status(201).send(await Part.create(part));
  } catch (error) {
    next(error);
  }
});
