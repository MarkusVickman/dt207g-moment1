//Variable .env
require('dotenv').config({path: './.env'});

//Lägger till mysql och ansluter
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_ACC,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

//Lägger till expresserver och middleware: bodyparser för formulär
const express = require("express");
const bodyParser = require("body-parser");
//Inställningar för express
const app = express();
const port = 3000;

//Lägger till view engine, inställningar för statiska filer samt hur bodyparser ska hantera data.
app.set("view engine", "ejs");
app.use(express.static("public")); //Statiska filer
app.use(bodyParser.urlencoded({ extended: true }));

//Ger meddelande vid anslutning eller vid misslyckad.
connection.connect((err) => {
    if (err) {
        console.error("Connection failed big!: " + err);
       // throw err;
    }

    console.log("Connected to MySQL!");
});

//Skapar tabell i databasen och droppar förs om den redan finns    ANVÄNDS EJ
/*connection.query(`DROP TABLE IF EXISTS COURSES`);
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
    });*/

//Startsidans vy som läser in data från databasen och skickar med svaret.
app.get("/", (req, res) => {
    connection.query("SELECT * FROM COURSES;", (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        res.render("index", {
            error: "",
            rows: rows
        });
    });
});

//När vyn för lägg till kurs laddas rensas inputfält och felkoder
app.get("/course", (req, res) => {
    res.render("course", {
        inputErrors: "",
        newCode: "",
        newName: "",
        newProgression: "",
        newSyllabus: ""
    });
})

//När den här länken laddas tas valt id bort ut databasen och startsidan laddas om
app.get("/delete/:id", (req, res) => {
    let id = req.params.id;
    console.log(id);
    connection.query("DELETE FROM COURSES WHERE COURSE_ID=?;", id, (err) => {
        if (err) {
            console.error(err.message);
        }
        res.redirect("/");
    });
});

//Vy för kursformulär
app.post("/course", (req, res) => {
    //Formulärdata läses in till variabler och en array skapas för felkoder
    let newCode = req.body.code;
    let newName = req.body.name;
    let newProgression = req.body.progression;
    let newSyllabus = req.body.syllabus;
    let inputErrors = [];
    //Flera if satser för att välja vilka felmeddelanden som ska tar med
    if (newCode === "") {
        inputErrors.push("Fyll i kurskod.");
    }
    if (newCode.length > 10) {
        inputErrors.push("Kurskoden får vara max 10 tecken lång.");
    }
    if (newName === "") {
        inputErrors.push("Fyll i kursnamn.");
    }
    if (newName.length > 100) {
        inputErrors.push("Kursnamnet får vara max 100 tecken lång.");
    }
    if (newProgression === "") {
        inputErrors.push("Fyll i kursprogression.");
    }
    if (newProgression.length > 2) {
        inputErrors.push("Progression får vara max 2 tecken lång.");
    }
    if (newSyllabus === "") {
        inputErrors.push("Fyll i länk till kursplan.");
    }
    if (newSyllabus.length > 150) {
        inputErrors.push("Kurslänken får vara max 150 tecken lång.");
    }
    //Om fel inte finns skapas en nytt inlägg i databasen och startsidan laddas
    if (inputErrors.length === 0) {
        connection.query("INSERT INTO COURSES(COURSE_CODE, COURSE_NAME, PROGRESSION, SYLLABUS) VALUES(?,?,?,?)", [newCode, newName, newProgression, newSyllabus], (err, result) => {
            if (err) {
                throw err;
            }
            console.table("Database inserts: " + result);
        });
        res.redirect("/");
    } 
    //Om fel finns skrivs alla dessa ut på sidan
    else {
        res.render("course", {
            inputErrors: inputErrors,
            newCode: newCode,
            newName: newName,
            newProgression: newProgression,
            newSyllabus: newSyllabus
        });
    }
});

//Skapar vyn för om sidan
app.get("/about", (req, res) => {
    res.render("about");
});

//Consolmeddelande om servern startar.
app.listen(port, () => {
    console.log("Express servern har startat på port:" + port);
});