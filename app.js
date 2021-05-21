//jshint: esverion6

const express = require("express");

const app = express();

const ejs = require("ejs");

const lodash = require("lodash");

app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.listen(process.env.PORT || "3000",()=>{
    console.log("Server Up and Running on Port 3000")
})

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non nunc leo. Suspendisse potenti. Sed aliquet suscipit erat vitae semper. Maecenas suscipit massa orci, sit amet vehicula augue interdum eget. Pellentesque et tortor quis metus porta bibendum. Praesent egestas dolor vel volutpat sollicitudin. ";

const aboutContent = "Fusce mollis accumsan ipsum, venenatis vulputate turpis semper non. Nullam hendrerit luctus egestas. Nulla consectetur, arcu in dictum placerat, leo leo tincidunt mauris, quis luctus massa tellus nec nibh. Phasellus id nisl mattis, tempus elit sed, pulvinar nunc. ";
 
const contactContent = "Aliquam erat volutpat. Integer in posuere tortor. Suspendisse a nunc ex. Mauris non tellus iaculis, porttitor arcu sed, gravida lacus. Nulla rhoncus non risus vitae ultricies.";

var posts = [];
app.get("/",(req,res)=>{
    res.render("home",{
        homeStartingContent:homeStartingContent,
        posts:posts
    }
    )
    
})
app.get("/about",(req,res)=>{
    res.render("about",{
        aboutContent:aboutContent,
    })
}
)
app.get("/contact",(req,res)=>{
    res.render("contact",{
        contactContent:contactContent,
    })
}
)
app.get("/compose",(req,res)=>{
    res.render("compose")
}
)
app.post("/compose",(req,res)=>{
    var post = {
        blogPost : req.body.newBlogPost,
        blogTitle : req.body.newBlogTitle
    }
    posts.push(post);
    res.redirect("/");
    })

app.get("/posts/:TITLE",function(req,res){
    var found = false;
    var title = "";
    var content = "";
    for(var i = 0; i < posts.length; i++) {
        if (lodash.lowerCase(posts[i].blogTitle) ==lodash.lowerCase(req.params.TITLE)) {
        found = true;
        title = posts[i].blogTitle;
        content = posts[i].blogPost;
        break;
    }
}
    if (found){
        res.render("blog",{
           title:title,
           content:content 
        });
    } 
    else{
        console.log("Uh oh...")
    }
    
})