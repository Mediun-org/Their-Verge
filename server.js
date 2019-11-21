var express = require('express');
var request = require('request');
var path = require('path');
var http = require('http');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = require('./data/db.js');
const Article = db.Article;
const Author = db.Author;

//----------post----------------
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

//---------------Comments----------------
app.get('/comments/:id', (req, res) => {
  var id = req.params.id;
  CommentDB.selectById(CommentDB.Article, id, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

//--------------------------------------
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
