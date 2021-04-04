const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

const result = {message:'OK'};
const error = {message:'The slot is already taken...'};

router.route('/').get((req, res) => {
  res.json(db.seats);
});

router.route('/:id').get((req, res) => {
  res.json(
    db.seats.filter(item => item.id === parseInt(req.params.id))
  );
});

router.route('/').post((req, res) => {
  const {day, seat, client, email} = req.body;
  const seatsAvailability = db.seats.some(item => item.day === day && item.seat === seat );
  if(!seatsAvailability) {
    db.seats.push({
      id: uuidv4(),
      day: day,
      seat,
      client,
      email,
    });
   res.json(result);
  }
  else{
    res.status(404).json(error);
  }
});

router.route('/:id').put((req, res) => {
  const {day, seat, client, email} = req.body;
  const found = db.seats.find(element => `${element.id}` === +req.params.id);
  const indexOfFoundElem = db.seats.indexOf(found);
  const updatedElem = ({
    id: req.params.id,
    day,
    seat,
    client,
    email,
  });
  db.seats[indexOfFoundElem] = updatedElem;
  res.json(result);
});

router.route('/:id').delete((req, res) => {
  const found = db.seats.find(element => element.id === req.params.id);
  const indexOfFoundElem = db.seats.indexOf(found);
  db.seats.splice(indexOfFoundElem, 1);
  res.json(result);
});

module.exports = router;
