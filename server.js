
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: ""
});


const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
/*
connection.connect((err) =>{
    if(err){
        console.error("Connection failed big!: " + err);
        throw err;
    }
});*/

app.set("view engine", "ejs");
app.use(express.static("public")); //Statiska filer
app.use(bodyParser.urlencoded({ extended: true }));

//route
app.get("/", (req, res) => {
    res.render("index");
});

//route
app.get("/course", (req, res) => {
    res.render("course", {
        inputErrors: "",
        newCode: "",
        newName: "",
        newProgression: "",
        newSyllabus: ""
    });
})

app.post("/course", (req, res) => {
    //Formulärdata
    let newCode = req.body.code;
    let newName = req.body.name;
    let newProgression = req.body.progression;
    let newSyllabus = req.body.syllabus;
    let inputErrors = [];


    if (newCode === "") {
        inputErrors.push("Fyll i kurskod.");
    }
    if (newName === "") {
        inputErrors.push("Fyll i kursnamn.");
    }
    if (newProgression === "") {
        inputErrors.push("Fyll i kursprogression.");
    }
    if (newSyllabus === "") {
        inputErrors.push("Fyll i länk till kursplan.");
    }

    if (inputErrors.length === 0) {
        res.render("index");
    }

    res.render("course", {
        inputErrors: inputErrors,
        newCode: newCode,
        newName: newName,
        newProgression: newProgression,
        newSyllabus: newSyllabus
    });
});

//route
app.get("/about", (req, res) => {
    res.render("about");
});

//Starta
app.listen(port, () => {
    console.log("Express servern har startat på port:" + port);
});

