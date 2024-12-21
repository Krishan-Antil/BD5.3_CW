const express = require('express');

const app = express();
const port = 3000;

let { sequelize } = require('./lib/index.js');
let { tracks } = require('./models/track.models');

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
    await sequelize.sync({ force: true });
    await tracks.bulkCreate(movieData);

    res.status(200).json({ message: 'Database Seedng succesful' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Database Seeding Faied', error: error.message });
  }
});

async function fetchAllTracks() {
  let track = await tracks.findAll();

  return { track };
}
app.get('/tracks', async (req, res) => {
  try {
    let response = await fetchAllTracks();
    if (response.track.length === 0) {
      return res.status(404).json({ message: 'No tracks found' });
    }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ messgae: error.message });
  }
});

async function fetchTrackById(id) {
  let trackData = await tracks.findOne({ where: { id } });

  return { track: trackData };
}

app.get('/tracks/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);

  try {
    let result = await fetchTrackById(id);

    if (result.track === null) {
      return res.status(404).json({ messgae: 'Track not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.messgae });
  }
});

async function fetchTracksByArtist(artist) {
  let trackData = await tracks.findAll({ where: { artist } });

  return { track: trackData };
}

app.get('/tracks/artist/:artist', async (req, res) => {
  let artist = req.params.artist;
  try {
    let result = await fetchTracksByArtist(artist);

    if (result.track.length === 0) {
      return res
        .status(404)
        .json({ messgae: 'No track found with artist ' + artist });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.messgae });
  }
});

async function sortTracksByReleaseYear(order) {
  let sortedTracks = await tracks.findAll({ order: [['release_year', order]] });

  return { track: sortedTracks };
}

app.get('/tracks/sort/release_year', async (req, res) => {
  let order = req.query.order;

  try {
    let result = await sortTracksByReleaseYear(order);

    if (result.track.length === 0) {
      return res.status(404).json({ message: 'No tracks found' });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});