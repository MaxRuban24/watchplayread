require('dotenv').config()
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const noteSchema = new mongoose.Schema({
  name: String,
  author: String,
  date: Date,
  category: String,
  completed: Boolean
});

const Note = mongoose.model('Note', noteSchema);

app.post('/api/notes', (req, res) => {
  const note = new Note({
    name: req.body.name,
    author: req.body.author,
    date: new Date(),
    category: req.body.category,
    completed: req.body.completed
  });
  note.save((error) => {
    if (error) {
      return res.status(500).send(error);
    }
    return res.json(note);
  });
});

app.put('/api/notes/:id', (req, res) => {
  Note.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, note) => {
    if (error) {
      return res.status(500).send(error);
    }
    return res.json(note);
  });
});

app.get('/api/notes', (req, res) => {
  Note.find({}, (error, notes) => {
    if (error) {
      return res.status(500).send(error);
    }
    return res.json(notes);
  });
});

app.delete('/api/notes/:id', (req, res) => {
  Note.deleteOne({ _id: req.params.id }, (err, note) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(note);
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
