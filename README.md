# Moment 1 i kursen DT007G, Backend-baserad webbutveckling

Webbplatsen är en uppgift i kursen DT207G - Backend-baserad webbutveckling. Webbplatsen kan spara in kurser som man har läst för att använda till ett digitalt CV eller kanske ännu bättre för att lagra intressanta kurser som användaren vill läsa. 
Webbplatsen hostat här på Render och lagrar formulär-data i en remote mariaDB-databas. Varje gång startsidan laddas så listas alla kurser från databasen upp. Det går att individuellt ta bort kurser från listan. 
Databasen CV innehåller enbart en tabell där data lagras individuellt för id, kurskod, kursnamn, länk till kurskod och kursprogression. Databasen byggdes upp efter ett följande ER-diagram:

![Er-diagram](https://github.com/MarkusVickman/dt207g-moment1/blob/main/public/img/er.png)

### I den här uppgiften har jag programmerat lösningar i TypeScript som:
* Läsa in kursinformation från input-fält
* Lagra och läsa upp från localstorage
* Uppdatera inlägg 
* Transpilera TypeScript till JavaScript med Parcel

### Webbplatsen
På den här webbplatsen kan du lagra kurser du har avslutat eller varför inte lista upp kurser som du har tänkt att studera. Fyll i kurskod, kursnamn, URL till kursplanen och om det är en A, B eller C kurs.

## Markus Vickman
Jag läser till en högskoleexamen i datateknik med inriktning webbutveckling på mittuniversitet.

### Student ID: mavi2302
