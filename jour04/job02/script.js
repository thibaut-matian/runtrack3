function jsonValueKey(jsonString, key){
    const objet = JSON.parse(jsonString);
    return objet[key];
}

const maStringJSON = `{
    "name": "La Plateforme_",
    "address": "8 rue d'hozier",
    "city": "Marseille",
    "nb_staff": "11",
    "creation": "2019"
}`;

const maCle = "city";

const resultat = jsonValueKey(maStringJSON, maCle);

console.log(resultat); 