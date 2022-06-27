const router = require("express").Router();
const {
  models: { Song, Band, Part, User_Bands },
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

// POST add band  /api/bands/add
router.post("/add", async (req, res, next) => {
  try {
    const newBand = await Band.create({
      name: req.body.name,
      bio: req.body.bio
    })
    // const user = await User.findOne({
    //   where: {
    //     id: req.body.user.id
    //   }
    // })
    await User_Bands.create({
      userId: req.body.user.id,
      bandId: newBand.id
    })
    res.status(201).send(newBand);
  } catch (error) {
    next(error);
  }
});

// GET add member  /api/bands/add
router.post("/:bandId/addMembers", async (req, res, next) => {
  try {
    // const band = await Band.findOne({
    //   where: {
    //     id: req.params.bandId,
    //   },
    //   include: [Song, { model: Part, include: [User] }, { model: User }],
    // });
    // const user = await User.findOne({
    //   where: {
    //     id: req.body.userId
    //   }
    // })
    // console.log(band);
    // await user.setMember(band);
    await User_Bands.create({
      bandId: req.params.bandId,
      userId: req.body.userId
    })
    const newBand = await Band.findOne({
      where: {
        id: req.params.bandId,
      },
      include: [Song, { model: Part, include: [User] }, { model: User }],
    });
    res.status(201).send(newBand);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
