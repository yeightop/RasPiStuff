function add(x, y) {
    return x + y; 
}

function subtract(x, y) {
    return x - y; 
}


module.exports = {add, subtract};

if (typeof require !== 'undefined') {
    if (require.main == module) {

        let x = 1;
        let y = 1;

        sum = add(x, y);
        diff = subtract(sum, x);

        console.log('sum: ', sum);
        console.log('diff: ', diff);
    }
}