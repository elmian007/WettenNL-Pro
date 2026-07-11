async function controleerUpdates(){

if(!navigator.onLine){

alert(
"Geen internetverbinding"
);

return;

}


try{


const antwoord = await fetch(
"updates.json"
);


const updates = await antwoord.json();


for(let artikel of updates){

artikelOpslaan(artikel);

}


alert(
"Updates verwerkt"
);


}catch(e){


alert(
"Geen nieuwe updates gevonden"
);


}

}