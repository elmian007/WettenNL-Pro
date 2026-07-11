const wetten = {

Sr:[
{
artikel:"300",
titel:"Mishandeling",
tekst:"Hij die opzettelijk iemand mishandelt..."
},
{
artikel:"310",
titel:"Diefstal",
tekst:"Hij die enig goed dat geheel of ten dele aan een ander toebehoort..."
}
],

Sv:[],
WVW:[],
RVV:[],
WWM:[],
Opium:[],
Awb:[]

};


function openWet(wet){

const resultaat=document.getElementById("resultaat");

const artikelen=wetten[wet];

if(artikelen.length===0){

resultaat.innerHTML="<p>Nog geen artikelen geladen.</p>";

return;

}

let html="";

artikelen.forEach(a=>{

html+=`

<h3>Artikel ${a.artikel}</h3>

<strong>${a.titel}</strong>

<p>${a.tekst}</p>

<hr>

`;

});

resultaat.innerHTML=html;

}
if ("serviceWorker" in navigator){

navigator.serviceWorker.register("service-worker.js")
.then(()=>{

console.log("WettenNL Pro offline actief");

});

}
openDatabase()
.then(()=>{

console.log("Lokale database actief");

});