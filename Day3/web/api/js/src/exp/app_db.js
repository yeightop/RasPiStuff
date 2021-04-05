require('dotenv').config({path: __dirname + '/.env'});
var crypto = require('crypto');
let mysql2 = require('mysql2');

const db_host = process.env.MYSQL_HOST
const db_name = process.env.MYQL_NAME
const db_userid = process.env.MYSQL_USER;
const db_password = process.env.MYSQL_PASSWORD;

const hash_sha512 = crypto.createHash('sha512');

let configPool = {
    host: db_host,
    user: db_userid,
    password: db_password,
    database: db_name,
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0
}

const pool = mysql2.createPool(configPool);

function genSHA512(userPassword) {

    result = hash_sha512.update(userPassword, 'utf-8');

    return result.digest('hex');
}

function runQuery() {

    /*
     * For this example we will use static values.
     */
    const userEmail = 'johnc@sictc.edu';
    const userPassword = 'Pencil1';

    /* Calculate the hash checksum to compare agains the password field */
    const userPasswordHash = genSHA512(userPassword);

    //const queryString = 'SELECT * FROM engenx.Users WHERE Email = ? AND Password = ?';
    const queryString = 'SELECT * FROM engenx.Users_SHA2_512 WHERE Email = ? AND Password = ?';

    pool.query(queryString, [userEmail, userPasswordHash], (error, rows, fields) => {
        if (error) {
            console.log("ERROR " + error);
        }
    
        if (rows.length > 0) {

            console.log("rows: " + rows.length + " fields: " + fields.length);

            rows.forEach(function(row) {
                console.log(row.Id, row.AccountId, row.Email);
            });
            
        } else {
            console.log('query returned zero results');
        }
    });  

    return;
}

runQuery();
