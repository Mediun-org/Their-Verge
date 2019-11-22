var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const port = process.env.PORT || 3004;

var app = express();

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const CommentDB = require('../database/db.js');
const Article = CommentDB.Article;
const Author = CommentDB.Author;

app.get('/comments/:id', (req, res) => {
  var id = req.params.id;
  // console.log(id);
  CommentDB.selectById(Article, id, function(err, data) {
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public'));
});
app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});
