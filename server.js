
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

    if (inputErrors.length === 0) {
        connection.query("INSERT INTO COURSES(COURSE_CODE, COURSE_NAME, PROGRESSION, SYLLABUS) VALUES(?,?,?,?)", [newCode, newName, newProgression, newSyllabus], (err, result) => {
            if (err) {
                throw err;
            }
            console.table("Database inserts: " + result);
        });
        res.redirect("/");
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

