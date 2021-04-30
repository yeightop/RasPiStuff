# Getting Start with Node

## Table of Contents

[Overview](#overview)<br>
[Installing Node](#installing-node)<br>
[Hello Node Example](#hello-node-example)<br>
[References](#references)<br>

<div id='overview'/>

## Overview
In this tutorial we will get stared with out Node setup and build a simple javascript file. This will give an intro to the next tutorial, which will build our on the database you created in the previous tutorial. Before we can do this we need to install Node and required dependencies, which are called `modules`. Follow the steps below to begin preparing your installation of the Node stack. 

As always, the code used in this tutorial can be used to create other programs by modifying the syntax. It is also advisable to confirm you have all the tables built from [Part 4: Entity Creation](db/README4.md)

<div id='installing-node'/>

## Installing Node

First you will need to enable the NodeSource repository on your Raspberry Pi. You can do this with the command below. Type in the command below in your Raspberry Pi terminal:

```console
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
```

Now that the NodeSource repository is enabled we can install the program `node`.

NodesSource is a software company that manages multiple versions of `node` for enterprise deployments. This allows us the flexibility of downloading and maintaining multiple versions of `Node` without conflicts arising. Sometimes you need to test software on an older, but stable version, and comapre it with any conficlts that could happen. Common things to look for is breaking changes in new features.

Issue the command below into your Raspberry Pi terminal to start the `Node` installation process. Be sure to answer the prompts with as the package manager prompts for input.

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

<b>Note</b>: The version you receive may differ based upon the age of this article and versions available. Be sure to always check the version before you continue. This can help avoid any conflicts in the forseeable future.

Now that `Node` installation is confirmed, we need to install the node packages we will be using to build our application and Application Programming Interface or for short, `API`(s). 

Similar to `APT` that we were using in previous tutorials, `node` has its own package manager called `Node Package Manager` or `NPM` for short. NPM is used to manage packages for our applications. The Node community contains a rich source of prebuilt packages that can be deployed for use in your application.

Our application requires a package to manage our connection to `MySQL`, interface with `Environment`, and a minimal web application framework to test our app called `Express`. Because of this, we will need to download 3 additional packages.

Install the modules on your Raspberry Pi by issuing the commands below individually:

```console
npm install dotenv
npm install mysql2
npm install express
```

<b>Note</b>: You may need to use the `sudo` command in case you run into any permission errors. You may also need to keep an eye on the space you have allocated for your Raspberry Pi. This is why we recommend using an SD card of at least 8GB.


<div id='hellonodeexample'/>

## Hello Node Example

Now that we have all the prerequisites installed, we can start creating an example application. This application you can use to test out with example code and can be considered a separate file from the next section. 

In order to edit code on the Raspberry Pi in the terminal, we need to choose a text editor. So far, you have probably been using `nano`.  Nano is a simple text editor that allows editing files from the command line. I'd recommend using this, especially for a beginner. In later tutorials, where large amounts of code will go, we will show you a better source for editing files called Vim. 

On your Raspberry Pi terminal, create new file named `app_hello.js`. Do not worry about where you save this to, you can just use your Desktop location. This is just a simple one-file application. Remember you can create a new file using the `touch` command. Type the command below.

```console
touch app_hello.js
```

Now fire up nano by issuing the command below. This will bring you up a new terminal screen:
```console
nano app_hello.js
```
In front of you should be a blank, black screen that has the name of the file above. You can type in the text here and be able to save once you're finished. For a simple testing application, type or paste the example code below into the file.

```javascript
console.log("Hello Node!");
```
Save the file, if using nano, by issuing the keyboard shortcut `CTRL+O` or `CTRL+S` , and then exit by issuing the keyboard shortcut `CTRL+X`. 

<details><summary>Pro-tip</summary>If using Vim, you can save the file by using `:wq`. If you every have friends who like to keep you stuck in Vim, this is a life-saver</details>

<b>Note</b>: If you get a prompt asking where to save the file to, you can just overwrite the file you created with the same name.

Now we can test our new `app_hello.js` script by typing into the terminal the following:

```console
node app_hello.js
```
You should see ```Hello Node!``` printed to the console.

```console
pi@raspberrypi:~ $ node app_hello.js 
Hello Node!
```

Congratulations! You made your first simple node project! Keep this file for future references or to use for experimenting with different source code. Let's move on to the next lesson.


<div id='references'/>

## References
 - https://www.tecmint.com/linux-package-managers/
 - https://linuxize.com/post/how-to-install-node-js-on-raspberry-pi/
 - https://www.geeksforgeeks.org/scp-command-in-linux-with-examples/


## Continue to [Part 1 Web API](web/api/js/src/iotapi/README.md)

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

[Getting Started with Node](../web/README.md)<br>
[(Part 1) Web API (Node)](web/api/js/src/iotapi/README.md)<br>
[(Part 2) Web API (Node)](web/api/js/src/iotapi/README2.md)<br>
[(Part 3) Web API (Node)](web/api/js/src/iotapi/README3.md)<br>
[(Part 4) Web API (Node)](web/api/js/src/iotapi/README4.md)<br>
[(Part 5) Web API (Node)](web/api/js/src/iotapi/README5.md)<br>

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
