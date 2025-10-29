

function fizzbuzz() {
    for (let chiffre = 1; chiffre <= 151; chiffre++) {
        if (chiffre % 3 === 0 && chiffre % 5 === 0) {
            console.log("FizzBuzz");
        } else if (chiffre % 3 === 0) {
            console.log("Fizz");
        } else if (chiffre % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(chiffre);
        }
    }
}

fizzbuzz();