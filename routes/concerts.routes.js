const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

const result = {message:'OK'}

router.route('/').get((req, res) => {
  res.json(db.concerts);
});

router.route('/:id').get((req, res) => {
  res.json(
    db.concerts.filter(item => item.id === req.params.id)
  );
});

router.route('/').post((req, res) => {
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

router.route('/:id').put((req, res) => {
  const {performer, genre, price, day, image} = req.body;
  const found = db.concerts.find(element => `${element.id}` === req.params.id);
  const indexOfFoundElem = db.concerts.indexOf(found);
  const updatedElem = ({
    id: req.params.id,
    performer: performer,
    genre,
    price,
    day,
    image,
  });
  db.concerts[indexOfFoundElem] = updatedElem;
  res.json(result);
});

router.route('/:id').delete((req, res) => {
  const found = db.concerts.find(element => element.id === req.params.id);
  const indexOfFoundElem = db.concerts.indexOf(found);
  db.concerts.splice(indexOfFoundElem, 1);
  res.json(result);
});


module.exports = router;
