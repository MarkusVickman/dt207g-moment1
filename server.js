
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: ""
});

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

/*
connection.connect((err) =>{
    if(err){
        console.error("Connection failed big!: " + err);
        throw err;
    }
});*/

app.set("view engine", "ejs");
app.use(express.static("public")); //Statiska filer
app.use(bodyParser.urlencoded({extended: true}));

//route
app.get("/", (req, res) => {
    res.render("index");
});

//route
app.get("/course", (req, res) => {
    res.render("course");
});

/*app.post("/", (req, res) => {
    res.render("index");
});*/

//route
app.get("/about", (req, res) => {
    res.render("about");
});

//Starta
app.listen(port, () => {
    console.log("Express servern har startat på port:" + port);
});

