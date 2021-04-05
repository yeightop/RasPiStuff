# (Part 1) Web API (Node)
 
## Table of Contents
[Overview](#overview)<br>
[Installing Node](#installing-node)<br>
[Directory Structure](#directory-structure)<br>
[Initialize Node Project](#initialize-node-project)<br>
[Running the Application](#running-the-application)<br>
[Hello Node Example](#hello-node-example)<br>
[Example Posting](#example-posting)<br>
[Shortcuts Cheat Sheet](#shortcuts-cheatsheet)<br>
[References](#references)<br>
 
 
<div id='overview'/>
 
## Overview
In this tutorial we will begin creating our API that talks to our database. In case you forgot to install all the required packages, install `Node` and the required dependencies we discussed in the previous tutorial section. Follow the steps below to begin preparing your installation of the Node stack.
 
As always, the code used in this tutorial can be used to create other programs by simply modifying the syntax.
 
<b>Note</b>: Throughout this tutorial, it's highly recommended having at least two terminals open. One should give you access to your Raspberry Pi The other should be open and connected on your host computer. In a later part of this tutorial, you will begin to work with multiple screens on the Raspberry Pi terminal. I will have a section on how to use Screen properly for this.
 
<div id='installingnode'/>
 
## Installing Node
 
<b>Note</b>: In case you already did this in the earlier section, you can skip to [Directory Structure](#directory-structure)
First you will need to enable the NodeSource repository on your Raspberry Pi. You can do this with the command below in your terminal:
 
```console
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
```
 
Now that the NodeSource repository is enabled we can install `node`.
 
NodesSource is a company that manages multiple versions of `node` for enterprise deployments. This allows us the flexibility of downloading and maintaining multiple versions of `Node` without conflicts arising.
 
Issue the command below to start the `Node` installation process. Be sure to answer the prompts as the package manager prompts for input.
 
```console
sudo apt install nodejs
```
Now that `Node` is successfully installed we can verify the installation by using the following command.
 
```console
node --version
```
The console will reply with the current `Node` version if successful.
 
```console
v10.23.0
```
 
<b>Note</b>: The version you receive may differ based upon the age of this article and versions available. Be sure to always check the version before you continue. This can help avoid any conflicts in the foreseeable future.
 
## Directory Structure
 
Before moving forward, I want to instill good design practices for you. Standard design practice includes folder structure, housekeeping, and deployment automation. Keeping a file structure where every file has a purpose of existing reduces headaches when you work with multiple files. Instead of having all your silverware bouncing around like a junk drawer, you have a place for all your forks, spoons, knives, measuring cups, and so on. No matter the size or number of files, everything should have its own space.
 
Our `IoT` application is named `iotapi` and on the Raspberry Pi it is located at the filepath `~/sictcweb/web/api/js/src/iotapi`. This is where the `Node` project is initialized and source code files are located, such as  `index.js` and `package.json`.
 
Most web applications are stored in a similar structure to `web/api/js/src/iotapi`. The structure clearly indicates to the user it is a `Javascript Web API` with the name `iotapi`, containing all of the source files. This structure permits the `src` folder to contain more than one application.
</br>
</br>
Before we begin, to show what folder navigation is like on the terminal, login to the Raspberry Pi and change directory to the desktop by issuing `cd Desktop`. If you type in `pwd`, this will print out the current directory you are in. You should be in a folder path similar to this.
 
```console
pi@raspberrypi:~ $ cd Desktop/
pi@raspberrypi:~/Desktop $ pwd
/home/pi/Desktop
```
 
You can always use the `cd ~` command to get back to the home directory. However, I advise not to create any project inside the root directory. This is considered not good practice and can lead to security risks.
Create the following directories and sub directories using the `mkdir` command as illustrated in the example below.
 
```console
mkdir sictcweb
mkdir sictcweb/web
mkdir sictcweb/web/api/
mkdir sictcweb/web/api/js
mkdir sictcweb/web/api/js/src
mkdir sictcweb/web/api/js/src/iotapi/
mkdir sictcweb/web/api/js/src/iotapi/sh
mkdir sictcweb/web/api/js/src/iotapi/sh/json
```
 
Great! Now we have our directory structure from which we will serve our `Web API` with all the inclusive directories and subdirectories. We can now move on to initializing the `Node` project.
 
## Initialize Node Project.
We will use `Node Package Manager` to initialize our new project.  On your Raspberry Pi terminal, change directory until you are in `sictcweb/web/api/js/src/iotapi`. This is where we want the new application initialized. Initialize our new project by issuing the `npm` command listed below while located in the folder path described above.
 
```console
npm init
```
If by chance you end up getting the `Error: EACCES: permission denied` message, you just need to use `sudo` in front of the command to allow the installation process to continue
<details>
<summary>Pro-Tip</summary>
Instead of writing out the whole command again, you can use <b>sudo !!</b> to execute the last command you did with sudo permissions. </details>
 
You will be given a series of prompts that must be filled. Fields like `author` and `description` you can fill in with your preferences. For any fields you desire to leave blank, just press `Enter` for leaving those fields blank. Below are some suggestions.
 
| Prompt | Answer | Description
|---|---|---|
|`package name:`| iotapi| name of The package in the application. |
|`version:`| 1.0.0| Version that you would like to start at.|
|`description:`| IoT REST API | Description of the api for users to see.|
|`entry point:`| index.js | Starting file.|
|`test command:`|  | Command that executes when using `npm test`. |
|`git repository:`|  | The git repo the api is placed at.|
|`keywords:`|  | Important keywords, possibly other applications this may interfere. |
|`author:`| Your name | Your name or other developers.  |
|`license:`|  | The license for this package. |
|`Is this OK? (yes):`| yes | Checking if everything you have entered is what you desire. |
 
Initialization creates a new file named `package.json`.  This file is used to store information about the `Node` project and their dependencies. Listed below are the contents of the example file that was created. 
 
```javascript
{
 "name": "iotapi",
 "version": "1.0.0",
 "description": "IoT REST API",
 "main": "index.js",
 "scripts": {
   "test": "echo \"Error: no test specified\" && exit 1"
 },
 "author": "John Cobb",
 "license": "ISC"
}
```
 
Note the error message under the scripts test section. This section is used for unit testing which will be covered in future topics.
 
## Running the Application
 
Awesome job so far!  Now we need a way to execute our application so that we can interface with the API(s) we create in our code. Our answer to this is using the package called `express`.
 
Express is a lightweight node application server that allows us to interact with our API(s). Install Express on your Raspberry Pi by issuing the commands below while in `sictcweb/web/api/js/src/iotapi`.
 
```console
npm install express
```
This will also create a new package dependency that will be added in your project. You can view this by issuing command `cat package.json`.
 
```console
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi $ cat package.json
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
   "express": "^4.17.1"
 }
}
```
## Hello Node Example
 
<b>Note</b>: I would like to reiterate that while testing, it's best to have multiple terminals running simultaneously. If you don't, you will be constantly moving back and forth all over your screen, which can add up to your mental fatigue. At the bare minimum, I'd suggest having two terminals open at all times: one for your Raspberry Pi and the other operating on your host computer. Later on in the tutorial, I will explain how to have multiple screens going on one terminal.
 
Let's get started by creating our first lines of code. Login to the Raspberry Pi (if by chance you logged out) and navigate to the `iotapi` directory.
 
<b>Note</b>: If you are ever unsure of where you are located, you can always issue the command `pwd`.
 
Create a new file in this `sictcweb/web/api/js/src/iotapi` folder named `hello-node.js`. Type the code below into the new file.
 
##### hello-node.js
```javascript
const express = require('express');
 
const app = express();
const PORT = 3000;
 
app.listen(PORT, () => console.log('Hello Node running on port 3000'));
 
app.get('/', (request, response) => {
   console.log(request.url);
   response.send('Hello, World');
});
```
Let's break this code down a bit. We have three constant variables created. One is creating an instance of `express` and is used with `app`. We also have `PORT` set to 3000.
 
Our variable `app` will use the function `listen` on port 3000 for any REST requests. This means any traffic channeled to port 3000 will transmit a response.  If a user requests the url, or types in the url to search for, the response back will be on the webpage `Hello, World`.
 
We can test the code above by running the command below on the Raspberry Pi terminal.
 
```console
node hello-node.js
```
 
Once the console displays the application is running, launch a browser on your desktop or host computer. Navigate to the address `http://you-raspberry-pi-ip-address:3000`. You should see a simple webpage message saying `Hello, World`. You can also do this on your main desktop terminal by using the curl command. Type in the following command on your host computer terminal, and you should get a response down below.
 
```console
hans@hans:~$ curl http://10.0.0.122:3000
Hello, Worldhans@hans:~$
```
 
Remember that your Raspberry Pi ip address may be something like xx.x.x.xxx like mine above or xxx.xxx.x.xx.
 
When you are done testing make sure to terminate the `node` process by issuing keyboard shortcut `CTRL+C` in the Raspberry Pi connected-terminal window.
 
<b>Note</b>: You see what I'm talking about with having multiple screens? The jumping around will get frustrating if forgoing multiple screens. Do not worry, you will see soon enough
 
Awesome job! Now that you have a node server working we can begin building our API calls. The remainder of this tutorial covers basic examples of exercising the HTTP methods mentioned in previous tutorials.
 
## Our First POST Method
 
In order for node to accept `POST` requests, we need to install the `body-parser` module. You can install the module by issuing the command below. Remember to run this while inside your `sictcweb/web/api/js/src/iotapi` folder.
 
```console
npm install --save body-parser
```
You can verify if the dependency is installed if you run the `cat package.json` command on your terminal.
 
```console
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi $ cat package.json
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
   "express": "^4.17.1"
 }
}
```
 
The `body-parser` parses information transmitted from the HTTP Message Body of the request. You can kind of think of this like a middleman, where `body-parser` extracts the key information to use for the data requests. in our case, this would be a JSON file. For a deeper understanding on this topic, see references section below.
 
Let's change the code that we created earlier in `hello-node.js` to reflect the example below. Here you can see we are creating a reference to `body-parser` and telling our `app` instance to use it with `PORT` still on 3000.
 
##### hello-node.js
```javascript
const express = require('express');
const bodyParser = require('body-parser');
 
const app = express();
const PORT = 3000;
```
 
Then we need to add the usage of the body parser and a post request delivery.
 
##### hello-node.js
```javascript
app.use(bodyParser.json());
app.listen(PORT, () => console.log('Hello Node running on port 3000'));
 
app.get('/', (request, response) => {
   console.log(request.url);
   response.send('Hello, World');
});
 
app.post('/', (request, response) => {
   const content = request.body;
 
   console.log(content);
   response.json(content);
});
```

## What is a JSON File?

From this section , you have seen a few instances that are requiring responses of files needing the extension `.json`. A JSON file is short for a JavaScript Object Notation. JSON files are common when data is transmitted through web applications. JSON files can be used independently from Javascript, with numeruous programms supporiting the abiltiy to read, or as its called parse, a JSON file and generate the results.

JSON files are string values, which helps with data being transmitted over a webs erver. They can then be converted into a native Javascript object. When reading a JSON file, the text is clear that a user would know what subject matter goes with what. JSON files are stuctured such as below, withthe differences in string, numbers, and boolean values.

```json
{
  "Subject": "subject matter",
  "Number": numbervalue,
  "IsTrueorFalse": true
  "ArrayMatter": [
    "Index1",
    "Index2",
    "Index3"
  ]
}
```

A real example could look appear like this.

```json
{
  "Id": 2615
  "FirstName": "Daniel",
  "LastName": "Smith",
  "Age": 20,
  "ActiveMilitary": false,
  "Interests": [
    "Baseball",
    "Videogames",
    "Classical Music"
  ]
}
```

Notice the differences at the top. For all the Data type names, like Subject, They are all enclosed in double quotes. Where the data starts is after the colon tag `:` and wither ends after the comma `,` or the conclusion of the curly brackets`{}`

For string values, you keep the information closed in double quotes to be read. 

If a number value is the data, you can keep the number value out without any special characters. So if you have a value as 3, just put 3.

On boolean characters, meaning is the value true or false, the value is also treated the same as a number. No special indication has to go around the value. All that is needed is either the indicator <b>true</b> or <b>false</b>.

With arrays, the values are kept in the square brackets `[]` and concludes where the ending square bracket is placed. Information placed inside here may be more specific details that pertain to just one subject on the data matter being passed. 

Keep in mind you can also layer more subjects upon subjects in a JSON file, but that is outside the scope of our initial tutorial. 

Remember that JSON is a pure string being passed with the specific data. There are no mthods that exist in the files. All you have a properties. When you are constructing a JSON file, one misplaced comma can cause errors when reading the file. Confirm before finishing that the JSON file is layered correctly. We will have more examples of using JSON files appearing later. 
 
## Example Posting
 
Now we will attempt to do some example posting. For this section, we will post with `example.json` with `curl`. If you don't have `curl` installed, you can confirm installation of curl by issuing `curl --version` on your terminal. If not, go ahead and install the package with the command below.
 
```console
sudo apt install curl
```
 
<b>Note</b>: Explaining the intricacies `curl` is beyond the scope of this tutorial and for a new user. If you get a `command not found` response, install `curl` using your package manager.
 
First we will need a `json` file to post to the `API`. Move into the directory `sictcweb/web/api/js/src/iotapi/sh/json`. Create a new file named `example.json` and type the contents below into the new file. Make sure to match the example below.
 
```javascript
{
 "id": 1,
 "message": "Hello API"
}
```
 
Now that the `json` file is created we can post this information to the `API` using `curl`. The `json` file represents the data being sent to the `API` for processing.
 
Now go back to the directory `sictcweb/web/api/js/src/iotapi`. On the Raspberry Pi, issue the command below to launch the javascript file.
 
```console
node hello-node.js
```
At this point, leave this terminal running while serving `hello-node.js`.  Open a new terminal on your host computer and connect via ssh into your Raspberry Pi. On this new terminal, navigate over to the file directory `/sictcweb/web/api/js/src/iotapi/sh/json`.
 
So at this point you should have <b>2</b> terminals open at the minimum that are connected to your Raspberry Pi.
 
When you have the new terminal at the correct location on your Raspberry Pi, execute the following command on the new terminal opened for your Raspberry Pi:
 
```console
curl -X POST -H "Content-Type: application/json" -d "@example.json" http://your-raspberry-pi-ip-address:3000
```
In the command above, make sure you keep the included quotes.
 
We are issuing `curl` with the option `-X`. The option `-X` asks for a custom request method, which we have as `POST`. The next command `-H` is our header in our request when sending out a HTTP request.
 
`"Content-Type: application/json"` is added to inform the request that it will look for a json type of file. Using `-d` sends the data as a POST request that can be thought of the same way you put information into an address bar to access a certain page. Because of the previous commands the `"@filelocation.json"` will specify where the information is stored at.
 
Finally, you put in your Raspberry Pi address, connecting to port 3000 like you did previously.
 
 
The `API` will respond with the `json` that was posted. You should see a message appear below in the terminal you issued the `curl` command.
 
```console
pi@raspberrypi:~ $ cd sictcweb/web/api/js/src/iotapi/
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi $ curl -X POST -H "Content-Type: application/json" -d "@example.json" http://10.0.0.196:3000
{"id":1,"message":"Hello API"}
```
 
And on the terminal where you have `hello-node.js` served:
 
```console
pi@raspberrypi:~/sictcweb/web/api/js/src/iotapi $ node hello-node.js
Hello Node running on port 3000
{ id: 1, message: 'Hello API' }
```
 
<b>Note</b>: If you run into the error `Warning: Couldn't read data from file "filename.json", this makes an empty POST`, you will still see a response on your terminal connected to your raspberry pi. The only thing is you will get an empty response on the other terminal.
There are a couple of things you can try.
 
- Check to see if you have the file location in correctly where the file exists.
- Check your `json` file you created and confirm the file is formatted properly.
- Confirm that you have two terminals connecting to the Raspberry Pi and not a terminal sending the command on your host computer. This was the most common error.
- When you execute the json file, be sure you are in the same directory where the json exists.
 
Before you start thinking ahead, the answer is you won't have to have multiple terminal windows running. In the next tutorial, you will learn how to call multiple screens for a single terminal without having to bring up new terminal windows, constantly bouncing around. In this tutorial, you only had to have 2 terminals open connected to your Raspberry Pi.
 
Go ahead and shut down `hello-node.js` with the keyboard shortcut `CTRL+C` and prepare for the next section.
 
## Shortcuts Cheatsheet
 
| Commands | Definition |
|---|---|
|`ssh pi@ipaddress`| Command to login to Raspberry Pi.|
|`raspberry`| Default login password for Raspberry Pi.|
|`cd`| Change directory command, used for moving to different file paths. |
|`touch filename`| Command to create a file. |
|`ls`| Command to list contents in a directory. Think of the contents you see on your desktop icons. |
|`pwd`| Command that prints the current directly, called print working directory|
|`whoami`| Command that displays the current logged in user. |
|`sudo`| Command to allow admin executions, short for `super user do`|
|`apt update`| Command to update repository. |
|`sudo !!` | Allows you to repeat the last command with sudo permissions. |
 
<details><summary>Pro-tip</summary>
 
When you are creating the directory structure, there is an easier way to create cascading directories. Instead of creating the directories one by one, you can issue a one liner using the option <b>mkdir -p</b>, with the <b>p</b> option being a parent or paths after the parent. So for example, you could have just created all the directories by doing the following:<br><br>
 
 
```console
mkdir -p sictcweb/web/api/js/src/iotapi/sh/json
```
Check out the [mkdir man page](https://man7.org/linux/man-pages/man1/mkdir.1.html) if you want to try it.
 
</details>
 
<details><summary>Pro-tip 2</summary>
 
In the common chance you misspell a file or desire to change the name, you can do this by issuing the `mv` command to overwrite the filename.
 
```console
mv badfilename newfilename
```
 
So in example
 
```console
hans@hans-VirtualBox:~/Desktop$ mv anewewfile.txt anewfile.txt
hans@hans-VirtualBox:~/Desktop$ ls
anewfile.txt
```
By using this method, you don't have to copy and remove a file, just move it over to the new name!
 
</details>

## References
 - https://en.wikipedia.org/wiki/HTTP_message_body
 - https://www.npmjs.com/package/body-parser


## Continue to [Part 2 Web API](README2.md)

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




