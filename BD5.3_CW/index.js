const express = require('express');

const app = express();
const port = 3000;

let { sequelize } = require('./lib/index.js');
let { tracks } = require('./Models/track.model.js');

let movieData = [
  {
    name: 'Raabta',
    genre: 'Romantic',
    release_year: 2012,
    artist: 'Arijit Singh',
    album: 'Agent Vinod',
    duration: 4,
  },
  {
    name: 'Naina Da Kya Kasoor',
    genre: 'Pop',
    release_year: 2018,
    artist: 'Amit Trivedi',
    album: 'Andhadhun',
    duration: 3,
  },
  {
    name: 'Ghoomar',
    genre: 'Traditional',
    release_year: 2018,
    artist: 'Shreya Ghoshal',
    album: 'Padmaavat',
    duration: 3,
  },
  {
    name: 'Bekhayali',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Darshan Raval',
    album: 'Hawa Banke (Single)',
    duration: 3,
  },
  {
    name: 'Ghungroo',
    genre: 'Dance',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'War',
    duration: 5,
  },
  {
    name: 'Makhna',
    genre: 'Hip-hop',
    release_year: 2019,
    artist: 'Tanishk Bagchi',
    album: 'Dtive',
    duration: 3,
  },
  {
    name: 'Tera Ban Jaunga',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Tulsi Kumar',
    album: 'Kabir Singh',
    duration: 3,
  },
  {
    name: 'First Class',
    genre: 'Dance',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'Kalank',
    duration: 4,
  },
  {
    name: 'Kalank Title Track',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'Kalank',
    duration: 5,
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await tracks.sync({ force: true });
    await tracks.bulkCreate(movieData);
    res.status(200).json({ messgae: 'Database Seeding successful' });
  } catch (error) {
    res.status(500).json({ error: error.messgae });
  }
});

async function fetchAllTracks() {
  let trackData = await tracks.findAll();

  return { track: trackData };
}

app.get('/tracks', async (req, res) => {
  try {
    let result = await fetchAllTracks();

    if (result.track.length === 0) {
      return res.status(404).json({ message: 'No tracks found' });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.messgae });
  }
});

app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
