async function laadWetData(){

    const antwoord = await fetch("data/wetten.json");

    const gegevens = await antwoord.json();

    for(const wet of gegevens.wetten){

        for(const artikel of wet.artikelen){

            const record = {
                id: wet.code + "-" + artikel.nummer,
                wet: wet.naam,
                code: wet.code,
                nummer: artikel.nummer,
                titel: artikel.titel,
                tekst: artikel.tekst
            };

            artikelOpslaan(record);
        }
    }

    console.log("Wetgegevens geladen");

}