const annee=1994;

function bisextile(annee) {
    if ((annee % 4 === 0 && annee % 100 !== 0) || (annee % 400 === 0)) {
        return true;
    } else {
        return false;
    }
}
if (bisextile(annee)) {
    console.log(annee + " est une année bissextile.");
} else {
    console.log(annee + " n'est pas une année bissextile.");
}