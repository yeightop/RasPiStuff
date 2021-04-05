# (Part 3) Web API (Node)
 
## Table of Contents
[Overview](#overview)<br>
[Connecting Database](#connecting-database)<br>
[Creating Environment File](#creating-environment-file)<br>
[Unit Test](#unit-test)<br>
[Shortcuts Cheat Sheet](#shortcuts-cheatsheet)<br>
 
## Overview
In this tutorial, we begin building out the connection between the `API` and the `MySQL` database.
 
Before we do this, verify you're logged into your Raspberry Pi. Follow the steps below to begin building out the system. As always, the code used in this tutorial can be used to create other programs by simply modifying the syntax.
 
<b>Note</b>: Again, as mentioned before, I highly encourage having multiple terminals available. Later on, this will be required to have multiple screens going on your Raspberry Pi. One for your host computer, and the other for your Raspberry Pi. Use your previous experience you learned in the last section about `Linux Screen`.
 
## Connecting Database
 
All right, for the first part, we need to write the code for connecting to our database.
 
Login to the Raspberry Pi (if you have logged out), and navigate to the `iotapi` directory by issuing: `cd sictcweb/web/api/js/src/iotapi` from the terminal.
 
Before writing code, we need to install `Environment` and `MySQL` libraries. On your Raspberry Pi terminal while in `sictcweb/web/api/js/src/iotapi`, issue the commands below.
 
##### Raspberry Pi terminal
```console
npm install dotenv
npm install mysql2
```
The node package `dotenv` is used to simply load our environment variables that are created in the `.env` file. We will cover how to create this environment variable below.
 
Package `mysql2` is also installed so that we can create native bindings to our database we created in the earlier section. We also have the addition of using prepared statements that will help keep our file easy to read.
 
Once you finish installing the other packages, check to see if the packages are installed using `cat`.
 
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
Wow that's a lot of code we just pasted in! What do you say we break this down a bit. So let's break this up into chunks.
 
<b>Requirements</b>: The code above creates an instance of mysql2 that manages our connection to the MySQL database. The database connection info is stored in our `.env` file.
 
<b>Constants</b>: For the constants `db_host`, `db_name`, `db_userid`, and the `db_password`, they will be what's pulled from your environment variable. The information you stored on the `.env` file is your host ip, the mysql user you created, the password for accessing the user, and which database you want the user to have access to. The constants have a `process.env` before calling your data.
 
The `process.env` is a global variable for Node. We are provisioning the environment variables to be called from an external source. If we didn't have an environment variable set, we would either have to make sure our database is on the same machine where our database is located (which, for this tutorial, it is) or we would need to add more lines of code for checking branch conditions. Since we have a service dependency on this section, being our database, it's considered better practice to address the service outside through an environment variable.
 
<b>Variables</b>: We have a variable being called `pool` and others from `configPool`. The variable `pool` will take in what's being passed through for the `configPool`, which we can dive into deeper into the next paragraph.
 
<b>configPool</b>: Like all database applications, we need a mechanism of storing database connection state. Initially, when the application loads, our variable connection `isConnected` is set to `false`, properly designating we have not yet established a connection yet. To configure a new connection, we set up a `configPool` variable to store the connection info and establish a new connection to the database. The `configPool` can be seen storing the connection info: `host`, `user`, `password` and `database` respectively, while having a connection timeout around 15 seconds and . The connection info will be included from the environment variable being passed through.
 
Our `waitForConnections` will be `true` with a `connectionLimit` set to 15 seconds. The `waitForConnections` is a mysql option we put down if either the queue limit has been reached or no connections appear. We keep it set to true so that the connection becomes available and the user to the queue.
 
We also list another mysql call with `queueLimit`. What `queueLimit` is doing is setting a max of how many connection requests may come in before refusing or sending an error. You may think with it being set to zero, that means the queue will not accept any connections. But in reality, zero is the default. When the limit is set to zero, that means the number of queued connections is limitless.
 
<b>Try catch method</b>: Moving to our try method, the variable `pool` will take in the environment variables set later in `mysql2`. The `createPool` passes on the data into the index just assembled for needing the login information. After that, the `isConnected` will go to true if all the information is correct. And just to be sure, we include a catch for any errors that could halt the execution.
 
<b>Functions</b>: Now for our function `runQueryShowtables`, the action will act just as if we typed in the command `SHOW TABLES`, listing all the fields for the database. This takes us into the if statement checking for all rows on each table, by using our `pool.query` which holds the `queryString`. As long as 1 table exists in your database, the terminal will display the tables. Else, we will put for the user to see `query returned zero results`. The check here is the length of our table rows, represented by the `row.length` if statement.
 
## Creating Environment File
 
Before we activate the `iotdb.js` file, we need to create an `Environment` file which stores the database connection information. This file is important for two reasons.
 
- This allows us to securely store the information outside of our application code.
- It keeps the code portable so that we can easily change database connection information in a single place.
 
In this project, the `.env` file will be stored in the root of the application for simplicity, which will be at `sictcweb/web/api/js/src/iotapi`.
 
<b>Note</b>: Please be advised that this is not secure nor recommended for production cases. Later tutorials will teach you how to properly load `.env` files for use in your applications.
 
Create a new file on Raspberry Pi and name it `.env`. Type, or copy and paste the code below into the newly created `.env` file on your Raspberry Pi.
 
```console
MYSQL_HOST=localhost
MYSQL_USER=sictc
MYSQL_PASSWORD=Pencil1
MYSQL_DATABASE=IoT
```
Remember that you have a different username or password to use those differences instead. This also includes the `MYSQL_DATABASE` variable. Confirm the name is the same as the database, including the case sensitivity.
 
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
- For the `console.log(row.Tables_in_IoT)`, confirm that the table is spelled the same as the table you want to connect to. This includes case sensitivity. Otherwise, the file won't be able to locate your database.
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
|`CTRL+A+C`|Create a new window.|
|`CTRL+A+D`|Detach a screen, takes you back to your original terminal.|
|`CTRL+A+n`|Go to the next screen. |
|`CTRL+A+p`|Go to the previous screen. |
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





