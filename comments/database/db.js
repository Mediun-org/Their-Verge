const mongoose = require('mongoose');
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
const selectAll = function(model, callback) {
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

module.exports.selectAll = selectAll;
module.exports.selectById = selectById;
module.exports.Article = Article;
module.exports.Author = Author;
