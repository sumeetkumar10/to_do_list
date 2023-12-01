const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "static")));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let posts = require("./posts/postsHandle.js");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/getpost", async (req, res) => {
  let data = await posts.getpost();
  res.send(data);
});

app.post("/addpost", async (req, res) => {
  let { newPost } = req.body;
  await posts.addpost(newPost);
  res.redirect("/");
});

app.post("/updatepost", async (req, res) => {
  const { taskId, updatedTask } = req.body;
  await posts.updatepost(taskId, updatedTask);
  res.redirect("/");
});

app.post("/deletepost", async (req, res) => {
  const { taskId } = req.body;
  await posts.deletepost(taskId);
  res.redirect("/");
});

app.listen(1111, () => {
  console.log("Server has started!");
});
