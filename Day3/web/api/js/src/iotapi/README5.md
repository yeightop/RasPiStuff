# (Part 5) Web API (Node)
 
## Table of Contents
[Overview](#overview)<br>
[Review: Corrections in table Accounts in MySQL Database](#review:-corrections-in-table-accounts-in-mysql-database)<br>
[Building the Route](#building-the-route)<br>
[Integrating Index Router](#integrating-index-router)<br>
[Accounts API Query](#accounts-api-query)<br>
[Accounts Unit Test](#accounts-unit-test)<br>
[Add Account](#add-account)<br>
[Adding the Account json](#adding-the-account-json)<br>
[Delete Account](#delete-account)<br>
[Get Account](#get-account)<br>
[Update Account](#update-account)<br>
[Shortcuts Cheat Sheet](#shortcuts-cheatsheet)<br>
 
## Overview
In this tutorial we will begin to adjust the final IoT Database. We will add our `Accounts` and `Users ` tables and scaffold the API and for testing the added tables. Earlier we added states and now will add the others.
 
Also be prepared to refer to the organization list for the tables at any point.
 
## Review: Corrections in table Accounts in MySQL Database
 
<b>Note</b>: This will be required for continuation as it will be the table your api coordinates with. Implementation is similar to the setup with the `States` or `Users` tables. The only major difference will be state is no longer used as an integer Id, instead it will be a varchar(2) as most web pages use a drop down with state initials.
 
The following is the table layout for the Accounts table you created earlier.
 
```mysql
Tables:
Accounts
- Id (int)
- Name (string)
- Address (string)
- City (string)
- State (string)
- Zip (string)
- Phone (string)
- LastUpdate
- CreatedDate
```
 
Before we move on, let's confirm the table exists in database IoT.
 
First open your mysql database. Remember the access command? If not use the following code below this one last time. remember that you must use the username and password that is contained on your `.env` file.
```console
sudo mysql -u (username) -p
```
 
Now access your IoT database with the following command
 
```mysql
USE IoT;
```
 
Remember! The database is case sensitive. If you already have built the table in previous tutorials, you can go ahead and move to [Building the Route](#building-the-route)
 
##### Terminal Results
```mysql
Database changed
MariaDB [IoT]> SHOW tables;
+---------------+
| Tables_in_IoT |
+---------------+
| Accounts      |
| Groups        |
| IoT           |
| IoTGroups     |
| States        |
| Users         |
+---------------+
6 rows in set (0.001 sec)
 
MariaDB [IoT]>
```
 
Now if you haven't created your Accounts table yet, or it doesn't show up when you check the IoT database, create a new accounts table to handle the routed data in the database with the following command. If accounts are missing or you don't have all the tables listed, go back to [Entity Creation](/db/README4.md) and create ALL the tables needed for database IoT.
 
Before we get testing, we need to make a few changes. From the previous database tutorial, you may have a column called `StateId`. We want to drop this column and replace it with a new column called `State`. We can do this with an `ALTER` call. Let's do that by updating the accounts.
 
While in your mysql database, alter the table with the following.
 
```mysql
ALTER TABLE Accounts DROP COLUMN StateId;
```
This query will drop the column `StateId` from your table. Now you need to add a new column to Accounts called `State`.
 
```mysql
ALTER TABLE Accounts ADD State varchar(2);
```
 
The reason for this change is there are few applications that store states under their own table when they can be defined as a Varchar(2) when using their initials.
 
Now, for testing purposes we want to call our route You should already have one test account added from the previous database section. If not, go ahead and insert the test account below.
 
```mysql
INSERT INTO Accounts (Name, Address, City, State, Zip) VALUES ('Bob', '1901 Lynch Rd', 'Evansville', 'IN', '47711');
```
 
Now lets check to make sure the record was stored correctly
 
```mysql
SELECT * FROM Accounts;
```
You should have something similar below. Note that if you have more accounts added, you will have more listings below.
 
```
+------+---------------+------------+-------+-------+
| Name | Address       | City       | State | Zip   |
+------+---------------+------------+-------+-------+
| Bob  | 1901 Lynch Rd | Evansville | IN    | 47711 |
+------+---------------+------------+-------+-------+
 
1 row in set (0.001 sec)
 
```
 
You may already have an account added from Part 4 of the Entity Creation section, so don't be surprised if you have more than one account listed in the table. If everything looks similar as listed above then congratulations! Now it's time to build the route.
 
 
## Building The Route
 
Just as we did with the states, now we will build a route for the `Accounts` table.
 
Navigate to the `iotapi/routes` directory by issuing: `cd sictcweb/web/api/js/src/iotapi/routes` from the Raspberry Pi terminal.
 
Once you're inside the `routes` directory, create a new file and name it `accounts.js`. Currently, you should only have one file in the folder called `states.js`.
 
Paste into the file the source code below.
 
##### accounts.js
```javascript
var express = require('express');
var router = express.Router();
 
const libiotdb = require('../iotdb');
const bodyParser = require('body-parser');
 
router.use(bodyParser.json());
 
router.get('/whoami', (request, response) => {
   const content = request.baseUrl;
 
   console.log(content);
   response.send(content);
});
 
router.get('/', (request, response) => {
   const content = request.baseUrl;
 
   console.log(content);
   response.send(content);
});
 
module.exports = router;
```
 
The code above does several things to prepare the route for integration with our `index.js` file.
 
Just from before, we need the instance variables created for `express` and `express.Router()` modules. These modules allow the `Route` to handle incoming requests. We also have the constants for using the library `iotdb` file and the `body-parser` for displaying the POST information.
 
Finally we need to create our first route path with the `/` route using the `GET` call to be able to send a response to the user. Also included at the bottom portion of the code is the line `module.exports = router`. This is needed at the end of any routes you create so Express can access the file.
 
Remember that final line from the first file created you needed in `states.js`? The `module.exports = router` must be included for the route to succeed. This is needed so Express can access the file.
 
Now if you try running this file alone, you will not find any results.  All you will get back is an empty response, even with the `index.js` running.
 
```console
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi/routes $ node accounts.js
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi/routes $
```
 
The reason is our module is absent in `index.js` file, which is located in our `iotapi` directory. Since it cannot locate the file, it just posts back like the terminal didn't recognize the command.
 
 
## Integrating Router on Index.js
Time to integrate the new route from `accounts.js` into `index.js` file so we can get a response. On the Raspberry Pi terminal, navigate back a directory to `iotapi` command. Locate and open the `index.js` file. In this case, we are going to adjust part of the `index.js` file. You'll notice this quickly.
 
Type in the example code into the `index.js` file with the editor of your choice. There will be two new lines added in while commenting out what we used for the States routing. The commented out lines of code is what we used to hit the `states.js` file.
 
##### index.js
```javascript
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
//const routeStates = require('./routes/states.js');
const routeAccounts = require('./routes/accounts.js');
 
 
const NAME = require(__dirname + '/package.json').name;
const libiotdb = require('./iotdb');
const PORT = 3000;
 
//app.use('/states', routeStates);
app.use('/accounts', routeAccounts)
 
app.listen(PORT, () => console.log('IoT REST API running on port 3000'));
 
/*
* Example route testing that app is running.
*/
 
app.get('/whoami', (request, response) => {
   var url = path.join(request.baseUrl, request.url);
   console.log(url);
   response.send('<div><h1>Hello, Accounts</h1></div>');
});
 
```
If you look closely, we only changed a couple of things in our `index.js` file.
 
A new constant called `routeAccounts` is created for the new `accounts.js` file we have created. Also the `app.use` function is calling for the information int `/accounts` that we will add.
 
A new GET request is also called when the user goes to the `/accounts/whoami` section. The information will display when called. The code is the same that we used when looking in the states section.
 
Now let's see if we created the route successfully. The new url path we will be looking for is in `http://your-raspberry-pi-ip-addres-or-localhost:3000/accounts/whoami`. This will require having multiple screen sessions ongoing.
 
On one terminal or session, navigate to the `iotapi` directory and issue `node index.js`.
```console
node index.js
```
On another screen window , navigate to the `iotapi` directory and issue the command below to test the route.
```console
curl http://localhost:3000/accounts/whoami
```
You should see the reply `/accounts` from the `curl`.
 
```console
pi@raspberrypi:~ $ curl http://192.168.1.18:3000/accounts/whoami
/accountspi@raspberrypi:~ $
```
When you navigate back to the screen serving `node` you should also see a response initiated.
 
```console
IoT REST API running on port 3000
/accounts
```
 
Then pop back over to where `index.js` is running and you should see it now at the `/states` section.
 
```console
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi $ node index.js
IoT REST API running on port 3000
/accounts
```
 
<b>Note</b>: Throughout the tutorial, you may see `raspberry-pi-ip-address` and `localhost` used interchangeably. In most cases, you should still get the same result whether you type in your ip address or `localhost`. However there are some key differences
 
<b>If you are running a test on your server with the terminal linked to the Raspberry Pi</b>: This is where you can use either the ip address or localhost.
 
<b>If you are running a test on your server with the terminal linked to your host computer</b>: This is where you will have to use your raspberry pi ip address to hit your server.
 
The `localhost` is just the current computer address to be accessed.
 
Now it's time to build our API query specifically for the accounts.
 
## Accounts API Query
 
Just as before, we need to edit our `accounts.js` file to actually retrieve information. Add the following code in the first `router.get('/', (request, response) => {` section of the `routes/accounts.js` file.
 
##### accounts.js
```javascript
router.get('/', (request, response) => {
 
   const queryString = 'SELECT * FROM Accounts';
 
   libiotdb.pool.query(queryString, (error, result, fields) => {
       if (error) {
           console.log("ERROR: " + error);
           response.status(500).json(JSON.stringify(error));
       }
  
       if (result.length > 0) {
           console.log(JSON.stringify(result));
           response.status(200).json(result);
          
       } else {
           console.log('Query returned zero results.');
           response.status(204).end();
       }
   }); 
 
});
```
<b>Note</b>: Also be sure that `module.exports = router` is still at the bottom of the `accounts.js` file.
 
The constant `queryString` will this time only look for two columns to display. That will be the `Id` and the `Name` column.
 
Everything else matches just as what we talked about earlier for the state api call.
 
Save the `routes/accounts.js` file with the newly added code. Be sure to shutdown and restart the `index.js` file to see the changes. Once the index file is active, go ahead and type in the following command on your Raspberry Pi terminal.
 
```console
curl -X GET http://localhost:3000/accounts
```
 
<b>Note</b>: You can also just use `localhost` if you do not wish to type out your entire raspberry pi ip address.
 
Depending on the number of accounts you entered in previous tutorials you may get different results. For example, I have only one account that I have added. When I execute the curl command, I get the following:
 
```console
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi/routes $ sudo curl -X GET http://192.168.1.18:3000/accounts
[{"Id":1,"Name":"banafana"}]
```
 
Then when I check my screen serving the index file, I see the following:
 
```console
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi $ node index.js
IoT REST API running on port 3000
[{"Id":1,"Name":"banafana"}]
```
 
Since you already created the Accounts table from earlier in this section, you shouldn't receive any errors. However, just in case you did get this error:
 
```console
pi@raspberrypi:~ $ curl -X GET http://localhost:3000/accounts
"{\"code\":\"ER_NO_SUCH_TABLE\",\"errno\":1146,\"sqlAccount\":\"42S02\",\"sqlMessage\":\"Table 'iot.Accounts' doesn't exist\"}
```
and on the terminal serving `node`
 
```console
ERROR: Error: Table 'iot.Accounts' doesn't exist
/home/pi/sictcweb/web/api/js/src/iotapi/routes/accounts.js:
```
Which means you need to go back to [Part 4: Creation Entity](db/README4.md)
 
Awesome job! This is the second successful API call you made that returned the results. Let's continue shall we.
 
## Accounts Unit Test
 
Okay, now we want to automate the `curl` command for the accounts as well. Head over to the `sictcweb/web/api/js/src/iotapi/sh`.
 
For our next step, we need a `curl` automation test so we can ensure code quality. Create a new screen if you have to. While in `sictcweb/web/api/js/src/iotapi/sh`, create a new file named `api.account.list.sh`. Type the contents of the bash command in the example below into the file.
 
##### api.account.list.sh
```console
#!/bin/bash
 
# Change working folder
cd "$(dirname "$0")"
 
# Get Accounts: (local:remote)
curl -s -X GET http://localhost:3000/accounts | jq .
#curl -s -X GET http://raspberrypi-ip:3000/accounts | jq .
```
Remember the commented out codes are signaled by the `#` command in front of them.
 
Save the file and exit to the terminal. We need to give this file execute permissions so issue the `chmod +x api.account.list.sh`. Voila, we now have our first automated test script to exercise our first endpoint.
 
Okay now let's test our script. On your Raspberry Pi, execute the script with `./api.account.list.sh`. You should get something similar to the results below. Again, you will probably need another screen going to see the results.
 
##### Terminal Results
```json
[
 {
   "Id": 1,
   "Name": "Bob",
   "Address": "1901 Lynch Rd",
   "City": "Evansville",
   "State": "IN",
   "Zip": "47711",
   "LastUpdate": time,
   "CreatedDate": time
 }
]
 
```
The reason we are able to display all the information is from our query `SELECT * FROM Accounts`. When you include the `*` in the query string, think of this as saying select all.
 
## Add Account
 
Now that we have our route connected, we can build the remaining routes for processing the accounts. On your Raspberry Pi terminal, navigate to and edit the `iotapi/routes/accounts.js` file. Type or paste the code before your function call `router.get('/', (request, response) =>`.
 
##### accounts.js
```javascript
router.post('/add', (request, response) => {
   const content = request.body;
   const queryString = `INSERT INTO Accounts (Name, Address, City, Zip, State) Values ("${content.Name}", "${content.Address}", "${content.City}", "${content.Zip}", "${content.State}");`;
 
   libiotdb.pool.query(queryString, (error, result, fields) => {
       if (error) {
           console.log("ERROR: " + error);
           response.status(500).json(JSON.stringify(error));
       } else {
           response.status(200).json({"Id": result.insertId});
           console.log({"Id": result.insertId});
           response.status(200).end();
       }
   }); 
});
```
<b>Important</b>: In the variable `queryString`, all of that string is enclosed in backticks "`", not as single apostrophes.
 
In this example, we are going to add in multiple values. The `route.post` will commence for our `/add` section to insert our new account. We also have a new query string that will be injected `INSERT INTO Accounts`. This will then go into a check giving an error or successful post, with a new id being assigned for the new account.
 
Now our query string will contain what we are looking for when inserting multiple values. Notice in our string to inherit any of the fields we have ` `"${content.ValueName}"`. This is so our JSON file can be read clearly. The variable will be what's actually passed to be read, aka `queryString`. JSON parses values through the syntax `${}`.
 
<b>Note</b>: Remember to have `module.exports = router;` at the bottom of the `js` file.
 
## Adding the account json
 
Now just as before, creating a new JSON file representing the new account is required. This data will need some information to be filled out.
 
Navigate to the file path `sictc/web/api/js/src/iotapi/sh/json`. Create a new file in this folder called `account.add.json`. This'll be the file posted using our automated shell script. Type or paste the contents of the `JSON` file below into `account.add.json`. For this example, we will add a new account for the user Rick.
 
##### account.add.json
```javascript
{
   "Name": "Rick",
   "Address": "22 Jump Street",
   "City": "Los Angeles",
   "Zip": "38098",
   "State": "CA"
}
```
 
Save the file and exit back to your main Raspberry Pi terminal (or move around the screen you created if this is the case). Go back into the `iotapi/sh` directory to build the curl script.
 
Our bash script will test our new `/account/add` route and accompanying `JSON` file. Make a new file using `touch` and call it `api.account.add.sh`. Type or paste the example script below into the file.
 
##### api.account.add.sh
```console
 
#!/bin/bash
 
# Change working folder
cd "$(dirname "$0")"
 
# Add: (local:remote)
curl -s -X POST -H "Content-Type: application/json" -d "@json/account.add.json" http://localhost:3000/accounts/add | jq .
#curl -s -X POST -H "Content-Type: application/json" -d "@json/account.add.json" http://raspberrypi-ip:3000/accounts/add | jq .
```
 
Save the file and exit back to the terminal (or screen depending on your preference). To make the file have executable permissions, issue `chmod +x api.account.add.sh` for the file.
 
Now you're ready to test the new route. Navigate to another terminal window (or screen) that isn't your main Raspberry Pi terminal and restart the `index.js` file.
Once we're up and running, navigate back to your home terminal on the Raspberry Pi and run the script.
 
```console
./api.account.add.sh
```
 
The console result reports back the new id created for the newly added record. Your `Id` number may be different, depending on how many accounts you have added into your database previously.
 
```console
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi/sh $ ./api.account.add.sh
{}
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi/sh $ ./api.accounts.list.sh
[
 {
   "Id": 1,
   "Name": "Bob",
   "Address": "1901 Lynch Rd",
   "City": "Evansville",
   "Zip": "47711",
   "State": "IN"
  
 },
 {
   "Id": 2,
   "Name": "Rick",
   "Address": "22 Jump Street",
   "City": "Los Angeles",
   "State": "CA"
   "Zip": "38098"
  
 }
 
```
 
Notice how the other fields are null? This is because in our string query, we were only adding in the `Name` column and nothing else. We will need to go back later to correct this to have all the fields display correctly from the JSON file. However, we do know our script works.
 
And if you check on your terminal that executed `node index.js`, you should see something similar.
 
```console
IoT REST API running on port 3000
{ Id: 2}
```
 
Remember now that we still need to add the delete, get, and update account sections.
 
## Delete Account
 
Now we want to establish how to delete certain accounts. Maybe you just don't like someone at the office. It's okay, there's always pranking going on.
 
Use what you've learned thus far to create the delete route below. You'll need the following.
 
## TODO: Delete Account Files
| Do | To What |
|---|---|
| Paste Code Below |`iotapi/routes/accounts.js`|
| Paste JSON Below | `iotapi/sh/json/account.delete.json` |
| Paste Shell Script Below |`iotapi/sh/api.account.delete.sh`|
| Give Shell Script Execute Permissions|`chmod +x sh/api.account.delete.sh`|
| Run Shell Script | `./api.account.delete.sh` |
 
When you add the delete call, be sure this is at the bottom of the page, right above the `module.exports = router;` source of code.
 
##### accounts.js
```javascript
 
router.delete('/delete/:id', (request, response) => {
   const content = request.body;
   const queryString = 'DELETE FROM Accounts WHERE Id = ?'
 
   libiotdb.pool.query(queryString, [content.Id], (error, result, fields) => {
       if (error) {
           console.log("ERROR: " + error);
           response.status(500).json(JSON.stringify(error));
       } else {
           console.log('Success!');
           response.status(200).end();
       }
   }); 
});
```
<b>Important</b>: In the variable `queryString`, all of that string for delete is also enclosed in backticks "`", not as single apostrophes.
 
From the previous script above, it takes in the same arguments, except now it's deleting the account from your table instead of inserting the data.
 
##### account.delete.json
```javascript
{
   "Id": 2
}
```
Remember that your `Id` may be different than above. In my case, it was 2.
 
##### api.account.delete.sh
```console
 
#!/bin/bash
 
# Change working folder
cd "$(dirname "$0")"
 
# Delete: (local:remote)
curl -s -X DELETE -H "Content-Type: application/json" -d "@json/account.delete.json" http://localhost:3000/accounts/delete/:id
#curl -s -X DELETE -H "Content-Type: application/json" -d "@json/account.delete.json" http://raspberrypi-ip:3000/accounts/delete/:id
```
 
If you execute the script, you should have a `Success` message appear on the terminal serving `node index.js`. Notice below how the `Id` I had for the second account is now gone.
 
```console
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi $ node index.js
IoT REST API running on port 3000
Success!
[{"Id":1,"Name":"Bob","Address":"1901 Lynch Rd","City":"Evansville"}]
```
 
I can also double check this on my account list
 
```console
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi/sh $ ./api.account.delete.sh
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi/sh $ ./api.accounts.list.sh
[
 {
   "Id": 1,
   "Name": "Bob",
   "Address": "1901 Lynch Rd",
   "City": "Evansville"
 }
]
 
```
 
From here use what you've learned to follow the `TODO's` in each of the remaining sections. We have `Get Account` and `Update Account` remaining.
 
<b>Note</b>: Using screen is going to be helpful and required from here in testing.
 
## Get Account
 
#### TODO: Get Account Files
 
| Do | To What | Linux screen or main terminal |
|---|---|---|
| Paste Code Below |`iotapi/routes/accounts.js`| screen |
| Paste Shell Script Below |`iotapi/sh/api.account.get.sh`| screen |
| Give Shell Script Execute Permissions|`chmod +x sh/api.account.get.sh`| screen |
| Run Shell Script | `./api.account.get.sh` | main terminal |
 
For your get request, you want to place this function right after the function call `router.get('/', (request, response) =>`.
 
##### accounts.js
```javascript
 
router.get('/:id', (request, response) => {
 
   const content = request.params;
   const queryString = 'SELECT Id, Name FROM Accounts WHERE Id = ?';
 
   libiotdb.pool.query(queryString, [content.id], (error, result, fields) => {
       if (error) {
           console.log("ERROR: " + error);
           response.status(500).json(JSON.stringify(error));
       }
  
       if (result.length > 0) {
           console.log(JSON.stringify(result));
           response.status(200).json(result);
          
       } else {
           console.log('Query returned zero results.');
           response.status(204).end();
       }
   });
}); 
```
 
##### api.account.get.sh
```console
#!/bin/bash
 
# Change working folder
cd "$(dirname "$0")"
 
# Get Account: (local:remote)
curl -s -X GET http://localhost:3000/accounts/1 | jq .
#curl -s -X GET http://raspberrypi-ip:3000/accounts/1 | jq .
```
When you finish, go ahead and restart the `index.js` file on the Raspberry Pi screen. Then execute the `api.account.get.sh` script on your Raspberry Pi main terminal. Results should be similar
 
```console
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi/sh $ ./api.account.get.sh
[
 {
   "Id": 1,
   "Name": "Bob"
 }
]
```
Now when you go over to check on the `index.js` screen, you should have the same query.
 
```console
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi $ node index.js
IoT REST API running on port 3000
[{"Id":1,"Name":"Bob"}]
```
 
## Update Account
 
#### TODO: Update Account Files
 
For this section, we will just focus on changing the name for our specified id.
 
| Do | To What | Linux screen or main terminal |
|---|---|---|
| Paste Code Below |`iotapi/routes/accounts.js`| screen |
| Paste JSON Below | `iotapi/routes/sh/json/account.update.json` | screen |
| Paste Shell Script Below |`iotapi/sh/api.account.update.sh`| screen |
| Give Shell Script Execute Permissions|`chmod +x sh/api.account.update.sh`| screen |
| Run Shell Script | `./api.update.get.sh` | main terminal |
 
Your update call will be the last section we need to add. This call will go right above the `router.delete('/delete/:id', (request, response) =>` section.
 
##### accounts.js
```javascript
router.post('/update', (request, response) => {
   const content = request.body;
   console.log(content.Id.toString());
   const queryString = `UPDATE Accounts SET Name = "${content.Name}", Address = "${content.Address}", City = "${content.City}", State = "${content.State}", Zip = "${content.Zip}" WHERE Id = ${content.Id}`;
 
   libiotdb.pool.query(queryString, (error, result, fields) => {
       if (error) {
           console.log("ERROR: " + error);
           response.status(500).json(JSON.stringify(error));
       } else {
           response.status(200).json({"Id": result.insertId});
           console.log({"Id": result.insertId});
           response.status(200).end();
       }
   }); 
});
```
 
<b>Important</b>: In the variable `queryString`, all of that string for updating the account is also enclosed in backticks "`", not as single apostrophes.
 
Update works just like adding an account where the values can change and must be addressed. We also have to specify the `Id` of the account that's contained in the string. Otherwise, we would end up changing everything in the column to just one particular name for all columns.
 
##### account.update.json
```javascript
{
   "Id": 1,
   "Name": "Dwight"
}
```
 
#### api.account.update.sh
```console
#!/bin/bash
 
# Change working folder
cd "$(dirname "$0")"
 
# Update Account Test: (local:remote)
curl -s -X POST -H "Content-Type: application/json" -d "@json/account.update.json" http://localhost:3000/accounts/update
#curl -s -X POST -H "Content-Type: application/json" -d "@json/account.update.json" http://raspberrypi-ip:3000/accounts/update
```
 
After creating the new files and adding in permissions, go ahead and restart the `index.js` file. Then on your main terminal, not a screen terminal, execute the update script. The script will appear not to post anything back, but on inspecting the list, you will see the update.
 
```console
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi/sh $ ./api.account.update.sh
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi/sh $ ./api.accounts.list.sh
[
 {
   "Id": 1,
   "Name": "Dwight",
   "Address": "1901 Lynch Rd",
   "City": "Evansville"
 }
]
```
Now go back to the `index.js` screen and check your results.
 
```console
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi $ node index.js
IoT REST API running on port 3000
Query returned zero results.
[{"Id":1,"Name":"Dwight","Address":"1901 Lynch Rd","City":"Evansville"}]
```
Congratulations! You've now accomplished the second set of tests needed for updating your database. moving on, we will start getting into how to display the website in a website format. The next sections will get you acquainted with Angular framework.
 
## Scaffolding accounts.js
 
From the previous section above, in your `accounts.js` file you should have a total of six function calls. One should be a `/whoami`, with five calls actually hitting the database. The following order your file structure should be
 
- `router.get('/whoami', (request, response) =>`
- `router.post('/add', (request, response) =>`
- `router.get('/', (request, response) =>`
- `router.get('/:id', (request, response) =>`
- `router.post('/update', (request, response) => `
- `router.delete('/delete/:id', (request, response) =>`
 
Does this look familiar?
 
It's because our route calls are following the CRUD (Create, Read, Update, Delete) method. It goes from the creation of an account, reading the accounts of all and specific id, updating the account, and deleting an account based on the id. This helps when troubleshooting when our api calls are either not going through or appearing to go through but you do not receive an error message.
 
Confirm before moving on to the next section that you have the `accounts.js` file setup this way going forward. This file you developed will be required when a user handles any changes on the front end of the site.
 
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
|`CTRL+A+C`|Create a new window.|
|`CTRL+A+D`|Detach a screen, takes you back to your original terminal.|
|`CTRL+A+n`|Go to the next screen. |
|`CTRL+A+p`|Go to the previous screen. |
|`screen -r`|Resume a previous screen.|
|`screen -d -r -sessionnumber`| Reattach to a detached screen through the session number.|
|`screen -x session number`| Terminate a session screen.|
 
On Bash
 
| Commands | Definition |
|---|---|
|`#!/bin/bash`| Indicates that this is a bash script file. |
|`#`| Commented out line of code, will not execute that line.|
| `pipe command (cannot be viewed)` | Pipe command that takes the previous command and moves it into the next command. Note: don't include the parentheses. |



## References
 - https://en.wikipedia.org/wiki/HTTP_message_body
 - https://www.npmjs.com/package/body-parser
 - https://www.cyberciti.biz/tips/linux-screen-command-howto.html


## Continue to [Angular Framework setup](/web/ux/README.md)

<details><summary>Tutorial List</summary>

### Prep

[Raspberry Pi Prep](prep/README.md)<br>
[(Bonus) Flashing OS image to SD card: Linux Version](prep/README2.md)<br>

---

### Linux - WSl setup

[Operating System (Linux)](/linux/README.md)<br>
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





