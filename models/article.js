const { Schema, model } = require("mongoose");

const article = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
//   created_at: {
//     tipe: Date,
//     required: true
//   },
//   update_at: {
//     tipe: Date,
//     required: true
//   }
});

module.exports = model("Article", article);
