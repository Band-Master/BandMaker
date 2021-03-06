"use strict";

// const { Sequelize } = require("sequelize/types");
const {
  db,
  models: { User, Band, ModelSong, Song, Part },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "Zach Patch", password: "123" }),
    User.create({ username: "Shadrack", password: "123", imgUrl: "https://firebasestorage.googleapis.com/v0/b/band-maker-d5da5.appspot.com/o/47B35F9D-B8AB-4B2B-9F91-D047AC79C1C2.JPG?alt=media&token=cd108488-7a3e-4963-9d0a-e0d3c9ed39bc", coverUrl: "https://firebasestorage.googleapis.com/v0/b/band-maker-d5da5.appspot.com/o/02038610-D178-49D0-8B4A-B690F26971F8.JPG?alt=media&token=cc174545-ba18-4fc7-b4cb-5c48f63b6939" }),
    User.create({ username: "Lucy", password: "123" }),
  ]);

  console.log(`seeded ${users.length} users`);

  // Creating Bandss
  const bands = await Promise.all([
    Band.create({
      name: "Acid Patch Kids",
      bio: "Acid Patch Kids is former rockstar superheros turned villians following the demise of there ethically compromised bass player. After burning the snake pit, front man Zach Patch and drum core super nerd Joel Ocampo remaining the last surviving members. Former lead guitar player Doug the Cable Guy died of old age after 197 years of life.",
    }),
    Band.create({
      name: "Obstructionists",
      bio: "We have assumed control",
    }),
  ]);

  await Promise.all(
    bands.map((band) => {
      users[0].setMember(band);
      users[1].setMember(band);
    })
  );

  console.log(`seeded ${bands.length} users`);

  // Creating songs
  const songs = await Promise.all([
    Song.create({
      title: "demo",
      bpm: 100,
      bandId: 1,
    }),
    Song.create({
      title: "demo2",
      bpm: 120,
      bandId: 1,
    }),
  ]);

  console.log(`seeded ${songs.length} songs`);

  // Creating parts
  const parts = await Promise.all([
    Part.create({
      name: "gat",
      audioUrl:
      "https://firebasestorage.googleapis.com/v0/b/band-maker-d5da5.appspot.com/o/gat.mp3?alt=media&token=f6531179-38bb-4e02-a269-948809dfd838",
      songId: 1,
      userId: 1,
      bandId: 1,
    }),
    Part.create({
      name: "bass",
      audioUrl:
      "https://firebasestorage.googleapis.com/v0/b/band-maker-d5da5.appspot.com/o/bass.mp3?alt=media&token=dbc57af8-51b6-4e89-b7e2-11acca2d8884",
      songId: 1,
      userId: 1,
      bandId: 1,
    }),
    Part.create({
      name: "drums",
      audioUrl:
      "https://firebasestorage.googleapis.com/v0/b/band-maker-d5da5.appspot.com/o/drums.mp3?alt=media&token=1cbe98bd-c622-4b41-b401-c3a572fc6c00",
      songId: 1,
      userId: 1,
      bandId: 1,
    }),
    Part.create({
      name: "vox",
      audioUrl:
      "https://firebasestorage.googleapis.com/v0/b/band-maker-d5da5.appspot.com/o/vox.mp3?alt=media&token=d80d8282-020a-4d35-b73b-c7840a4798ee",
      songId: 1,
      userId: 1,
      bandId: 1,
    }),
  ]);
  console.log(`seeded ${parts.length} parts`);

  // Creating ModelSongs
  const modelSongs = await Promise.all([
    ModelSong.create({
      title: "Star 67",
      lyrics: `Flaming eyes inside a wretched head
    Harrowed soul falling onto narrow bones
    They say the time has come for you to return to form
    To rewind the days, to reset the score
    Do you know how to feel?
    Can we have your name?
    For too many years we've stayed within the dark
    We've walked along the cold, we've anchored in the yards
    The time has come for me to return to form
    To rewind the days, to reset the score
    You don't know how it feels
    Can we have your name?`,
      url: `https://open.spotify.com/track/0OwvQC6sZ2CzR1g8ICZjur?si=dc73926d90024d66`,
      userId: 1,
    }),
    ModelSong.create({
      title: "The Corner's Dilemma",
      lyrics: `A room full of people, too anxious to mingle
    My brain yells at me, "It's the perfect time
    To get existential, your body's a rental"
    Push back, tell myself that I'm just fine
    More people show up, I think I might throw up
    Go out for some fresh air to clear out my mind
    There's more people out there, this shit is a nightmare
    I wanna go home, but I'll piss off my ride
    (So I'll just keep drinking)
    And hope for the best
    Let my brain do the rest
    Man, fuck it, whatever, I guess
    Sometimes I think I've wasted my whole life
    Chasing my pipe dreams
    With shots and a whole lot of beer
    A part of me figures there's no fight
    Left in the shell of a person I became this year
    Fuck, is that the first place I go?
    Why can't I, for one night, let this roll off my shoulders?
    Damn, this is bleak
    I know I'm not this weak
    I thought people got wiser when older?
    Then again, I think I've wasted my whole life
    Chasing my pipe dreams with shots and a whole lot of beer
    A part of me figures there's no fight left
    In the shell of a person I became this year
    I wonder if my parents know why
    I'm a recluse and I don't leave my house on most days
    When my friends ask if am all right,
    I lie straight to their faces and say I'm okay
    I just want to be a normal person
    Or anything but me
    Stuck In a room full of people, too anxious to mingle
    My brain yelling that it's the perfect time
    To get existential, your body's a rental
    And something is wrong I think you might be dying!
    (Oh no)
    (I just want to be a normal person)
    (Or anything but me)
    To think that I've wasted my whole life
    Chasing my pipe dreams with shots and a whole lot of beer
    (Or anything but me)
    A part of me knows that there's no fight left
    In the shell of a person I became this year
    (I just want to be a normal person)
    To think that I've wasted my whole life
    Chasing my pipe dreams with shots and a whole lot of beer
    (Or anything but me)
    A part of me knows that there's no fight left
    In the shell of a person I became this year
    (I just want to be a normal person)
    To think that I've wasted my whole life
    Chasing my pipe dreams with shots and a whole lot of beer
    (Or anything but me)
    A part of me knows that there's no fight left
    In the shell of a person I became this year
    I think that I've wasted my whole life`,
      url: `https://open.spotify.com/track/6JChG4McBETZv2PRSumxQ7?si=462d5c2ba0f84209`,
      userId: 1,
    }),
  ]);

  console.log(`seeded ${modelSongs.length} modelSongs`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
