const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('./../db');

//show all seats (GET)
router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

//show only one seat (GET)
router.route('/seats/:id').get((req, res) => {
    const { id } = req.params;
    const seatid = db.seats.find((item) => item.id.toString() === id);
    if(seatid) {
        res.json(seatid);
    } else {
        res.status(404).json({ message: 'Seat not found' });
    }
});

//add seat (POST)
router.route('/seats').post((req ,res) => {
    const { day, seat, client, email } = req.body;
    if (day && seat && client && email) {
        const newSeat = {
            id: uuidv4(),
            day,
            seat,
            client,
            email,
        };
        db.seats.push(newSeat);
        res.json({ message: 'OK'});
    } else {
        res.status(400).json({ message: "The slot is already taken..." });
    }
});

//modyfi seat (PUT)
router.route('/seats/:id').put((req, res) => {
    const { id } = req.params;
    const { day, seat, client, email } = req.body;

    const seatIndex = db.seats.findIndex((item) => item.id.toString() === id);

    if(seatIndex !== -1 && day && seat && client && email) {
        db.seats[seatIndex] = { ...db.seats[seatIndex], day, seat, client, email};
        res.json({ message: 'OK'});
    } else {
        res.status(404).json({ message: 'Seat not found or missing data'});
    }
});

//delete seat (DELETE)
router.route('/seats/:id').delete((req, res) => {
    const { id } = req.params;
    const seatIndex = db.seats.findIndex((item) => item.id.toString() === id);

    if(seatIndex !== -1) {
        db.seats.splice(seatIndex, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Seat not found '});
    }
});

module.exports = router;