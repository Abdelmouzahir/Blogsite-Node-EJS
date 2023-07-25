//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require('lodash');

const homeStartingContent = "Welcome to our Daily Blog! 🌟 Discover a world of captivating stories, intriguing insights, and inspiring articles right at your fingertips. Our blog is your daily source of information and entertainment, covering a vast array of topics that cater to all interests. Immerse yourself in the latest trends in technology, where we explore groundbreaking innovations and discuss how they shape our future. Unleash your inner fashionista with our style guides and fashion tips that keep you ahead of the curve. Delve into the realm of health and wellness, as we share expert advice and practical tips to help you lead a balanced and fulfilling life.";
const aboutContent = "At our Daily Blog, we are passionate about delivering insightful and captivating articles to our readers. Our dedicated team of writers ensures that we cover a wide range of topics, from informative pieces to thought-provoking opinion articles. We believe in the power of knowledge and aim to provide valuable content that enriches your day. Join us on this incredible blogging adventure! #AboutUs #KnowledgeIsPower";
const contactContent = "Have a question, suggestion, or just want to say hello? We would love to hear from you! Reach out to us using the contact details below and our team will get back to you as soon as possible. Stay connected with our blog through our social media channels as well to stay updated with the latest happenings. We appreciate your feedback and look forward to connecting with you! #ContactUs #StayConnected";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/blogDB",{useNewUrlParser: true});

const postSchema ={
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);


app.get("/", function(req,res){
  Post.find({}, function(err, posts){
    res.render("home",{
     StartingContent: homeStartingContent,
     posts:posts
    });
  });
  
  
})


app.get("/about", function(req,res) {
  res.render("about", {aboutS:aboutContent});
});


app.get("/contact", function(req,res) {
  res.render("contact", {contactS:contactContent});
});

app.get("/compose", function(req,res){
  res.render("compose");
});



app.post("/compose", function(req,res){
  
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  }); 
  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});



app.get("/posts/:postId",function(req,res){
  
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err,post){
   
     res.render("post",{
        title: post.title,
       content: post.content
      });
   
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
