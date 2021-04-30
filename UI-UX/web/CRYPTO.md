# Cryptography

## Table of Contents
 - [Overview]()
 - [Hashing Algorithm]()
 - [Challenge]()

## Overview
In this tutorial, we'll begin exploring the hashing function to verify the user's password. The level of encryption we want to use determine the complexity of the hash. Be advised this is just a simple instruction on how hashing works.

## Hashing Algorithm
The first module we want to create will exercise the SHA2 512 hashing algorithm we need to verify the User's password.  This module can be run independently by running the ```Node``` file ```web/api/js/src/exp/crypto/app_hash.js```.

<b>Note</b>: There is probably a good chance you don't have this folder made yet after `/src`. Go ahead and create the extra folder directories and the new fille `app_hash.js`. 

### File Structure

Now this section will take some of the source code we will need to make our hash for the password. Inside your `app_hash.js` file, add the following source code.

```javascript
var crypto = require('crypto');
const hash_sha512 = crypto.createHash('512');

const userPassword = 'Pencil1';
```

The first line of code imports the ```Node``` cryptography library. The ```crypto``` library  is used to generate SHA2 512 bit checksums of values passed as a parameters to it's update method. Line 2 uses the ```crypto``` library to create a ```SHA 512``` bit hash. The type of hash created can be changed by passing different values into the ```createHash``` method. We will be using 512 in our application.

The variable ```userPassword``` is a constant used to generate different checksums as we explore the functionality of the library. 

<b>Note</b>: This ```Password``` was also used in the MySQL database example so you might want to take note of the resulting checksum.

Keep in mind that this first portion of the code is just setting up our constants and variables that will be implemented in our function in the next section.

### Custom Methods

With taking our created variables, now we need to pass through the arguments to create the hash. Put in the source code below into the file `app_hash.js`. 

```javascript
function genSHA512(userPassword) {

    result = hash_sha512.update(userPassword, 'utf-8');

    return result.digest('hex');
}

result = genSHA512(userPasword);

console.log('hash: ', result);
```

The ```genSHA512``` is a user defined method that takes a single argument. The given argument name ```userPassword``` is the variable that is used to calculate the checksum. The method completes by returning the hashed result.

We call this user defined method by assigning a return variable to the method call. The argument we pass in is the ```userPassword``` constant we defined above. The ```console.log``` method simply outputs the result to the terminal.

Give it a try. Login to the Raspberry Pi and navigate to the ```sictcweb/web/api/js/src/exp``` directory and issue the ```node``` command on file ```app_hash.js```.

## Breaking Weak Cryptography
TODO:

Build script to brute force crack 40 bit hash. Provide instrumentation.

## Challenges:
TODO:


## References
 - https://www.tecmint.com/linux-package-managers/
 - https://linuxize.com/post/how-to-install-node-js-on-raspberry-pi/
 - https://www.geeksforgeeks.org/scp-command-in-linux-with-examples/

### [Table of Contents](../README.md)

<details><summary>Tutorial List</summary>
<br>

### Prep

[Raspberry Pi Prep](/prep/README.md)<br>

### Linux - WSl setup

[(Part 0) Operating System (Linux)](linux/README.md)<br>

### Database

[(Part 1) Database (MySQL)](db/README.md)<br>
[(Part 2)  Tables, Querys, and SQL](db/README2.md)<br>
[(Part 3)  Working with Relations](db/README3.md)<br>
[(Part 4) Putting it all together](db/README4.md)<br>
[(Extras) Setting MySQL Timezone on Raspberry Pi](db/MYSQLTZ.md)<br>

### Web

[Getting Started with Node](web/README.md)<br>
[(Overview) Getting Started with Node](web/README)<br>
[(Part 1) Web API (Node)](web/api/js/src/iotapi/README.md)<br>
[(Part 2) Web API (Node)](web/api/js/src/iotapi/README2.md)<br>
[(Part 3) Web API (Node)](web/api/js/src/iotapi/README3.md)]<br>
[(Part 4) Web API (Node)](web/api/js/src/iotapi/README4.md)]<br>
[(Part X) Security](web/READMEX.md)<br>

### UX

[Angular (Web Framework)](web/ux/README.md)<br>

### API

[Installing MySQL Connector for Python](web/api/py/README.md)

### Cryptography

[Crypto](web/CRYPTO.md)<br>

</details>