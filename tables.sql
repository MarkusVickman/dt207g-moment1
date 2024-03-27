CREATE TABLE COURSES (
COURSE_ID           INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
COURSE_CODE         VARCHAR(10),
COURSE_NAME         VARCHAR(100),
PROGRESSION         VARCHAR(2),
SYLLABUS            VARCHAR(150));

--Data till COURSES

INSERT INTO COURSES (COURSE_CODE, COURSE_NAME, PROGRESSION, SYLLABUS) VALUES ('DT057G','Webbutveckling 1','A','https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT057G/');
INSERT INTO COURSES (COURSE_CODE, COURSE_NAME, PROGRESSION, SYLLABUS) VALUES ('DT084G','Introduktion till programmering i JavaScript','A','https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT084G/');
