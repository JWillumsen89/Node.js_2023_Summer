"use strict";

// totalGlobalVariable = "Never do this!!"
var globalVariable = "Also never do this !!";
//Var is only for legacy systems. Use const and let
console.log(globalVariable);

//Cant do this
//const isThisConstant;

//And cant do this.
//const isThisConstant = 123;
//isThisConstant = 456;


//Var is a global variable

//const you cant re declare it, but you and an change values in objects or arrays.
//let in same scope as const, but you can redeclare, and declare without instantiate.
const isThisConstant = [];
isThisConstant.push(1, 2, 3);

console.log(isThisConstant)

const isThisAlsoConstant = {};
isThisAlsoConstant.name = "Jonathan";

console.log(isThisAlsoConstant)

function anotherScope() {
  //function scope
}

{
  //block scope
}

/*
Call Stack (Kaldsstak)
En "Call Stack" eller "kaldsstak" er en datastruktur, der hjælper med at holde styr på funktioner, der bliver kaldt i et program. Når en funktion bliver kaldt, bliver den tilføjet til toppen af stakken. Når funktionen er færdig med at køre, bliver den fjernet fra stakken igen.

For eksempel, hvis du har en funktion A() der kalder en anden funktion B(), og B() kalder endnu en funktion C(), vil kaldsstakken se sådan ud:

Først er A() tilføjet til kaldsstakken.
A() kalder B(), så B() tilføjes oven på A() i stakken.
B() kalder C(), så C() tilføjes oven på B().
Kaldsstakken vil så se ud som: [A, B, C]

I Node.js bruges kaldsstakken til at styre asynkron opførsel og event-loopet. Dette er særligt vigtigt, fordi Node.js er designet til at håndtere mange operationer samtidigt uden at blokere programmet.

Executable Context (Udførlig kontekst)
"Executable Context" eller "udførlig kontekst" refererer til det miljø, hvor JavaScript-kode kører. Det inkluderer variabler, funktioner og andre oplysninger, der er tilgængelige i det aktuelle scope. I Node.js kan man have flere forskellige udførlige kontekster, f.eks. global kontekst, funktionens kontekst, osv.

Når en ny funktion bliver kaldt, skaber den en ny udførlig kontekst, som indeholder information om dens egne lokale variabler samt referencer til variabler fra forældrekontekster. Denne mekanisme gør det muligt at have lukninger og andre avancerede programmeringsmønstre i Node.js.

Sammenhæng i Node.js
I Node.js spiller begge disse koncepter en stor rolle. Kaldsstakken bruges til at håndtere asynkrone operationer og sikre, at den rigtige funktion kører på det rigtige tidspunkt. Udførlige kontekster sørger for, at hver funktion har adgang til de nødvendige variabler og ressourcer for at kunne udføre sin opgave.

Ved at forstå disse to koncepter kan du blive bedre til at forstå, hvordan Node.js programmer kører, og hvordan du kan debugge dem effektivt.
*/
{
  console.log("Hello im in a block scope");
}

{
  let someVariable = true;

  {
    let someVariable = false;
  }

  console.log(someVariable);
}

/*
for (var i = 0; i <= 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
*/

for (let i = 0; i <= 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
