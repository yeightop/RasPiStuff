# Angular (Web Framework) (SETUP).

## Table of Contents
[Overview](#overview)<br>
[What is Angular](#what-is-angular)<br>
[Starting A New Project](#starting-a-new-project)<br>
[Dependencies](#dependencies)<br>
[CORS Addition](#cors-addition)<br>
[Init A New Project](#init-a-new-project)<br>
[Run The Project](#run-the-project)<br>

## Overview
In this tutorial you are going to cover how to setup, design, and build a user-experience or `UX` that will bring your database creation to life! For creating the user experience, you will be working with a development language called `Angular`. This continues the creation with the Accounts table created in `Building API (Node)`. Now the user will be able to see and directly interact with the database.

This section we will get the dependencies and our initali default page setup first. Please follow along carefully as this will continues into the next section.

## What is Angular
`Angular`, or better know as `Angular Framework`, is a TypeScript-based open-source web application framework that is similar to Javascript. The advantages of `Angular` as a front-end application is it encompasses several coding languages that just Javascript. Think of it as if you are using a Swiss-army knife . For example, website visuals use `HTML` & `CSS` when creating color-coordinating patterns. Where the functinal programming is called in, thar is `Typescript`.

Angular symbolizes a fantastic solution for large web pages that serve multiple functions and incorporate dynamic responses. This is because Angular Framework breaks down webpages as components. Component organization is imperative and helps with clean design in Angular. For example, you might create a component for the home page and a component for the login page.

Since you have already created the API calls and established the MySQL database, you know need a way to present the infromation for general users. Administrative assistants such as Clark and Becky would like a website facing client instead of navigating through the terminal (Although we would encourage them to learn it). So to begin, let's create our first Angular Project.

### Dependencies

Angular is a dependency-heavy application. Angular requires certain packages to keep everything moving and not breaking on your end. Before you start building your new application, its always a good idea to add in the required ependencies first.

Before we begin, verify `npm` is installed on your Raspberry Pi. You can check by using the following command.
```console
node --version
```
If you don't already have node, run the following commands.

```console
sudo apt update
sudo apt upgrade
sudo apt install nodejs
```
Lucky for you, we only need a couple of dependencies. The first dependency we need is Angular CLI aka Angular Command-Line Interface. Run the following command in your project directory. This angular app will reside inside your  `/sictcweb` directory. You can decide your preferance ot answer the prompt of sharing data wiuth the Angluar Team at Google.
```console
sudo npm install -g @angular/cli
```
Angular CLI is a command-line interface tool that allows a user to build their application from a command shell environment. Besides building, it also allows a user to test and maintain changes on the fly is the application resides on a different computer. Sounds pretty handy right?

The next dependency needed is called Cross Origin Resource Sharing, better known as `cors`. This package will help you allow your API to make calls when making changes on the database from the Angular website. While inside the `/sictcweb` directory, execute the following command.

```console
sudo npm install cors
```
Without getting into heavy detail, the `cors` package will allow requests to interact with the server and with other origins than what your angular application allows. Browsers by default restrict any cross origin HTTP requests in the case of malicious attacks. Without having a CORS mechanism, anyone could interact with the system and expose vulnerabilites.

## CORS Addition

As explained earlier, CORS needs to be anabled so that your database when online will be able to talk to website interface. Without CORS allowing cross-origin requests, you will get a denial message each time on your page. You need to add the CORS functionality to a couple of files you made in the Web API tutorila before continuing. You'll need to edit your `index.js` and your `accounts.js` files

Navigate to `sictcweb/web/api/js/src/iotapi` and open `index.js`. At the top add the following.

##### index.js
```javascript
const cors = require('cors');
```

and after the seciton where you declare all your `const` variables, add this line.

##### index.js
```javascript
app.use(cors());
```

Now do the same with your `accounts.js` file located in `sictcweb/web/api/js/src/iotapi/routes`. Keep the `const` line the same, but alter the use portion like so.

##### accounts.js
```javascript
router.use(cors());
```

This will enable all CORS requests.

<b>Important</b>: This practice is not recommended when you are putting your website out for the public. Allowing all CORS requests can lead to malicious attacks if someone has information to your IP. However for this tutorial, and being on a local network, it will suffice.


### Init A New Project
With all the dependencies in check, now we can create a new project. This will create a new project under your current directory that will house all of our source code. SO just make sure you initialize the new app in your `/sictcweb` root directory.
```console
ng new angular-iot-app
```
Next you will get some options to choose from. They are listed below.

| Commands | Definition |
|---|---|
|`Do you want to enforce stricter type checking?`| No |
|`Would you like to add Angular routing?`| Yes |
|`Which stylesheet format would you like to use?` | SCSS (Must be selected either by mouse or direction keys / 2nd option) |

Be patient as the website builds. A lot of packages will be added into your project. Your Raspberry Pi may take more time than usual to install the initial application. The application may seem unsresponsive on your terminal screen, but it will soon begin to populate. Just give it a couple of minutes.

### Run The Project
Now lets check to make sure our project installed and runs correctly. Access the project name `angular-iot-app` and run the following command.
```console
ng serve
```

Once the website has been built successfully, you will receive a message in the terminal about it. Now open a screen on your Raspberry Pi terminal and type in the curl command
```console
http://localhost:4200
```
If your application is running, you should get a message below of the syntax that is happening in the background.

```console
pi@raspberrypi:~/sictcweb/angular-iot-app $ curl http://localhost:4200
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AngularIotApp</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.css"></head>
<body>
  <app-root></app-root>
<script src="runtime.js" defer></script><script src="polyfills.js" defer></script><script src="vendor.js" defer></script><script src="main.js" defer></script></body>
</html>
```
If you either see this or see a webpage appear on your browser, then congratulations! You just got your first angualr app up and running.

Now in case you cannot reach the local host destination, theres a couple of things we can do. The address `localhost:4200` is the default address given when serving an angualr app. Chances are that address may already be taken.

- Serve the angular app on a different port. To do this, use the command `ng serve --port XXXX` with replacing the X values with a different port. An example is `ng serve --port 5555`.
- Try typing in your entire IP address for your raspberry pi. You can do this either on your Raspberry Pi terminal or oon the browser to see if any activity appears.
- Check for the connections where the `ng serve` is listening at. You can do this with the command `sudo netstat -nltp`. You should get something back like the following.

```console
pi@raspberrypi:~/sictcweb/angular-iot-app/src/app/new-acc $ netstat -nltp
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      -                   
tcp        0      0 127.0.0.1:4200          0.0.0.0:*               LISTEN      2245/ng serve       
tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN      -                   
tcp6       0      0 :::22                   :::*                    LISTEN      -  
```

Notice where you have the `ng serve` at? This will give you the correct location the server is listening at.

## Continue to [Angular Part 1](README2.md)

## Shortcuts Cheatsheet

| Commands | Definition |
|---|---|
| ng new angularprojectname | Creates a new Angular project. |
| ng serve | Will serve your website, default port 4200. |
| ng serve --port #### | Will serve your website on a port you choose. |
| netstat -nltp | Shows the network statistics and protocols. |

<details><summary>Tutorial List</summary>
<br>

### Prep

[Raspberry Pi Prep](/prep/README.md)<br>
[(Bonus) Flashing OS image to SD card: Linux Version](prep/README2.md)<br>

### Linux - WSl setup

[Operating System (Linux)](linux/README.md)<br>
[Toggle Raspberry Pi led light](linux/embed/README.md)<br>
[Autoboot Services](linux/embed/sysd/README.md)<br>

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
[(Part 5) Web API (Node)](web/api/js/src/iotapi/README4.md)<br>

### UX

[Angular (Web Framework Setup)](../ux/README.md)<br>
[Angular (Web Framework) (Part 1)](../ux/README2.md)<br>
[Angular (Web Framework) (Part 2)](../ux/README3.md)<br>
[Angular (Web Framework) (Part 3)](../ux/README4.md)<br>

### API

[Installing MySQL Connector for Python](web/api/py/README.md)

### Cryptography

[Crypto](web/CRYPTO.md)<br>

</details>
