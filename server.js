const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./db')

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const result = {message:'OK'}

/*testmonials*/

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(
    db.testimonials.filter(item => item.id === parseInt(req.params.id))
  );
});

app.post('/testimonials', (req, res) => {
  const {author, text} = req.body;
  db.testimonials.push({
    id: uuidv4(),
    author,
    text,
  });
 res.json(result);
});

app.put('/testimonials/:id', (req, res) => {
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

app.delete('/testimonials/:id', (req, res) => {
  const found = db.testimonials.find(element => element.id === req.params.id);
  const indexOfFoundElem = db.testimonials.indexOf(found);
  db.testimonials.splice(indexOfFoundElem, 1);
  res.json(result);
});

/*concerts*/

app.get('/concerts', (req, res) => {
  res.json(db.concerts);
});
console.log(db.concerts);

app.get('/concerts/:id', (req, res) => {
  res.json(
    db.concerts.filter(item => item.id === parseInt(req.params.id))
  );
});

app.post('/concerts', (req, res) => {
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

app.put('/concerts/:id', (req, res) => {
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

app.delete('/concerts/:id', (req, res) => {
  const found = db.concerts.find(element => element.id === req.params.id);
  const indexOfFoundElem = db.concerts.indexOf(found);
  db.concerts.splice(indexOfFoundElem, 1);
  res.json(result);
});

/*seats*/

app.get('/seats', (req, res) => {
  res.json(db.seats);
});
console.log(db.seats);

app.get('/seats/:id', (req, res) => {
  res.json(
    db.seats.filter(item => item.id === parseInt(req.params.id))
  );
});

app.post('/seats', (req, res) => {
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

app.put('/seats/:id', (req, res) => {
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

app.delete('/seats/:id', (req, res) => {
  const found = db.seats.find(element => element.id === req.params.id);
  const indexOfFoundElem = db.seats.indexOf(found);
  db.seats.splice(indexOfFoundElem, 1);
  res.json(result);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
