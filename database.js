let db;


function openDatabase(){

return new Promise((resolve,reject)=>{

let request=indexedDB.open(
"WettenNLDatabase",
1
);


request.onupgradeneeded=function(event){

db=event.target.result;


if(!db.objectStoreNames.contains("artikelen")){

db.createObjectStore(
"artikelen",
{
keyPath:"id"
}
);

}


if(!db.objectStoreNames.contains("favorieten")){

db.createObjectStore(
"favorieten",
{
keyPath:"id"
}
);

}


if(!db.objectStoreNames.contains("notities")){

db.createObjectStore(
"notities",
{
keyPath:"id"
}
);

}

};


if(!db.objectStoreNames.contains("artikelen")){

db.createObjectStore(
"artikelen",
{
keyPath:"id"
}
);

}

};


request.onsuccess=function(event){

db=event.target.result;
resolve(db);

};


request.onerror=function(){

reject("Database fout");

};


});

}



function artikelOpslaan(artikel){

let transactie=db.transaction(
["artikelen"],
"readwrite"
);

let store=transactie.objectStore("artikelen");

store.put(artikel);

}



function alleArtikelen(){

return new Promise((resolve)=>{

let transactie=db.transaction(
["artikelen"],
"readonly"
);

let store=transactie.objectStore("artikelen");

let request=store.getAll();


request.onsuccess=function(){

resolve(request.result);

};


});

}

function zoekArtikelen(zoekterm){

    return new Promise((resolve)=>{

        let transactie = db.transaction(
            ["artikelen"],
            "readonly"
        );

        let store = transactie.objectStore("artikelen");

        let verzoek = store.getAll();

        verzoek.onsuccess = function(){

            let artikelen = verzoek.result;

            zoekterm = zoekterm.toLowerCase();

            let resultaten = artikelen.filter((artikel)=>{

                return (
                    artikel.nummer.toLowerCase().includes(zoekterm) ||
                    artikel.titel.toLowerCase().includes(zoekterm) ||
                    artikel.tekst.toLowerCase().includes(zoekterm) ||
                    artikel.wet.toLowerCase().includes(zoekterm)
                );

            });

            resolve(resultaten);

        };

    });

}