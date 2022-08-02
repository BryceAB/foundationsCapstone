const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const {
  seedDB,
  getPosts,
  makePost,
  changePost,
  deletePost,
} = require("./controller");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/css", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.css"));
});

app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.js"));
});

app.get("/seed", seedDB);

app.get("/posts", getPosts);
app.post("/posts", makePost);
app.put("/posts/:id", changePost);
app.delete("/posts/:id", deletePost);

const port = process.env.PORT || 4005;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
