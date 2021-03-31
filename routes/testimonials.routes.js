const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

// get all posts
const result = {message:'OK'}

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(
    db.testimonials.filter(item => item.id === parseInt(req.params.id))
  );
});

router.route('/testimonials').post((req, res) => {
  const {author, text} = req.body;
  db.testimonials.push({
    id: uuidv4(),
    author,
    text,
  });
 res.json(result);
});

router.route('/testimonials/:id').put((req, res) => {
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

router.route('/testimonials/:id').delete((req, res) => {
  const found = db.testimonials.find(element => element.id === req.params.id);
  const indexOfFoundElem = db.testimonials.indexOf(found);
  db.testimonials.splice(indexOfFoundElem, 1);
  res.json(result);
});

router.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

module.exports = router;
