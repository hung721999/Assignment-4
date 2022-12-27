const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
let users = [];

// config to use dynamic html with ejs
app.set("engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}));

app.get("/user", (req, res, next) => {
  res.render("user.ejs", { pageTitle: "User", path: "/user", users: users });
});

app.get("/", (req, res, next) => {
  res.render("home.ejs", { pageTitle: "Home", path: "/" });
});

app.post("/user", (req, res) => {
  users.push({ username: req.body.username });
  res.redirect("/user");
});

app.use((req, res, next) => {
  res.render("404.ejs", { pageTitle: "Page Not Found", path: "" });
});

app.listen(3000, () => {
  console.log(`Server is listening on port 3000.`);
});
