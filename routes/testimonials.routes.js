const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

const result = {message:'OK'}

router.route('/').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/:id').get((req, res) => {
  res.json(
    db.testimonials.filter(item => item.id === parseInt(req.params.id))
  );
});

router.route('/').post((req, res) => {
  const {author, text} = req.body;
  db.testimonials.push({
    id: uuidv4(),
    author,
    text,
  });
 res.json(result);
});

router.route('/:id').put((req, res) => {
  const {author, text} = req.body;
  const found = db.testimonials.find(element => element.id === req.params.id);
  const indexOfFoundElem = db.testimonials.indexOf(found);
  const updatedElem = ({
    id: req.params.id,
    author,
    text
  });
  db.testimonials[indexOfFoundElem] = updatedElem;
  res.json(result);
});

router.route('/:id').delete((req, res) => {
  const found = db.testimonials.find(element => element.id === req.params.id);
  const indexOfFoundElem = db.testimonials.indexOf(found);
  db.testimonials.splice(indexOfFoundElem, 1);
  res.json(result);
});

module.exports = router;
