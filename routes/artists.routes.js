const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

// show all artists (GET)
router.route('/artists').get((req, res) => {
  res.json(db.artists);
});

//show only one artist (GET)
router.route('/artists/:id').get((req, res) => {
  const  id  = req.params.id;
  const indexArtist = db.artists.find((item) => item.id.toString() === id);
  if(indexArtist) {
    res.json(indexArtist);
  }else{
    res.status(404).json({ message: 'Artist not found' });
  }
});

//show random artist (GET)
router.route('/artists/abc/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.artists.length);
    const randomArtists = db.artists[randomIndex];
    res.json(randomArtists);
});


//add artist (POST)
router.route('/artists').post((req, res) => {
  const { author, text } = req.body;
  if (author && text) {
  const newArtist = {
    id: uuidv4(),
    author,
    text,
  };
  db.artists.push(newArtist);
  res.json({ message: 'OK' });
}else{
  res.status(404).json({ message: 'Not foud author and text are required.' });
}
});

//modyfi artist (PUT)
router.route('/artists/:id').put((req, res) => {
  const { id } = req.params;
  const { author, text } = req.body;
  const artistIndex = db.artists.findIndex((item) => item.id.toString() === id);
  
  console.log(artistIndex, author, text);
  if (artistIndex !== -1 && author && text) {
  db.artists[artistIndex] = { ...db.artists[artistIndex], author, text};
  res.json({ message: 'OK' });
  }else{
    res.status(404).json({ message: 'Not foud author and/or text.' });
  }
}); 

//delete artist (DELETE)
router.route('/artists/:id').delete((req, res) => {
  const { id } = req.params;
  const artistIndex = db.artists.findIndex((item) => item.id.toString() === id);
  if (artistIndex !== -1) {
  db.artists.splice(artistIndex, 1);
  res.json({ message: 'OK' }); 
  }else{
    res.status(404).json({ message: 'Artists not found' });
  }
});

module.exports = router;