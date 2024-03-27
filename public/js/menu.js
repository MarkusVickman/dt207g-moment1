//Kod för utfällning av huvudmenyn när webbplatsen visas i mobilläge.

"use strict"

//Deklarerar knappar för öppna och stäng.
let close = document.getElementById("btn-close");
let open = document.getElementById("btn-open");

//Deklarerar huvudmenyn för att kunna tilldela stil
let mainNav = document.getElementById("main-nav");

//Eventlistener som vid klick initierar en funktion som lägger till style-attributet none för att dölja menyn.
close.addEventListener("click", function (e){
    mainNav.style.display = "none";
})

//Eventlistener som vid klick initierar en funktion som lägger till style-attributet block för att visa menyn.
open.addEventListener("click", function (e) {
    mainNav.style.display = "block";
})

//Funktion som tar bort som säkerställer korrektvisning vid ändrad skärmstorlek
window.addEventListener('resize', function (e) {
    if (window.innerWidth > 700) {
        mainNav.style.display = "block";
    }
    else if (window.innerWidth < 700) {
        mainNav.style.display = "none";
    }
} )