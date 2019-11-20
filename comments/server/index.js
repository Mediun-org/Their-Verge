var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const port = process.env.PORT || 3004;

var app = express();

app.use(express.static(path.join(__dirname + '/../public')));
app.use(bodyParser.urlencoded({ extended: true }));
const CommentDB = require('../database/db.js');

// app.get('/comments/:id', (req, res) => {
//   var id = req.params.id;
//   // console.log(id);
//   CommentDB.selectById(CommentDB.Article, id, function(err, data) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//       res.json(data);
//     }
//   });
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../public'));
});
app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});
