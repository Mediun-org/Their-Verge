const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose = require("mongoose");
const faker = require("faker");
const config = require("../config.js");
// const uri = 'mongodb+srv://hend:sleepyash@cluster0-ozydj.mongodb.net/TheVerge?retryWrites=true&w=majority';

const uri = process.env.mongoURI || config.mongoURI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: "TheVerge"
  })
  .catch(error => console.log("this is error!", error));

const { connection } = mongoose;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});

//--------------Auther db schema-----------
const autherSchema = mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String },
    password: { type: String }
  });
const Auther = mongoose.model("Auther", autherSchema);


//--------------Article db schema-------------
const ArticleSchema = Schema({
    auth_id: {type: String, required: true},
    title: {type: String, required: true},
    sammary: {type: String, required: true},
    img_url: {type: String},
    body: {type: String, required: true},
    topic: {type: String, required: true},
    date: {type: Date}
})
const Article = mongoose.model('Article', ArticleSchema);

//------------------Next topics db schema------------
const NextTopic = Schema({
    title: {type: String,require: true},
    title_url: {type: String, require: true}
})
const Topic = mongoose.model('Topic', NextTopic);


//------------------Deal db schema------------
var dealSchema = mongoose.Schema({
    img_url: {type: String, trim:true, unique: true},
    title: {type: String, trim:true, unique: true}
});
var Deal = mongoose.model('Deal', dealSchema);


//------------------CommentModel db schema------------
const commentSchema = Schema({
	postId: {type: String},
    profilePic:{type: String},
    autherName: {type: String},
    createdAt: {type: String},
    body:{type: String}
});
const CommentModel = mongoose.model('CommentModel', commentSchema);


module.exports.RecomModel = RecomModel;
module.exports.CommentModel = CommentModel;  
module.exports.Deal=Deal;
module.exports.Auther = Auther;
module.exports.Article = Article;
module.exports.Topic = Topic;