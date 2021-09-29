const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const _ = require('lodash');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const todoName = [];
const items = [];
const lists = [];

app.get("/", function(req, res) {
  let day = date.getDate();
  let timeDay = date.getTimeDate();
  res.render("index", {lists: lists});
})

// app.post("/", function(req, res) {
//   let listName = req.body.items;
//   todoName.push(listName);
//   res.redirect("/");
// })

app.post("/create", function(req, res) {
  var todoListName = req.body.todoName;
  todoName.push(todoListName);
  const list = {
    listId: Date.now(),
    title: req.body.todoName,
    content: [],
    done: []
  }
  lists.push(list);
  res.redirect("/");
})

app.get("/list/:id", function(req, res) {
  let x = _.toNumber(req.params.id);
  lists.forEach(function(list) {
    let y = _.toNumber(list.listId);
    if (y === x) {
      res.render("list", {todoName: list.title, items: list.content, listId: list.listId, listDone: list.done})
    } else {
      console.log("link not found");
    }
  })
})

app.post("/list/:id", function(req, res) {
  let x = _.toNumber(req.params.id);
  let z = req.body.items
  lists.forEach(function(list) {
    let y = _.toNumber(list.listId);
    if (y === x) {
      list.content.push(z);
      res.redirect("/list/" + y);
    } else {
      console.log("error");
    }
  })
})

app.post("/delete/list/:id", function(req, res) {
  let x = _.toNumber(req.params.id);
  // method 1 using for loop
  // for (i = 0; i < lists.length; i++) {
  //   let y = _.toNumber(lists[i].listId);
  //   if (y === x) {
  //     lists.splice(i,1);
  //   }
  // }
  // method 2 using forEach function
  lists.forEach(function(list, index) {
    let y = _.toNumber(list.listId);
    if (y === x) {
      lists.splice(index, 1);
    }
  })
  console.log(lists);
  res.redirect("/");
})

app.post("/delete/item/:id", function(req, res) {
  let x = _.toNumber(req.params.id);
  let z = _.toString(req.body.listDone);
  console.log(z);
  lists.forEach(function(list) {
    let y = _.toNumber(list.listId);
    if (y === x) {
      list.done.forEach(function(done, index) {
        let v = _.toString(done);
        if (z === v) {
          list.done.splice(index, 1);
        }
      })
    }
  })
  res.redirect("/list/" + x)
})

app.get("/edit/:id", function(req, res) {
  let x = _.toNumber(req.params.id);
  lists.forEach(function(list) {
    let y = _.toNumber(list.listId);
    if (y === x) {
      res.render("edit", {listId: list.listId})
    }
  })
})

app.post("/edit/:id", function(req, res) {
  let x = _.toNumber(req.params.id);
  let z = req.body.rename
  lists.forEach(function(list) {
    let y = _.toNumber(list.listId);
    if (y === x) {
      list.title = z;
      console.log(z);
      console.log(x);
      console.log(list);
      res.redirect("/list/" + y);
    }
  })
})

app.post("/done/:id", function(req, res) {
  let x = _.toNumber(req.params.id);
  let z = req.body.checkItems;
  console.log(z);
  if (typeof z === "string") {
    lists.forEach(function(list) {
      let y = _.toNumber(list.listId)
      if (y === x) {
        list.done.push(z);
        list.content.splice(list.content.indexOf(z), 1);
      }
    })
  } else if (typeof z === "object") {
    lists.forEach(function(list) {
      let y = _.toNumber(list.listId);
      if (y === x) {
        z.forEach(function(eachZ) {
          let v = eachZ
          list.done.push(eachZ);
          list.content.forEach(function(content, index) {
            let w = content
            if (w === v) {
              list.content.splice(index, 1);
              console.log(list.done);
            }
          })
        })
      }
    })
  } else {
    console.log(error);
  }
  res.redirect("/list/" + x);
})


app.listen(3000, function() {
  console.log("server started and listening on port 3000");
})
