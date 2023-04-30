const mongoose = require("mongoose");
const noteSchema = mongoose.Schema(
  {
    title: String,
    category: String,
    author: String,
    authorId: String,
  },
  {
    versionKey: false,
  }
);

const NoteModel = mongoose.model("note", noteSchema);

module.exports = { NoteModel };
