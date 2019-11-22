const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
const db = require('../data/db.js');
const Article = db.Article;
const Author = db.Author;

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/article/:id', (req, res) => {
  var id = req.params.id;
  console.log('the id in post is: ', id);
  var arr = [];
  db.selectAll(
    Article,
    (err, art) => {
      console.log('Hendd', art[0]);
      arr.push(art[0]);
      db.selectAll(
        Author,
        (err, author) => {
          arr.push(author[0]);
          db.selectAll(Article, (err, arts) => {
            arr.push(arts);
            // var result = arr.toJSON();
            // res.json(arr);
            console.log('this the arr in server: ', arr);
            res.status(202).send(arr);
          });
        },
        art[0].authorId
      );
    },
    id
  );
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public'));
});

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});
