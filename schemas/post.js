const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  postsId: {
    type: Number,
    required: true,
    unique: true
  },
  category: {
    type: String
  },
  story: {
    type: String
  },
});

module.exports = mongoose.model("Post", postsSchema);