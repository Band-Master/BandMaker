# Band_Maker

MVP Statement; https://drive.google.com/drive/folders/1Y31tSFTbO2Jb60DneTL9jRegjCFPe8TT?usp=sharing

Video Walkthrough: https://youtu.be/DXyHXV1HkT8

This is a web app that allows users to create a band, and add users to that band. Users that are members of that band can create and edit songs. This is done by first, creating the song with a name and a bpm, and then uploading audio files as "parts" to that song. Within the single song view, users can play the whole song with the main playback component, or play individual parts by themselves. 
## Setup

To use this run dev, complete the following steps.

- `npm install`
- Create two postgres databases (`BandMaker` should match the `name` parameter in `package.json`):
- These commands will create both your **development** and **test** databases

```
createdb <YOUR APP NAME HERE FROM package.json>
createdb <YOUR APP NAME HERE FROM package.json>-test
```

- By default, running `npm test` will use your test database, while
  regular development uses development database

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)
- to access a user with a seeded demo song; login with the following: username: "cody" password: "123". The preseeded demo song is under the band, Obstructionist's.
I am still working out drag and drop capabilities to allign audio tracks within the song component, but if you would like to try uploading audio files to a new song, I would encourage that!