
var crypto = require('crypto');
const hash_sha512 = crypto.createHash('sha512');

const userPasword = 'Pencil1';

function genSHA512(userPassword) {

    result = hash_sha512.update(userPassword, 'utf-8');

    return result.digest('hex');
}


result = genSHA512(userPasword);

console.log('hash: ', result);


