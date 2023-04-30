const express = require("express");
const { connection } = require("./db");
const app = express();
const jwt = require("jsonwebtoken");
const { auth } = require("./middleware/auth.middleware");
const { userRouter } = require("./routes/User.routes");
const { noteRouter } = require("./routes/note.routes");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
//open routes
app.use("/users", userRouter);

// Routes to be protected
app.use(auth);
app.use("/notes", noteRouter);
app.get("/movies", (req, res) => {
  res.status(200).send("MovieData");
});
app.get("/series", (req, res) => {
  res.status(200).send("Seriespage");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
    console.log("cannot connect to db");
  }
  console.log(`server running on port ${process.env.PORT}`);
});
