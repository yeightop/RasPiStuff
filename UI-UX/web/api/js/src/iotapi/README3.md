# (Part 3) Web API (Node)

## Table of Contents
[Overview](#overview)<br>
[Connecting Database](#connecting-database)<br>
[Creating Environment File](#creating-environment-file)<br>
[Unit Test](#unit-test)<br>
[Shortcuts Cheatsheet](#shortcuts-cheatsheet)<br>

## Overview
In this tutorial, we begin building out the connection between the `API` and the `MySQL` database. 

Before we do this, verify you're logged into your Raspberry Pi. Follow the steps below to begin building out the system. As always, the code used in this tutorial can be used to create other programs by simply modifying the syntax.

<b>Note</b>: Again, as mentioned before, I highly encourage having multiple terminals available. Later on, this will be required to have multiple screens going on your Raspberry Pi. One for your host computer, and the other for your Raspberry Pi. Use your previous experience you learned in the last section about `Linux Screen`.

## Connecting Database

All right, for the first part, we need to write the code for connecting to our database. 

Login to the Raspberry Pi (if you have logged out), and navigate to the `iotapi` directory by issuing: `cd sictcweb/web/api/js/src/iotapi` from the terminal. 

Before writing code, we need to install `Environment` and `MySQL` libraries. On your Raspberry Pi terminal while in `sictcweb/web/api/js/src/iotapi`, issue the commands below.

```console
npm install dotenv
npm install mysql2
```

Check to see if the pacakges are installed using `cat`.

```
{
  "name": "iotapi",
  "version": "1.0.0",
  "description": "IoT REST API",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Hans",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.0",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "mysql2": "^2.2.5"
  }
}
```

Great job! Now create a new file named `iotdb.js` while in `sictcweb/web/api/js/src/iotapi` and type or paste the code below.


##### iotdb.js
```javascript
require('dotenv').config({path: __dirname + '/.env'});
let mysql2 = require('mysql2');

const db_host = process.env.MYSQL_HOST
const db_name = process.env.MYSQL_DATABASE
const db_userid = process.env.MYSQL_USER;
const db_password = process.env.MYSQL_PASSWORD;

let pool;
let isConnected = false;

let configPool = {
    host: db_host,
    user: db_userid,
    password: db_password,
    database: db_name,
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0
}

try{
    pool = mysql2.createPool(configPool);
    isConnected = true;
}
catch(err){
    console.log(err);
}

function isDbConnected() {
    return isConnected;
}

function runQueryShowTables() {

    const queryString = 'SHOW TABLES';
    pool.query(queryString, (error, rows, fields) => { if (error) {
                    console.log("ERROR " + error);
            }
        
            if (rows.length > 0) {

                rows.forEach(function(row) {
                    console.log(row.Tables_in_IoT);
                });
                
            } else {
                console.log('query returned zero results');
            }
        });  

    return;
}

if (typeof require !== 'undefined') {
    if (require.main == module) {
        if (isDbConnected()) {
            console.log("Database: Connected");
            console.log("Tables:");
            runQueryShowTables();
        }
    }
}

module.exports = {pool};
```
Wow that's a lot of code we just pasted in! What do you say we break this down a bit.

The code above creates an instance of `mysql2` that manages our connection to the `MySQL` database. The database connection info is stored in our `.env` file. More on that later.

Like all database applications, we need a mechanism of storing database connection state. Initially, when the application loads, our variable connection `isConnected` is set to `false`, properly designating we have not yet established a connection yet. To configure a new connection, we setup a `configPool` variable to to store the connection info and establish a new connection to the database. The `configPool` object stores the connection info: `host`, `user`, `password` and `database` respectively. Our `waitForConnections` will be `true` with a `connectionLimit` set to 15 seconds. 

Now for our try method, variable `pool` will take in the environment variables will set later in `mysql2`. The `createPool` passes on the data into the index just assembled for needing the login information. After that, the `isConnected` will go to true if all the information is correct. And just to be sure, we include a catch for any errors that could halt the execution.

Now for our function `runQueryShowtables` will act just as if we typed in the command `SHOW TABLES`, listing all the fields for the database. This takes us into the if statement checking for all rows on each table. As long is 1 row, our terminal will display the tables. Else, we will put for the user to see `query returned zero results`.

## Creating Environment File

Next we need to create an `Environment` file which stores the database connection information. This file is important for two reasons.

- This allows to secure store the information outside of our application code.
- It keeps the code portable so that we can easily change database connection information in a single place. 

In this project the `.env` file will be stored in the root of the application for simplicity, which will be at `sictcweb/web/api/js/src/iotapi`. Please be advised that this is not secure nor recommended for production cases. Later tutorials will teach you how to properly load `.env` files for use in your applications.

Create a new file on Raspberry Pi and name it `.env`. Type, or copy and paste the code below into the newly created `.env` file on your Raspberry Pi.

```console
MYSQL_HOST=localhost
MYSQL_USER=sictc
MYSQL_PASSWORD=Pencil1
MYSQL_DATABASE=IoT
```
Remember that is you have a different username or password to use those differences instead. This also includes the `MYSQL_DATABASE` variable. Confirm the name is the same as the database, including the case sensitivity.

We can test the code in our new `iotdb.js` by running the command below on the Raspberry Pi terminal. 

```console
node iotdb.js
```
Your console should display something similar to the example results below. As you can see the module successfully connected and displayed the tables in the database.

```console
Database: Connected
Tables:
Accounts
Users
IoT
Groups
IoTGroups
States
```

If you do not get all of these tables listed, you will need to create them from the tutorial [Entity Creation](db/README4.md)

<b>Note</b>: If you run into an error similar to `ERROR Error: Access denied for user 'sictc'@'localhost' (using password: YES)`.
There are a couple of things you can try.

- Check to see if you properly typed the credentials into your `.env` file. The most common mistake is an incorrect password.
- Ensure the code matches the `iotdb.js` example above.


<b>Note</b>: If you run into the message: `query returned zero results`.
- Login to your MySQL console and `INSERT` new records. The connection is hitting successfully, but you don't have any tables created.

## Unit Test

After connecting to the database, we can go on to construct more components of our `API`. Each new module we create needs a test harness. Note the `if` block of code at the bottom of the file `iotdb.js`. This is a test harness that can be run from the terminal on that file. 

```javascript
if (typeof require !== 'undefined') {
    if (require.main == module) {
        if (isDbConnected()) {
            console.log("Database: Connected");
            console.log("Tables:");
            runQueryShowTables();
        }
    }
}
```

This is the method that is called when you issued the `node iotdb.js` command in the example above. This helper routine allows quick test connectivity of modules before attempting to troubleshoot database connections deeper in the application once the `API` is up and running.


## Shortcuts Cheatsheet
| Commands | Definition |
|---|---|
|`ssh pi@ipaddress`| Command to login to Raspberry Pi.|
|`cd`| Change directory command, used for moving to different file paths. |
|`mkdir`| Make a new directory. | 
|`raspberry`| Default login password for Raspberry Pi.|
|`whoami`| Linux current logged in user.|
|`touch filename`| Command to create a file. |
|`ls`| Command to list contents in a directory. Think of the contents you see on your desktop icons. |
|`pwd`| Command that prints the current directly, called print working directory|
|`sudo`| Command to allow admin executions, short for `super user do`|
|`sudo !!` | Allows you to repeat the last command with sudo permissions. |
|`apt update`| Command to update repository. |
|`curl`| Utility to test HTTP endpoints. |
|`chmod +x --file-name`| Give file execute permissions. |

For Screen

| Commands | Definition |
|---|---|
|`screen -S customterminalname`| Create a new screen with a custom name and session number. |
|`echo $STY`| echo Socket TYpewriter to see if you are on a screen or not.|
|`screen -ls` | List all your available screens, attached or detached. |
|`CTRL+A+C`|Create new window.|
|`CTRL+A+D`|Detach a screen, takes you back to your original terminal.|
|`CTRL+A+n`|Go to next screen. |
|`CTRL+A+p`|Go to previous screen. |
|`screen -r`|Resume a previous screen.|
|`screen -d -r -sessionnumber`| Reattach to a detached screen through the session number.|
|`screen -x sessionnumber`| Terminate a session screen.|

## References
 - https://en.wikipedia.org/wiki/HTTP_message_body
 - https://www.npmjs.com/package/body-parser
 - https://www.cyberciti.biz/tips/linux-screen-command-howto.html


## Continue to [Part 4 Web API](README4.md)

<details><summary>Tutorial List</summary>

### Prep

[Raspberry Pi Prep](prep/README.md)<br>
[(Bonus) Flashing OS image to SD card: Linux Version](prep/README2.md)<br>

---

### Linux - WSl setup

[Operating System (Linux)](../linux/README.md)<br>
[Toggle Raspberry Pi led light](linux/embed/README.md)<br>
[Autoboot Services](linux/embed/sysd/README.md)<br>

---

### Database

[(Part 1) Database (MySQL)](db/README.md)<br>
[(Part 2) Tables, Queries, and SQL](db/README2.md)<br>
[(Part 3) Working with Relations](db/README3.md)<br>
[(Part 4) Putting it all together](db/README4.md)<br>
[(Extras) Setting MySQL Timezone on Raspberry Pi](db/MYSQLTZ.md)<br>

---

### Web

[Getting Started with Node](web/README.md)<br>
[(Part 1) Web API (Node)](../iotapi/README.md)<br>
[(Part 2) Web API (Node)](../iotapi/README2.md)<br>
[(Part 3) Web API (Node)](../iotapi/README3.md)<br>
[(Part 4) Web API (Node)](../iotapi/README4.md)<br>
[(Part 5) Web API (Node)](../iotapi/README5.md)<br>

---

### UX

[Angular (Web Framework Setup)](web/ux/README.md)<br>
[Angular (Web Framework) (Part 1)](web/ux/README2.md)<br>
[Angular (Web Framework) (Part 2)](web/ux/README3.md)<br>
[Angular (Web Framework) (Part 3)](web/ux/README4.md)<br>

---

### API

[Installing MySQL Connector for Python](web/api/py/README.md)

</details>





