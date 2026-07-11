async function controleerAppUpdates(){

    const antwoord = await fetch(
        "updates.json"
    );


    const updates = await antwoord.json();


    for(let artikel of updates){

        artikelOpslaan(artikel);

    }


    console.log(
        "Updates verwerkt"
    );

}