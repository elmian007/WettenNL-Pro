async function laadWetData(){

const antwoord = await fetch(
"data/wetten.json"
);

const gegevens = await antwoord.json();


for(const wet of gegevens.wetten){


for(const onderdeel of wet.onderdelen){


for(const artikel of onderdeel.artikelen){


const record={

id:
wet.code+"-"+artikel.nummer,

wet:
wet.naam,

code:
wet.code,

hoofdstuk:
onderdeel.naam,

nummer:
artikel.nummer,

titel:
artikel.titel,

tekst:
artikel.tekst

};


if(record.nummer){

    artikelOpslaan(record);

}


}

}

}


console.log(
"Wetgeving geïmporteerd"
);

}