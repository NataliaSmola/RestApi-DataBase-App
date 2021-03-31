const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all posts
const result = {message:'OK'}

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(
    db.concerts.filter(item => item.id === parseInt(req.params.id))
  );
});

router.route('/concerts').post((req, res) => {
  const {performer, genre, price, day, image} = req.body;
  db.concerts.push({
    id: uuidv4(),
    performer,
    genre,
    price,
    day,
    image,
  });
 res.json(result);
});

router.route('/concerts/:id').put((req, res) => {
  const {performer, genre, price, day, image} = req.body;
  const found = db.concerts.find(element => element.id === req.params.id);
  const indexOfFoundElem = db.concerts.indexOf(found);
  const updatedElem = ({
    id: req.params.id,
    performer,
    genre,
    price,
    day,
    image,
  });
  db.concerts[indexOfFoundElem] = updatedElem;
  res.json(result);
});

router.route('/concerts/:id').delete((req, res) => {
  const found = db.concerts.find(element => element.id === req.params.id);
  const indexOfFoundElem = db.concerts.indexOf(found);
  db.concerts.splice(indexOfFoundElem, 1);
  res.json(result);
});

router.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

module.exports = router;
