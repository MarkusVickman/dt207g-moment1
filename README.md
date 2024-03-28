# Moment 1 i kursen DT007G, Backend-baserad webbutveckling

Webbplatsen är en uppgift i kursen DT207G - Backend-baserad webbutveckling. Webbplatsen kan spara in kurser som man har läst för att använda till ett digitalt CV eller kanske ännu bättre för att lagra intressanta kurser som användaren vill läsa. 
Webbplatsen hostat här på Render och lagrar formulär-data i en remote mariaDB-databas. Varje gång startsidan laddas så listas alla kurser från databasen upp. Det går att individuellt ta bort kurser från listan. 
Databasen CV innehåller enbart en tabell där data lagras individuellt för id, kurskod, kursnamn, länk till kurskod och kursprogression. Databasen byggdes upp efter ett följande ER-diagram:

![Er-diagram](https://github.com/MarkusVickman/dt207g-moment1/blob/main/public/img/er.png)

## Node.js
Webbplatsen är en Node.js projekt. Med hjälp av chromiums V8 JavaScript-motor gör node.js så att JavaScript-kod kan köras på servern. Paketet Express användes för den serverbaserade utvecklingen. Till node.js projektet använder jag följande dependencies:

* Server: Express
* Middleware: bodyParser
* Databas: mySQL
* Vyhanterare: ejs
* Dölja variabler: dotenv

## Databas
Som databas-tillägg till node.js och Expresservern användes mySQL istället för det officiella mariaDB tillägget. Detta för att jag valde att byta host för min databas till HelioHost i sista sekund. HelioHost använder mariaDB istället för mySQL. Eftersom mariaDB och mySQL är kompatibla med varandra valde jag att inte byta till mariaDB node.js paket. Ändringen till en remote databas krävde att jag dolde informationen om anslutningen och inte commitade dem till GitHub där webbplatsen är versionshanterad. Därför används tillägget dotenv för att komma åt "environmental variables".
Databasen skapades i HelioHost grafiska interface. För att skapa tabeller anslöt jag till min databas via terminalen och skrev följande SQL-kod:

CREATE TABLE COURSES (
COURSE_ID           INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
COURSE_CODE         VARCHAR(10),
COURSE_NAME         VARCHAR(100),
PROGRESSION         VARCHAR(2),
SYLLABUS            VARCHAR(150));

Vid nytt inlägg i tabellen körs koden:
"INSERT INTO COURSES(COURSE_CODE, COURSE_NAME, PROGRESSION, SYLLABUS) VALUES(?,?,?,?)"

Vid bortagning av inlägg i tabellen körs koden:
"DELETE FROM COURSES WHERE COURSE_ID=?;"

# Slutsatser
Uppgiften har gett mig större förståelse för Backend-baserad webbutveckling. Jag har fortfarande många frågetecken gällande metoder och inställningar av Expresservern. Utvecklingen av att hämta och lagra data var enklare i denna Backend-baserade lösning än en liknande lösning jag skapade i TypeScriptkursen(Frontend). 
Jag ser stora fördelar med Backend-baserad webbutveckling då vi får mer kontroll över säkerkerhet och kan styra webbplatsen på ett bättre sätt. Det var också väldigt smidigt att jobba mot en mariaDB-databas. 

## Markus Vickman
Jag läser till en högskoleexamen i datateknik med inriktning webbutveckling på mittuniversitet.

### Student ID: mavi2302
