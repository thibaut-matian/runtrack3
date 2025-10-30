function tri(numbers, order = 'asc') {

    for (let i = 0; i < numbers.length; i++) {
        let indexOptimal = i;
        for (let j = i + 1; j < numbers.length; j++) {

            if (order === 'asc') {
                // Tri ascendant : on cherche le plus PETIT (min)
                if (numbers[j] < numbers[indexOptimal]) { // (Corrigé : numbers[...])
                    indexOptimal = j;
                }
            } else if (order === 'desc') {
                // Tri descendant : on cherche le plus GRAND (max)
                if (numbers[j] > numbers[indexOptimal]) {
                    indexOptimal = j;
                }
            }
        }
        let tmp = numbers[i];
        numbers[i] = numbers[indexOptimal];
        numbers[indexOptimal] = tmp;
    }

    return numbers;
}


var numbersAsc = [5, 8, 11, 6, 1, 9, 3];
tri(numbersAsc, 'asc');
console.log(numbersAsc); // [1, 3, 5, 6, 8, 9, 11]

var numbersDesc = [5, 8, 11, 6, 1, 9, 3];
tri(numbersDesc, 'desc');
console.log(numbersDesc); // [11, 9, 8, 6, 5, 3, 1]


const numbers = [5, 8, 11, 6, 1, 9, 3];
// tri numerique// 
numbers.sort((a, b) => a - b);
console.log(numbers);