# (Part 2) Web API (Node)
 
## Table of Contents
[Overview](#overview)<br>
[Creating index.js](#creating-indexjs)<br>
[Bash Automation](#bash-automation)<br>
[Script Tests](#script-test)<br>
[Multiple Screens One Terminal (Screen)](#multiple-screens-one-terminal-screen)<br>
[Other Screen Shortcuts to know](#other-screen-shortcuts-to-know)<br>
[Shortcuts Cheat Sheet](#shortcuts-cheatsheet)<br>
[References](#references)<br>
 
 
## Overview
 
In this tutorial, we will start building our `API` system that will manage the `IoT` devices in our database. Before we do this, confirm you're logged into your Raspberry Pi. Follow the steps below to begin building out the system.
 
You are also going to learn a short tutorial on how to move through multiple terminal screens on one open terminal using Linux Screen. Knowing this will help you understand part three of using one terminal instead of 100 for different testing phases.
 
As always, the code used in this tutorial can be used to create other programs by simply modifying the syntax.
 
<b>Note</b>: Again, as mentioned in the previous tutorials, I highly encourage having multiple terminals on screen. One for your host computer, and the other for your Raspberry Pi. You will really start noticing the difference in this section.
 
## Creating index.js
 
Logged into your Raspberry Pi and ready to create?
 
Great! Let's get started by creating our first lines of code. On your Raspberry Pi, navigate to your `iotapi` directory by issuing the command: `cd sictcweb/web/api/js/src/iotapi/` from the terminal. Start by creating a new file on the Raspberry Pi and name it `index.js`.
 
##### Raspberry Pi terminal
```console
cd sictcweb/web/api/js/src/iotapi
```
Great, now create a new file on the Raspberry Pi named `index.js`.
 
If you haven't seen an `index.js` file, this is included in every `node.js` application. Think of your `index.js` file as the starting location for building routes for all your files. The index hosts and registers routes to handle HTTP requests and their ultimate destination.
 
The code below creates an instance of express that listens to REST requests on port `3000`. Type the code below into the `index.js` file.
 
##### index.js
```javascript
const express = require('express');
const path = require('path');
const app = express();
//const routeStates = require('./routes/states.js');
 
const NAME = require(__dirname + '/package.json').name;
// const libiotdb = require('./iotdb');
const PORT = 3000;
 
// app.use('/states', routeStates)
 
app.listen(PORT, () => console.log('IoT REST API running on port 3000'));
 
/*
* Example route testing that app is running.
*/
 
app.get('/whoami', (request, response) => {
   var url = path.join(request.baseUrl, request.url);
   console.log(url);
   response.send('<div><h1>Hello, States</h1></div>');
});
```
Save your changes and we will go over part of the code.
 
So similar in our previous tutorial, you probably see some variables that look familiar and some new code included. Again we are using the variables `express`, `path`, `app`, and `PORT` all acting in the same capacity from our `hello-node` example.
 
Our new `app.get` method processes requests sent to the `http://raspberrypi-ip/whoami` endpoint and responds with `Hello, States`. The request can also be sent via `http://localhost/whoami`. The `localhost` address is intended to be run while logged into the Raspberry Pi terminal.
 
We can test the code above by running the command below on the Raspberry Pi terminal.
 
##### Raspberry Pi terminal
```console
node index.js
```
Once the console displays the application is running, launch a browser on your desktop computer and navigate to `http://your-raspberry-pi-ip-address:3000/whoami`. You will see the message `Hello, States`. You could also get the same message using the `curl` command.
 
Awesome job! Now that you have a proper node server running, we can begin building other routes to manage the database records. Before we do that, I want to show how you can make testing easier in the next section. For now, go ahead and terminate the server process for `index.js` by using the keyboard shortcut `CTRL+C` before proceeding.
 
## Bash Automation
 
Now as we are starting to build our routes, I would like to offer some commands and steps to automate your deployment.
 
Typing the same commands repeatedly becomes cumbersome and leads to developer fatigue. Think about it, all day you will have to make various adjustments to your code, many of them by trial and error. These errors lead to frustration while working on a project. The last thing you want to increase frustration are small command executions caused by a mistype.
 
Automating these repetitive tasks not only increases quality of life but increases code quality and consistency while lowering your stress levels. For example, the task of issuing `scp` to move files over to the Raspberry Pi could be improved. Another repetitive task is using `curl` commands consecutively to test various `API` routes.
 
This section outlines some simple Shell scripts, noted by their extension `.sh`, assisting in automating those tasks for you. The first one will be just doing a GET request from google.
 
Create a new file in the `sictcweb/web/api/js/src/iotapi/sh` called `google.sh` and use `nano` to edit the script. Put in the two lines below in your new file.
 
##### google.sh
```console
#!/bin/bash
curl -X GET http://google.com
```
 
Great, but there's one additional command we need to execute on our `google.sh` script. We need to give the script execution permissions. From your Raspberry Pi's terminal, in the same directory where you created the script, issue the command illustrated below.
 
```console
chmod +x google.sh
```
When you invoke the `chmod +x` command on a file, you are giving the file execution permissions. Any shell script you make needs to have this permission set in order to run.
 
Awesome, let's test the new `google.sh` script. On you Raspberry Pi, issue the command below:
 
##### Raspberry Pi terminal
```console
./google.sh
```
You should see a reply from Google containing a bunch of `HTML`. It should look like something below.
 
##### Raspberry Pi terminal
```console
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="http://www.google.com/">here</A>.
</BODY></HTML>
```
 
Now let's make a different script, one that I think you would find immensely helpful. Do you remember the `arp` command in the earlier portion of the tutorials? Where were you trying to locate your Raspberry Pi on the network? I bet having that command in one stroke would solve some headaches.
 
Go back and open a terminal for your host, not your Raspberry pi, and create a new file called `findmypi.sh`. Add the `chmod +x` to the file to give it executable permissions.
 
Inside the `findmypi.sh` file, put in the following command.
 
##### findmypi.sh
 
```console
#!/bin/bash
 
arp -a | grep b8:27:eb | awk -v OFS='\t' '{print $4, $2}'
```
Save the file. Once you know your pi is up and running, execute the script using `./` before the file name. You should get back a number of hits or just one if you only have one pi located on the network.
 
##### Host terminal
```console
hans@hans:~$ ./findmypi.sh
b8:27:eb:1a:d5:1d   (10.0.0.196)
```
Instead of having to remember that entire line from above, I can now run that command off my host terminal and find my missing Raspberry Pi.
 
## Script Test
 
As we add more code to our files we will want to test. A method to follow is to test often and test small portions of your code. This allows us to discover errors before moving into a bigger project.
 
There are many methods for testing but we will cover a very simple one that you already did before: `curl`. Issuing the `curl` command on an `API` route simulates the same behavior that `HTTP` requests made by browsers and mobile applications. Our benefit with `curl` allows us to remain on the terminal and witness either success or failure of our code.
 
In terms of efficiency, these files can be chained together and automated.  As your application grows, don't worry it will, these convenient scripts will build upon one another to cover automation and testing of the entire system. This allows you as the developer to `design for test`.
 
`Design for Test`, simply put, is a methodology whereby each method and module of code has a specific test to exercise to determine the success of output. Kind of like each person has their one strength, and tested consistently in those lines. Long term, this speeds up development, increases code quality, and ensures system integrity.
 
Now it's time for you to test. On your local machine/host terminal, create a new field named `api.root.sh`. Copy and paste the example `Example API Test` script below into the new file and save.
 
##### api.root.sh
```console
#!/bin/bash
curl -X GET http://your-raspberry-pi-ip-address:3000/whoami
```
 
Exit out of your local machine's terminal. Add the execute permissions on the file using `chmod +x api.root.sh`.
 
Now move back to your Raspberry Pi terminal. If you left off from the previous section, you should still be in the `iotapi` directory. If not, navigate to the `iotapi` directory by issuing: `cd ~/sictcweb/web/api/js/src/iotapi`. Launch the `index.js` by issuing `node index.js`.
 
Now from your local computer's terminal, issue the following command.
 
```console
./api.root.sh
```
 
You should see the following response:
```console
<div><h1>Hello, States</h1></div>
```
 
We now have a completely automated test of our first `API` route. We will continue to build upon this script in the `iotapi/sh` folder. You may not realize it, but this was a huge step in learning how to automate test/deployment scripts. Although this is a small test, the concepts will follow the exact same way.
 
## Multiple Screens One Terminal (Screen)
Now I get the chance to explain all the notes from the previous section I was talking about with multiple screens.
 
By now, while on your Raspberry Pi terminal, you've probably had to stop and start multiple applications for testing. In the course of that time, you've probably also had to edit some files. Consistently doing this from one terminal screen is aggravating!
 
 
To get started. use your package manager to install Screen. On the Raspberry Pi terminal, issue the following command:<bt>
 
```console
sudo apt install screen
```
 
The application `Screen` allows you to split your terminal screen into multiple sessions by detaching and reattaching the sessions you have open. This is convenient when you want to run code and test that code using another utility from the terminal and must remain on the same client.
 
For example, let's assume I have new code to test in my `index.js` file. As a normal user, I can test the new code by issuing `node index.js`. Well, that's great, but now I have to open another terminal and issue my `curl` command. Now, how do I issue a `curl` command to test the new code without having to exit? That's where Screen comes to the rescue, especially when you can only have one terminal open for accessing your Raspberry Pi.
 
Before launching the new code I issue `screen -S customtermnailname`. This tells Screen to create a new screen session and label it `customterminalname` with the `-S` session name parameter. In my case, I named my new session window `OpenTerminal01`.
 
Once created you will see a new blank terminal window awaiting commands. To see if you are on a screen, you can issue the command `echo $STY`.
 
```console
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi $ echo $STY
2533.OpenTerminal01
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi $
```
 
The command above is short for Socket TYpewriter, which will display the session id and the terminal you named for the screen. For example, after I ran the first command `screen -S OpenTerminal01`, you saw the display as `2533.OpenTerminal01`.
If you issue the command `echo $STY` and you get a blank response, that means you are back on your original terminal and not on a screen.
 
To go back to the home and detach a screen, you can press the keyboard shortcut `CTRL+A+D`.
 
Now go back and reattach the new screen you recently created using the command `screen -r`. However if you have multiple screens, you will have to put the correct session id. The command for re-attaching to a screen when you have more than one available is `screen -d -r sessionnumber`.
 
While on that screen, create a new screen terminal with `screen -S customterminalname`. I set my `customterminalname` to `OpenTerminal02`.
 
Now that you have two screens going, you can toggle between windows by issuing the `CTRL+A` command and then `n` for the next window or `p` for the previous window. Note that you can only do this for any screens created in a screen, not from the home terminal.
 
So now I can run my `Node` application in one `Screen` session and test the application in another. You can keep going, create another `Screen` session to connect to the `MySQL` database query created and updated via your `API` as you make progress. The new screens can be called `OpenTerminal03` and `OpenTerminal04` respectively.
 
## Other Screen Shortcuts to know
 
When you first start working with `Screen`, you may notice how un-intuitive it is when you are trying to figure out what screen you are on. Don't worry, I'll give you some examples on the most common commands you'll need to remember. 
 
Continuing where you left off, if you haven't done this yet, create two more screens called `OpenTerminal03` and `OpenTerminal04`. So in total, you should have four screens operating simultaneously.
 
For when you lose track of all the screens you have active, you can issue the following command `screen -ls`. This will list all your attached and detached screens you have operating. By this portion of the tutorial, you should have four open, just as I have open below:
 
Now let's say I want to move over to my terminal `OpenTerminal03` in one command, instead of moving from page to page. We can do that by giving the command `screen -d -r -sessionnumber`. For my example, the session number is `2732`.
 
Now this will only work with terminal screens that have the status `Detached`. You can do this by going to the screen of your choice and pressing the shortcut `CTRL+A` then `D`. Before moving over to OpenTerminal03, set all the screens to detached. They should look like the following:
 
```console
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi $ screen -ls
There are screens on:
   2739.OpenTerminal04 (16/11/20 06:39:45) (Detached)
   2732.OpenTerminal03 (16/11/20 06:39:29) (Detached)
   2708.OpenTerminal02 (16/11/20 06:30:28) (Detached)
   2533.OpenTerminal01 (16/11/20 06:11:55) (Detached)
4 Sockets in /run/screen/S-pi.
 
```
 
<b>Note</b>: To get to the right screen, you will need to use the session number assigned to your terminal, not the name you created for the terminal. Otherwise you will be presented with the error `There is no screen to be resumed as yourterminalname`.
 
Just to be sure you are on the `OpenTerminal03`, you can issue the command `echo $STY` to verify.
 
For any left open terminals, you can close their session by using the command `screen kill sessionnumber` or `screen -x sessionnumber`. Note that you can kill multiple screens in the same line of the command by adding a space to each session number.
 
 
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
|`screen -ls`| Lists all of your available screens, attached and detached.|
|`CTRL+A+D`|Detach a screen, takes you back to your original terminal.|
|`CTRL+A+n`|While in a screen created from a screen, go to the next screen. |
|`CTRL+A+p`|While in a screen created from a screen, go to the previous screen. |
|`screen -r`|Resume a previous screen.|
|`screen -d -r -sessionnumber`| Reattach to a detached screen through the session number.|
|`screen -x sessionnumber`| Terminate a session screen.|
 

## References
 - https://en.wikipedia.org/wiki/HTTP_message_body
 - https://www.npmjs.com/package/body-parser
 - https://www.cyberciti.biz/tips/linux-screen-command-howto.html


## Continue to [Part 3 Web API](README3.md)

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
[(Part 2) Tables, Queries, and SQL](/db/README2.md)<br>
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


