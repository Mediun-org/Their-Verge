var mongoose = require("mongoose");

const RecomSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  sammary: {
    type: String,
    required: true
  },
  img_url: {
    type: String
  },
  body: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("articles", RecomSchema);
