# (Part 2) Building an API

## Table of Contents
[Overview](#overview)<br>
[Code Strategy](#code-strategy)<br>
[First Code](#first-code)<br>

## Overview

In this tutorial we will begin writing the foundation code that will be used to create the web application. Follow the examples below to begin. This will be some of your first tests building your skills as a `Node` developer! 

Part 1 outlined a basic `Hello Node` example. This included just creating a file to see if the file would read back when commanded. Simple, but will help you see the bigger picture besides setting up the environment. 

Part 3 and beyond start to build upon one another and really stretch your skill-set. If you are editing the source files locally, you will be using the `SCP` command to test and deploy your code. From here on out, I will purposefully leave out explanation as your command line reflexes and shortcuts should start to build and "burn-in" from the repetition. You can always refer to the cheatsheet list.

As always, the code used in this tutorial can be used to create other programs by simply modifying the syntax.

## Code Strategy 

Most projects start out as many smaller projects that build upon each other. These smaller projects can lead to further development down the road or help explore an idea that we think can make our workflow smoother than before. Here at my company we call these experiments. 

Experiments exercise and test sub-components of a system so that we can see if they are working independently of the entire system before integration. This modular strategy allows us to keep code modules decoupled and prevent large monolithic designs, which can lead to errors that take an extraneous amount of time to catch. 

Monolithic designs aren't bad but can make it very difficult to track and trace bugs. Better to find the errors in small designs first instead of a big project.

## First Code

Add the following code into your file:

```javascript

function add(x, y) {
    return x + y; 
}

function subtract(x, y) {
    return x - y; 
}

let x = 1;
let y = 1;

sum = add(x, y);
dif = subtract(sum, x);

console.log('sum: ', sum);
console.log('diff: ', dif);
```

Give it a try. Login to the Raspberry Pi and navigate to the `web/api/js/src/exp/math/` folder and issue the `node` command on file `lib.js` The console should return the output  below.
```console
sum:  2
dif:  1
```

That's great if all you want to do is add and subtract numbers together, but I have a feeling you will want to add more than just the code above. Now open the file `lib.js` and create your own method that multiplies `x` and `y`.

In fact, create as many methods as you like and run the command again and again for each method you create.


## References
 - https://www.tecmint.com/linux-package-managers/
 - https://linuxize.com/post/how-to-install-node-js-on-raspberry-pi/
 - https://www.geeksforgeeks.org/scp-command-in-linux-with-examples/

<details><summary>Tutorial List</summary>
<br>

### Prep

[Raspberry Pi Prep](/prep/README.md)<br>

### Linux - WSl setup

[(Part 0) Operating System (Linux)](linux/README.md)<br>

### Database

[(Part 1) Database (MySQL)](db/README.md)<br>
[(Part 2)  Tables, Queries, and SQL](db/README2.md)<br>
[(Part 3)  Working with Relations](db/README3.md)<br>
[(Part 4) Putting it all together](db/README4.md)<br>
[(Extras) Setting MySQL Timezone on Raspberry Pi](db/MYSQLTZ.md)<br>

### Web

[Getting Started with Node](web/README.md)<br>
[(Part 1) Web API (Node)](web/api/js/src/iotapi/README.md)<br>
[(Part 2) Web API (Node)](web/api/js/src/iotapi/README2.md)<br>
[(Part 3) Web API (Node)](web/api/js/src/iotapi/README3.md)<br>
[(Part 4) Web API (Node)](web/api/js/src/iotapi/README4.md)<br>
[(Part X) Security](web/READMEX.md)<br>

### UX

[Angular (Web Framework)](web/ux/README.md)<br>

### API

[Installing MySQL Connector for Python](web/api/py/README.md)

### Cryptography

[Crypto](web/CRYPTO.md)<br>

</details>