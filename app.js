//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const myFunc = require("./myFunc.js");
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const _ = require("lodash");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Connect my database to my local database for now
mongoose.connect("'mongodb://localhost:27017/blogDB");

//create a new shcema
const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  blog: {
    type: String,
    required: true,
  },
});

//Create a new model using mongoose
const posts = new mongoose.model("posts", postSchema);
//Home page !!

app.get("/", function (req, res) {
  posts.find({}, function (err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render(__dirname + "/views/home.ejs", { Posts: blogs });
    }
  });
});

app.post("/", function (req, res) {
  const title = req.body.Title;
  const blogs = req.body.Blogs;

  const blog = new posts({
    name: title,
    blog: blogs,
  });
  blog.save();
  res.redirect("/");
});

//Posts rquireed
app.get("/post/:postName", function (req, res) {
  posts.find({}, function (err, Posts) {
    if (!err) {
      let Blogs = myFunc.obj.finds(req.params.postName, Posts);
      res.render("post.ejs", { Blogs: Blogs });
    }
  });
});

//about Page route !!
const about_articals = [aboutContent];
app.get("/about", function (req, res) {
  res.render("about.ejs", { about_articals: about_articals });
});

//contact Page route !!!
const contact_articals = [contactContent];

app.get("/contact", function (req, res) {
  res.render("contact.ejs", { contact_articals: contact_articals });
});

//Compose page route!!!
app.get("/compose", function (req, res) {
  res.render("compose.ejs");
});

//Dynamic server
var port = 3000 || process.env.PORT;
app.listen(port, function () {
  console.log("Server started on port 3000");
});
