const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all posts
const result = {message:'OK'}

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(
    db.seats.filter(item => item.id === parseInt(req.params.id))
  );
});

router.route('/seats').post((req, res) => {
  const {day, seat, client, email} = req.body;
  db.seats.push({
    id: uuidv4(),
    day,
    seat,
    client,
    email,
  });
 res.json(result);
});

router.route('/seats/:id').put((req, res) => {
  const {day, seat, client, email} = req.body;
  const found = db.seats.find(element => element.id === req.params.id);
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

router.route('/seats/:id').delete((req, res) => {
  const found = db.seats.find(element => element.id === req.params.id);
  const indexOfFoundElem = db.seats.indexOf(found);
  db.seats.splice(indexOfFoundElem, 1);
  res.json(result);
});

router.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});


module.exports = router;
