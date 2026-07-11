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

openDatabase()
.then(()=>{

console.log("Database gestart");

laadWetData();

});

const zoekveld = document.getElementById("zoekveld");


zoekveld.addEventListener(
"input",
function(){

let zoekterm = zoekveld.value;


if(zoekterm.length < 2){

return;

}


zoekArtikelen(zoekterm)
.then(resultaten=>{


let html = "";


resultaten.forEach(artikel=>{


html += `

<h3>
${artikel.wet}
- Artikel ${artikel.nummer}
</h3>

<strong>
${artikel.titel}
</strong>

<p>
${artikel.tekst}
</p>

<hr>

`;

});


document.getElementById("resultaat").innerHTML = html;


});


});

function toonArtikel(artikel){

let resultaat=document.getElementById("resultaat");


resultaat.innerHTML=`

<h2>
${artikel.wet}
</h2>

<h3>
Artikel ${artikel.nummer}
</h3>

<h4>
${artikel.titel}
</h4>

<p>
${artikel.tekst}
</p>


<button onclick='voegFavorietToe(${JSON.stringify(artikel)})'>
⭐ Favoriet
</button>


<textarea id="notitie"
placeholder="Eigen notitie...">
</textarea>


<button onclick="bewaarNotitie('${artikel.id}')">
📝 Notitie opslaan
</button>

`;

}

function bewaarNotitie(id){

let tekst=document.getElementById("notitie").value;

slaNotitieOp(id,tekst);

alert("Notitie opgeslagen");

}

function toonHome(){

document.getElementById("resultaat").innerHTML=`

<h2>⚖️ WettenNL Pro</h2>

<p>
Kies een wetboek of zoek een artikel.
</p>

`;

}



function toonZoeken(){

document.getElementById("resultaat").innerHTML=`

<h2>🔍 Zoeken</h2>

<p>
Gebruik de zoekbalk bovenaan.
</p>

`;

}



function toonFavorieten(){

let transactie=db.transaction(
["favorieten"],
"readonly"
);

let store=transactie.objectStore("favorieten");

let verzoek=store.getAll();


verzoek.onsuccess=function(){

let html="<h2>⭐ Favorieten</h2>";

verzoek.result.forEach(a=>{

html+=`

<h3>
${a.wet} artikel ${a.nummer}
</h3>

<p>${a.titel}</p>

`;

});


document.getElementById("resultaat").innerHTML=html;

};

}



function toonNotities(){

document.getElementById("resultaat").innerHTML=`

<h2>📝 Notities</h2>

<p>
Hier komen opgeslagen notities.
</p>

`;

}
function toonWetboek(code){

    let transactie = db.transaction(
        ["artikelen"],
        "readonly"
    );

    let store = transactie.objectStore("artikelen");

    let verzoek = store.getAll();


    verzoek.onsuccess = function(){

        let artikelen = verzoek.result.filter(
            artikel => artikel.code === code
        );


        let html = `
        <button onclick="toonHome()">
        ← Terug
        </button>

        <h2>${artikelen[0]?.wet || "Wetboek"}</h2>

        <input 
        id="wetZoek"
        placeholder="Zoek binnen deze wet..."
        >

        <hr>
        `;


        artikelen.forEach(artikel=>{

            html += `

            <div onclick='toonArtikel(${JSON.stringify(artikel)})'>

            <h3>
            Artikel ${artikel.nummer}
            </h3>

            <strong>
            ${artikel.titel}
            </strong>

            <p>
            ${artikel.tekst.substring(0,120)}...
            </p>

            </div>

            <hr>

            `;

        });


        document.getElementById("resultaat").innerHTML = html;

    };

}

window.addEventListener(
"online",
()=>{

    controleerAppUpdates();

});