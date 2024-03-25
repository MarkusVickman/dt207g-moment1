

const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public")); //Statiska filer

//route
app.get("/", (req, res) => {
    res.render("index");
});

//route
app.get("/", (req, res) => {
    res.render("course");
});

//route
app.get("/", (req, res) => {
    res.render("about");
});

//Starta
app.listen(port, () => {
    console.log("Express servern har startat på port:" + port);
});