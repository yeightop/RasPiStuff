# (Part 4) Web API (Node)
 
## Table of Contents
[Overview](#overview)<br>
[Building the Route](#building-the-route)<br>
[Integrating Index Router](#integrating-index-router)<br>
[Our First API Query](#our-first-api-query)<br>
[Unit Test](#unit-test)<br>
[Bash Automated Test](#bash-automated-test)<br>
[Add State](#add-state)<br>
[Adding the state json](#adding-the-state-json)<br>
[Delete State](#delete-state)<br>
[Get State](#get-state)<br>
[Update State](#update-state)<br>
[Shortcuts Cheat Sheet](#shortcuts-cheatsheet)<br>
 
## Overview
 
In this tutorial, we will begin integrating the database connectivity module `iotdb.js` into our first route called `States`. Connecting the module to our other javascript file will introduce the sample routes that you can create on the backend. The scaffolding will resemble how API routes are constructed in real-time application and can be reused as well.
 
Before we begin make sure you're logged into the Raspberry Pi. Follow the steps below to begin building out the system.
 
As always, the code used in this tutorial can be used to create other programs by simply modifying the syntax.
 
<b>Note</b>: Again, as mentioned before, I highly encourage having multiple terminals available. One for your host computer, and the other for your Raspberry Pi. Below is the cheat-sheet for using `Screen` from the short tutorial you used in the previous section.
 
## Building The Route
 
Are you ready to be blown away for this? Now we will create our first route, making the responsive connection.
 
Navigate to the `iotapi/routes` directory by issuing the command `cd sictcweb/web/api/js/src/iotapi/routes` from the Raspberry Pi terminal.
 
If by chance the folder `routes` is absent, go ahead and create the directory using the `mkdir` command while in `sictcweb/web/api/js/src/iotapi/` file path. Now use `cd` so that you are in the file path called `sictcweb/web/api/js/src/iotapi/routes`.
 
Once you're inside the `routes` directory, create a new file and name it `states.js`. Type into the file the source code below.
 
##### states.js
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
module.exports = router;
```
 
The code above does several things to prepare the route for integration with our `index.js` file.
 
<b>Requirements</b>: First it creates an instance to `express` and `express.Router()` modules. These modules allow the `Route` to handle incoming requests.
 
 <b>Constants</b>: Next our code integrates the database connection library created in a previous tutorial, specifically the `iotdb.js` file you just tested earlier. The file path you're specifying will go one file up and look for the name.
 
Our `body-parser` module is integrated for handling requests that `POST` information to the server via the body.
 
<b>Router.use</b>: Now after declaring our constants and variables required, we start handling the function calls of the code. The code takes our `bodyParser` and injects it into `router` so that it is ready to handle requests.
 
Finally we register our base address with the `whoami` route using the `GET` call to be able to send a response to the user.
 
<b>module.exports</b>: Also included at the bottom portion of the code is the line `module.exports = router`. This is needed at the end of any routes you create so Express can access the file.
 
Now if you try running this file alone, you will not find any results. The reason is we need to include this module in our `index.js` file, which is located in our `iotapi` directory.
 
 
#### Integrating Index Router
 
Great, now let's integrate the new route from `states.js` into `index.js` file. On the Raspberry Pi, navigate back a directory to `iotapi` command.
 
<b>Note</b>: At this point in the tutorial, I had a separate screen going since I kept jumping back and forth. I used the command `screen -S IndexRouterTerminal` to have the new screen going. This section you will specifically have to have two terminals going on the Raspberry Pi, one for serving `node` and the other for the `curl` execution.Remember if you ever feel like you get lost, you can always type in the `pwd` command to see where you are in the working directory.
 
Once you locate the `index.js` file, type in the example code into the `index.js` file with the editor of your choice.
 
##### index.js
```javascript
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const routeStates = require('./routes/states.js');
 
const NAME = require(__dirname + '/package.json').name;
const libiotdb = require('./iotdb');
const PORT = 3000;
 
app.use('/states', routeStates)
 
app.listen(PORT, () => console.log('IoT REST API running on port 3000'));
 
/*
* Example route testing that app is running.
*/
 
app.get('/whoami', (request, response) => {
   var url = path.join(request.baseUrl, request.url);
   console.log(url);
   response.send('<di><h1>Hello, States</h1></div>');
})
```
Not too much is different in this portion. If you notice when you bring up your file, most of the code should already be included. The only exception being the `const RouteStates` being included for initializing and using `app.use('/states'. routeStates)` to take what we have displayed for our States table.
 
Once you complete the  `index.js` modifications and `routes/states.js` is created, we can test using the `whoami` endpoint. The path to the state's whoami route is `/routes/states/whoami`. But for readability purposes in the address bar,  the actual path is `http://your-raspberry-pi-ip-address:3000/routes/states/whoami`. Let's give it a shot and issue the commands below to spool up the server and exercise it using `cURL`. Remember that your `localhost` or `raspberry-pi-ip-address` is the IPv4 address assigned to your Raspberry Pi, similar to `xxx.xxx.xx.x`.
 
<b>Note</b>: Again, as mentioned before, I highly encourage having multiple terminals available. One for your host computer, and the other for your Raspberry Pi that has multiple screens. I would go ahead and create a new screen with `screen -S CurlTesting` command.
 
On one Raspberry Pi terminal, sessions navigate to the `iotapi` directory and issue `node index.js`.
 
```console
node index.js
```
On another screen window , navigate to the `iotapi` directory and issue the command below to test the route.
```console
curl http://your-raspberry-pi-ip-address:3000/states/whoami
```
You should see the reply `/states` from the `curl`.
 
```console
pi@raspberrypi:~ $ curl http://192.168.1.18:3000/states/whoami
/statespi@raspberrypi:~ $
```
When you navigate back to the screen serving `node` you should also see a response initiated.
 
 
```console
IoT REST API running on port 3000
/states
```
 
Now that we have our first route built and the `whoami` endpoint is working we can begin to wire in our database calls.
 
## Our First API Query
 
Now is the next test, where we get to make a query to the API. Add the following code below to the bottom of `routes/states.js` file.
 
##### states.js
```javascript
router.get('/', (request, response) => {
 
   const queryString = 'SELECT Id, State FROM States';
 
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
<b>Note</b>: Also be sure that `module.exports = router` is still at the bottom of the `states.js` file.
 
Now for a little breakdown
 
Our constant `queryString` is similar to what a user would enter if they were in the database. This will take looking at the `Id` and `States` listing for checking in the if-else statements below.
 
Using the `libiotdb` library we imported at the top of the file, the query string will begin its parsing process. This variable `libiotdb` represents the `iotdb.js` module we built in previous tutorials. The `.pool.query` is part of the Javascript tools when passing in a query connection. This gives our route the connectivity it needs to communicate with the database. When this is performed, we have two `if` statement checks with a default `else` for the user.
 
If our query is wrong or doesn't match syntax, this will respond with an error, reporting a 500 error code. If the results of the query is longer than zero, meaning there are states listed in the selection, the response will deliver the results located in the database. The else statement is if the states table is empty, no results will be posted from States.
 
 
Save the `routes/states.js` file with the newly added code. Before we begin, we need to terminate our existing `node`. On the terminal session serving `index.js` issue `CTRL+C` to terminate, followed by `node index.js`. Navigate to another terminal screen session and issue the `curl` command below.
 
```console
curl -X GET http://your-raspberry-pi-ip-address:3000/states
```
 
Depending on the number of states you entered in previous tutorials you may get different results. I provided my results below.
 
#### Console Results
```javascript
[{"Id":3,"State":"FL"},{"Id":1,"State":"IN"},{"Id":2,"State":"OH"}]
```
Now if you haven't created anything in your States category yet, you will get the following errors:
 
```console
pi@raspberrypi:~ $ curl -X GET http://192.168.1.18:3000/states
"{\"code\":\"ER_NO_SUCH_TABLE\",\"errno\":1146,\"sqlState\":\"42S02\",\"sqlMessage\":\"Table 'iot.States' doesn't exist\"}
```
and on the terminal serving `node`
 
```console
ERROR: Error: Table 'iot.States' doesn't exist
/home/pi/sictcweb/web/api/js/src/iotapi/routes/states.js:
```
Which means you need to go back to [Part 4: Creation Entity](/db/README4.md)
 
Time to celebrate! We just connected our first `API` route to the database and pulled data. Let's keep the party going.
 
## Unit Test
 
<b>Note</b>: There is one dependency you'll need to install using package manager at this point of the tutorial. Before moving on, go to your Raspberry Pi terminal enter the following command: `sudo apt install jq`. The `jq` program allows us to format and run other operations on`JSON` output from the terminal.
 
For our next step, we need a `curl` automation test so we can ensure code quality. Create a new screen if you have to and navigate to `sictcweb/web/api/js/src/iotapi/sh` directory. Create a new file named `api.state.list.sh`. Type the contents of the bash command in the example below into the file.
 
##### api.state.list.sh
```console
#!/bin/bash
 
# Change working folder
cd "$(dirname "$0")"
 
# Get States: (local:remote)
curl -s -X GET http://your-raspberry-pi-ip-address:3000/states | jq .
#curl -s -X GET http://localhost:3000/states | jq .
```
 
Remember to replace the `your-raspberry-pi-ip-address` portion with your Raspberry Pi address.
 
Save the file and exit to the terminal. We need to give this file execute permissions so issue the `chmod +x api.state.list.sh`. Voila, we now have our first automated test script to exercise our first endpoint.
 
 
## Bash Automated Test
 
<b>Note</b>: There are two `curl` commands listed in the file. One is commented with the `#`, which is considered to be a commented out line of code, so that it does not run. You can choose how you want to run the test; from the Raspberry Pi, or from your local computer's terminal. Either way, if you uncomment one, be sure to comment on the other. Remote testing requires the `bash` file on your local machine. Pay attention, most systems are tested remotely. The tutorials assume you are testing from one of your Raspberry Pi terminals.
 
Okay now let's test our script. On your Raspberry Pi, execute the script with `./api.state.list.sh`. You should get something similar to the results below. Again, you will probably need another screen going to see the results. And remember to have `index.js` running.
 
##### Terminal Results
```javascript
[
 {
   "Id": 3,
   "State": "FL"
 },
 {
   "Id": 1,
   "State": "IN"
 },
 {
   "Id": 2,
   "State": "OH"
 }
]
```
<b>Note</b>: The JSON is output in a more uniform format compared to the `curl` commands we ran earlier in the README.
 
## Add State
Now that we have our first route connected, we can build the remaining routes for processing records. On your Raspberry Pi terminal, navigate to and edit the `iotapi/routes/states.js` file. Type or paste the code below at the bottom of the file. 
 
##### states.js
```javascript
 
router.post('/add', (request, response) => {
   const content = request.body;
   const queryString = 'INSERT INTO States (State) VALUES(?)';
 
   libiotdb.pool.query(queryString, [content.State], (error, result, fields) => {
       if (error) {
           console.log("ERROR: " + error);
           response.status(500).json(JSON.stringify(error));
       } else {
           // respond with success and the new id
           response.status(200).json({"Id": result.insertId});
           console.log({"Id": result.insertId});
           response.status(200).end();
       }
   }); 
});
```
 
Note the difference between the first route we created and this one above. Let's observe some of the changes going into the file.
 
The first route we created lists all states and requires a `router.get` which tells the router to handle the `HTTP GET` verb. Our new add route processes a `JSON` file via the `HTTP POST` verb, which you can see with `route.post`. We also have a new query string that will be injected `INSERT INTO States`. This will then go into a check giving an error or successful post.
 
If the user inserts a new state will be successful, what will be posted back is the new `Id` issued to the state of your choice.
 
<b>Note</b>: Remember to have `module.exports = router;` at the bottom of the `js` file.
 
## Adding the state json
 
In order to write our test script, creating a new JSON file representing the new state is required. You can't exactly add a state if you don't create one for the code to read.
 
Back out of the `routes` directory using `cd ..`. Navigate to the file path `sictc/web/api/js/src/iotapi/sh/json`. Now create a new file in this folder called `state.add.json`. This file will be posted using our automated shell script. Type or paste the contents of the `JSON` file below into `state.add.json`. For this example, we will add Wyoming.
 
##### state.add.json
```javascript
{
   "State": "WY"
}
```
 
Save the file and exit back to the terminal (or move around the screen you created if this is the case). Navigate back one directory by issuing the `cd ..` command until you're in the `iotapi/sh` directory.
 
<b>Note</b>: You can confirm by issuing the `pwd` command. You move around the terminal a lot, there's no shame in confirming your location.
 
Next we will create the script to test our new `/state/add` route and accompanying `JSON` file. Type or paste the example script below in a new file named `api.state.add.sh`.
 
##### api.state.add.sh
```console
 
#!/bin/bash
 
# Change working folder
cd "$(dirname "$0")"
 
# Add: (local:remote)
curl -s -X POST -H "Content-Type: application/json" -d "@json/state.add.json" http://localhost:3000/states/add | jq .
#curl -s -X POST -H "Content-Type: application/json" -d "@json/state.add.json" http://raspberrypi-ip:3000/states/add | jq .
```
 
Save the file and exit back to the terminal (or screen depending on your preference). Again, we need to execute permissions on this script. Go ahead and issue `chmod +x api.state.add.sh` for the file.
 
Now, we are now ready to test our new route. Navigate to another terminal window (or screen) that isn't your main terminal and restart the `index.js` file. Remember? `node index.js`.
Once we're up and running, navigate back to your home terminal on the Raspberry Pi and run the script.
 
```console
./api.state.add.sh
```
 
The console result reports back the new id created for the newly added record. You `Id` number may be different, depending on how many states you have added into your database previously.
 
##### Terminal Results
```javascript
{
 "Id": 6
}
```
 
And if you check on your terminal that executed `node index.js`, you should see something similar.
 
```console
IoT REST API running on port 3000
{ Id: 3 }
```
 
Keep this script handy as we will be using the same concept to remove data. If you forget you can always login to `MySQL` console and query the States table for all records.
 
Be aware that you will be adding more with states that get implemented. Specifically, you will be building the scripts and `js` files needed to delete, get, and update for states.
 
## Delete State
 
You know, I have a good feeling that maybe there is a state you don't like. It's okay, there's always ribbing between Indiana and Kentucky, and at least once every four years one state threatens to secede. Considering the aftermath of 2020, we got some states acting like mini kingdoms.
 
Use what you've learned thus far to create the delete route below. You'll need the following.
 
### TODO
| Do | To What |
|---|---|
| Paste Code Below |`iotapi/routes/states.js`|
| Paste JSON Below | `iotapi/sh/json/state.delete.json` |
| Paste Shell Script Below |`iotapi/sh/api.state.delete.sh`|
| Give Shell Script Execute Permissions|`chmod +x sh/api.state.delete.sh`|
| Run Shell Script | `./api.state.delete.sh` |
 
##### states.js
```javascript
 
router.delete('/delete', (request, response) => {
   const content = request.body;
   const queryString = 'DELETE FROM States WHERE Id = ?'
 
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
From the previous script above, it takes in the same arguments, except now it's deleting the state from your table instead of inserting the data.
 
##### state.delete.json
```javascript
{
   "Id": 6
}
```
Remember that your `Id` may be different than above. In my case, it was 3.
 
##### api.state.delete.sh
```console
 
#!/bin/bash
 
# Change working folder
cd "$(dirname "$0")"
 
# Delete: (local:remote)
curl -s -X DELETE -H "Content-Type: application/json" -d "@json/state.delete.json" http://localhost:3000/states/delete
#curl -s -X DELETE -H "Content-Type: application/json" -d "@json/state.delete.json" http://raspberrypi-ip:3000/states/delete
```
 
If you execute the script, you should have a `Success` message appear on the terminal serving `node index.js`
 
Use what you've learned to follow the `TODO's` in each of the remaining sections. We have `Get State` and `Update State` remaining. On this section, I would highly encourage using a separate screen for the steps. Use your main terminal to execute the scripts and use a separate screen for creating the files and serving `node index.js`
 
## Get State
 
### TODO
| Do | To What | Linux screen or main terminal |
|---|---|---|
| Paste Code Below |`iotapi/routes/states.js`| screen |
| Paste Shell Script Below |`iotapi/sh/api.state.get.sh`| screen |
| Give Shell Script Execute Permissions|`chmod +x sh/api.state.get.sh`| screen |
| Run Shell Script | `./api.state.get.sh` | main terminal |
 
##### states.js
```javascript
 
router.get('/:id', (request, response) => {
 
   const content = request.params;
   const queryString = 'SELECT Id, State FROM States WHERE Id = ?';
 
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
 
##### api.state.get.sh
```console
#!/bin/bash
 
# Change working folder
cd "$(dirname "$0")"
 
# Get State: (local:remote)
curl -s -X GET http://localhost:3000/states/1 | jq .
#curl -s -X GET http://raspberrypi-ip:3000/states/1 | jq .
```
 
## Update State
 
### TODO
| Do | To What | Linux screen or main terminal |
|---|---|---|
| Paste Code Below |`iotapi/routes/states.js`| screen |
| Paste JSON Below | `iotapi/routes/sh/json/state.update.json` | screen |
| Paste Shell Script Below |`iotapi/sh/api.state.update.sh`| screen |
| Give Shell Script Execute Permissions|`chmod +x sh/api.state.update.sh`| screen |
| Run Shell Script | `./api.update.get.sh` | main terminal |
 
#### states.js
```javascript
router.post('/update', (request, response) => {
   const content = request.body;
   const queryString = 'UPDATE States SET State = ? WHERE Id = ?';
 
   libiotdb.pool.query(queryString, [content.State, content.Id], (error, result, fields) => {
       if (error) {
           console.log("ERROR: " + error);
           response.status(500).json(JSON.stringify(error));
       } else {
           console.log('Query returned zero results.');
           response.status(200).end();
       }
   }); 
});
```
 
##### state.update.json
```javascript
{
   "Id": 1,
   "State": "FL"
}
```
 
##### api.state.update.sh
```console
#!/bin/bash
 
# Change working folder
cd "$(dirname "$0")"
 
# Update State Test: (local:remote)
curl -s -X POST -H "Content-Type: application/json" -d "@json/state.update.json" http://localhost:3000/states/update
#curl -s -X POST -H "Content-Type: application/json" -d "@json/state.update.json" http://raspberrypi-ip:3000/states/update
```
 
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
|`screen -x sessionnumber`| Terminate a session screen.|
 
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


## Continue to [Part 5 Web API](README5.md)

<details><summary>Tutorial List</summary>

### Prep

[Raspberry Pi Prep](/prep/README.md)<br>
[(Bonus) Flashing OS image to SD card: Linux Version](/prep/README2.md)<br>

---

### Linux - WSl setup

[Operating System (Linux)](linux/README.md)<br>
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

[Getting Started with Node](../../web/README.md)<br>
[(Part 1) Web API (Node)](../iotapi/README.md)<br>
[(Part 2) Web API (Node)](../iotapi/README2.md)<br>
[(Part 3) Web API (Node)](../iotapi/README3.md)<br>
[(Part 4) Web API (Node)](../iotapi/README4.md)<br>
[(Part 5) Web API (Node)](../iotapi/README5.md)<br>

---

### UX

[Angular (Web Framework Setup)](../ux/README.md)<br>
[Angular (Web Framework) (Part 1)](../ux/README2.md)<br>
[Angular (Web Framework) (Part 2)](../ux/README3.md)<br>
[Angular (Web Framework) (Part 3)](../ux/README4.md)<br>

---

### API

[Installing MySQL Connector for Python](web/api/py/README.md)

</details>



