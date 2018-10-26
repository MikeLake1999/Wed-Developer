var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine","ejs");

app.set("views", "./views");
app.listen("8181");
// Console.log("Server is start in port 8080......................");
console.log("Server in start in port 8080..........");

app.get("/", function(req,res){
    res.render("homepage");
})