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

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//-----------post----------------
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
  // console.log(id);
  db.selectById(Article, id, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      const comments = data[0].comments;
      const ids = [];

      comments.map((e) => {
        ids.push(e.userId);
      });
      Author.find({
        id: {
          $in: ids
        }
      }).then((result) => {
        // console.log(result);
        for (let i = 0; i < result.length; ++i) {
          comments[i]['name'] = result[i]['name'];
          comments[i]['imgUrl'] = result[i]['imgUrl'];
        }
        res.json(comments);
      });
    }
  });
});

app.post('/sendComment/:id', (req, res) => {
  var id = req.params.id;
  const comment = req.body;
  comment['userId'] = parseInt(comment['userId']);
  Article.update({ id: id }, { $push: { comments: comment } }).exec(function(
    err,
    result
  ) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(comment);
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
