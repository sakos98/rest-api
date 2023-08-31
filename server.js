const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

const artistsRouter = require('./routes/artists.routes');
const concertsRouter = require('./routes/concerts.routes');
const seatsRouter = require('./routes/seats.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', artistsRouter);
app.use('/api', concertsRouter);
app.use('/api', seatsRouter);

app.use((req, res) => {
  res.status(404).json({message: 'Not found...'});
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

