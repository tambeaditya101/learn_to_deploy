const express = require("express");
const { NoteModel } = require("../models/note.model");
const noteRouter = express.Router();

noteRouter.post("/create", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "New note has been added" });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});
noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({ authorId: req.body.authorId });
    res.status(200).send(notes);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});
noteRouter.patch("/update/:noteid", async (req, res) => {
  const { noteid } = req.params;
  const note = await NoteModel.findOne({ _id: noteid });
  try {
    if (req.body.authorId !== note.authorId) {
      res
        .status(200)
        .send({ msg: `You are not authorized to perform this action` });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: noteid }, req.body);
      res
        .status(200)
        .send({ msg: `The note with id ${noteid} has been updated` });
    }
  } catch (error) {
    res.status(400).send({ err: err.message });
  }
});
noteRouter.delete("/delete/:noteid", async (req, res) => {
  const { noteid } = req.params;
  const note = await NoteModel.findOne({ _id: noteid });

  try {
    if (req.body.authorId !== note.authorId) {
      res
        .status(200)
        .send({ msg: `You are not authorized to perform this action` });
    } else {
      await NoteModel.findByIdAndDelete({ _id: noteid });
      res.status(200).json({
        msg: `The note with id ${noteid} has been deleted sucessfully`,
      });
    }
  } catch (error) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = { noteRouter };

// 644c2c8b102382a1654f63c7
