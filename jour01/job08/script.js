

function estPremier(nombre){
    if ( nombre <= 1){
        return false; 
    }

    for (let i = 2; i < nombre; i++){
        if (nombre % i === 0){
            return false; 
        }
    }
    return true; 
}

function sommesNombresPremiers(a,b){
    if (estPremier(a) && estPremier(b)){
        return a + b;
    } else {
        return false; 
    }
}

console.log(sommesNombresPremiers(2, 3))
