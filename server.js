var express = require('express');
var request = require('request');
var path = require('path');
var http = require('http');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./data/db.js');
const Article = db.Article;
const Author = db.Author;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//@Signup
app.post('/signup', (req, res) => {
  const { name, email, password, imgUrl } = req.body;
  if (!name || !email || !password || !imgUrl) {
    return res.status(400).json({ msg: 'please enter all fileds!' });
  }
  Author.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: 'user already exists!' });

    const newUser = new Author({
      id: Date.now(),
      name,
      email,
      password,
      imgUrl
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { name: user.name },
            "it's_MySecret_ok",
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;

              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

//@Login
app.post('/signin', (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  Author.findOne({ email }, function(err, user) {
    if (!user) return res.status(400).json({ msg: 'User Does not exist' });
    console.log(user);
    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      jwt.sign(
        { name: user.name },
        "it's_MySecret_ok",
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          console.log(token);
          res.cookie('token', token);
          res.redirect('back');
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

//@logout

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('back');
});

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
  // console.log(id);
  db.selectById(Article, id, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      const comments = data[0].comments;
      const ids = [];

      comments.map(e => {
        ids.push(e.userId);
      });
      Author.find({
        id: {
          $in: ids
        }
      }).then(result => {
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
