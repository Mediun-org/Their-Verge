const mongoose = require('mongoose');
const faker = require('faker');
const fetch = require('node-fetch');

// const config = require("../config.js");
const uri =
  'mongodb+srv://hend:sleepyash@cluster0-ozydj.mongodb.net/TheVerge?retryWrites=true&w=majority';
// const uri = process.env.mongoURI || config.mongoURI;

// DB connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: 'TheVerge'
  })
  .catch((error) => console.log('this is error!', error));
const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});

// the Author schema
const authorSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String },
  password: { type: String },
  email: { type: String, unique: true },
  imgUrl: { type: String }
});

// the Article schema
const articleSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  authorId: { type: Number },
  title: { type: String },
  summary: { type: String },
  imgUrl: { type: String },
  body: { type: String },
  topic: { type: String },
  createdAt: { type: Date, default: Date.now },
  comments: { type: Array }
});

// creating the models
const Author = mongoose.model('Author', authorSchema);
const Article = mongoose.model('Article', articleSchema);

// get all model documents
const selectAllDocuments = function(model, callback) {
  model.find({}, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// get the document that matches the given id
const selectById = function(model, id, callback) {
  model.find({ id: id }, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// selectAll for articles
const selectAll = function(model, callback, id) {
  if (id) {
    // console.log("from data id: ", id);
    model.find({ id: id }, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        // console.log("the data is: ", result);
        callback(null, result);
      }
    });
  } else {
    model
      .find({}, (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      })
      .limit(5);
  }
};

// Unsplash Api for images
/*
  const imagesUrls = [];
  function getImagesFromUnsplashAPI(keyword) {
    let clientId =
      '53940e6af05754ad074705eeff5bbeb467126faf17a4d94d8499480d1ce46231';
    let url = `https://api.unsplash.com/search/photos/?client_id=${clientId}&per_page=25&query=${keyword}`;
    fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        data.results.map((element) => {
          imagesUrls.push(element.urls.regular);
        });
      });
  }
  getImagesFromUnsplashAPI('tech');
  getImagesFromUnsplashAPI('technology');
  getImagesFromUnsplashAPI('computer');
  getImagesFromUnsplashAPI('mobile');
*/

/*
  function generateRandomComments() {
    const commentsArray = [];
    let commentItem = {};
    for (let i = 1; i < Math.random() * 5 + 1; ++i) {
      commentItem['id'] = i;
      commentItem['userId'] = Math.floor(Math.random() * 100 + 1); // logged in user so we can get their photo and name using this id
      commentItem['text'] = faker.lorem.sentence();
      commentItem['date'] = faker.date.between('2019-10-31', '2019-11-22');
      commentsArray.push(commentItem);
      commentItem = {};
    }
    return commentsArray;
  }
*/

/****** Save to Database ******/

// const saveArticles = function() {
//   for (let i = 1; i <= 100; i += 1) {
//     const art = new Article({
//       id: i,
//       authorId: Math.floor(Math.random() * 100 + 1),
//       title: faker.company.companyName(),
//       summary: faker.hacker.phrase(),
//       imgUrl: imagesUrls[i],
//       body: faker.lorem.paragraphs(
//         (paragraph_count = Math.floor(Math.random() * 14 + 8))
//       ),
//       topic: faker.hacker.noun(),
//       createdAt: faker.date.past(),
//       comments: generateRandomComments()
//     });
//     // console.log(art);
//     art.save();
//   }
//   console.log('ALL WAS ADDED');
// };

// setTimeout(function() {
//   saveArticles();
// }, 5000);

// const saveAuthor = function() {
//   for (let i = 1; i <= 100; i += 1) {
//     const author = new Author({
//       id: i,
//       name: faker.name.findName(),
//       password: faker.internet.password(),
//       email: faker.internet.email(),
//       imgUrl: faker.internet.avatar()
//     });
//     author.save();
//   }
//   console.log('ALL WAS ADDED');
// };

// saveAuthor();

module.exports.selectAll = selectAll;
module.exports.selectAllDocuments = selectAllDocuments;
module.exports.selectById = selectById;
module.exports.Author = Author;
module.exports.Article = Article;
