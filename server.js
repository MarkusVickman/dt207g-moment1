
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "dt207g-m1",
    password: "moment1",
    database: "dt207g-m1"
});


const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

connection.connect((err) => {
    if (err) {
        console.error("Connection failed big!: " + err);
        throw err;
    }

    console.log("Connected to MySQL!");
});

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

connection.query(`DROP TABLE IF EXISTS COURSES`);
connection.query(`CREATE TABLE COURSES (
    COURSE_ID           INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    COURSE_CODE         VARCHAR(10),
    COURSE_NAME         VARCHAR(100),
    PROGRESSION         VARCHAR(2),
    SYLLABUS            VARCHAR(150));`, (err, result) => {
    if (err) {
        throw err;
    }

    console.table("Database tables: " + result);
    });

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
        connection.query(`INSERT INTO COURSES (COURSE_CODE, COURSE_NAME, PROGRESSION, SYLLABUS) VALUES ('DT057G','Webbutveckling 1','A','https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT057G/');
        INSERT INTO COURSES (COURSE_CODE, COURSE_NAME, PROGRESSION, SYLLABUS) VALUES ('DT084G','Introduktion till programmering i JavaScript','A','https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT084G/');`, (err, result) => {
            if (err) {
                throw err;
            }
        
            console.table("Database inserts: " + result);
        });
        res.render("index");
    } else {
        res.render("course", {
            inputErrors: inputErrors,
            newCode: newCode,
            newName: newName,
            newProgression: newProgression,
            newSyllabus: newSyllabus
        });
    }
});

//route
app.get("/about", (req, res) => {
    res.render("about");
});

//Starta
app.listen(port, () => {
    console.log("Express servern har startat på port:" + port);
});

