const fs = require("fs");


function maakArtikel(
    wet,
    code,
    nummer,
    titel,
    tekst
){

return {

id: code + "-" + nummer,

code: code,

wet: wet,

nummer: nummer,

titel: titel,

tekst: tekst

};

}



function opslaan(artikelen){

fs.writeFileSync(

"verwerkt/wetten.json",

JSON.stringify(
{
artikelen: artikelen
},
null,
2)

);

}


console.log(
"Importer klaar"
);