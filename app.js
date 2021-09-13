const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var items = [];
var todoName = [];

var today = new Date();

var options = {
  weekday: "long",
  day: "numeric",
  month: "short",
  year: "2-digit"
}

var day = today.toLocaleDateString("en-AU", options);

app.get("/", function(req, res) {
  res.render("index", {todoName: todoName, listTitle: day});
})

app.post("/", function(req, res) {

  var listName = req.body.items;

  if (req.body.list === "Work") {
    items.push(listName);
    res.redirect("/work");
  }
  else {
    todoName.push(listName);
    res.redirect("/");
  }

})

app.get("/random.txt", function(req, res) {


  // for (i = 0; i < todoName.length; i++) {
  //   document.querySelectorAll("li").addEventListener("click", function() {
  //     var aClicked = this.innerText
  //     console.log(aClicked);
  //   })
  // }

  res.render("index", {listTitle: "Work", todoName: items});
})
//
// app.post("/work", function(req, res) {
//   var newTodo = req.body.newTodo;
//   items.push(newTodo)
//   res.redirect("/work");
// })

app.listen(3000, function() {
  console.log("server started and listening on port 3000");
})
