# Angular (Web Framework) (Part 1).

## Table of Contents
- [Overview](#overview)<br>
- [Load A Landing Page](#load-a-landing-page)<br>
    - [Creating A Landing Page](#create-a-landing-page)<br>
- [Creating A Service and Interface](#creating-user-auth)<br>
    - [Services](#services)<br>
    - [Interfaces](#interfaces)<br>

## Overview
This first section will cover the basics of getting your landing page set up and creating the service and interface sections. setup and hosted as well as creating a form of user auth. The landing page is where we want our users to land, also called the home page in many cases. We will not be covering how to add an account in the section so please take the time and go back to your `MySQL` and make sure that your accounts table has been populated with at least one account as you will need to call that account to be able to login.

## Load A Landing Page
First to kick off your project we will want to host our app that we have created. We can do this with the `ng` selector coupled with our designator, which will be `serve`. In the terminal run the following command while inside the root directory.
```cmd
ng serve
```
You should recieve the following response in your terminal
```json
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
✔ Compiled successfully.
```
If this does not work then please go back to setup and start check to make sure you have done everything correctly.
If it does work then go to your brower and go to `http://localhost:4200/`
You should see a long list of code and some information about to angular. Congrats! Your page works and you can begin on a landing.
Go ahead and remove all code from the `app.component.html`.

## Creating A Landing Page
For our landing page, or something visible that you can hit to ensure that the code is working properly, we will be making a title bar. This title bar will be set up so that it displays on all pages no matter condition. To do this we will use `<router-outlet>` in our `HTML`

What is a `<router-outlet>`? It allows you to define where a Parent Component ends and a Child Component begins. In this instance all components are children of the app component as they are held in a sub directory. This means that all components within the app folder are actually children of app. For this reason `app.component.html` is always displayed by default. We add the router outlet to tell the component that there is a child component that must be displayed below it. 

<b>Note</b>: The tag will always go below any code we want to display beyond the parent component.

- To start editing, navigate until you are in your `sictcweb/angular-iot-app/src/app` folder. 
- Run `ls` and you should see a couple of new files. You want to edit the file `app.component.html`

```console
pi@raspberrypi:~/Desktop/sictcweb/angular-iot-app/src/app $ ls
app.component.html  app.component.spec.ts  app.module.ts
app.component.scss  app.component.ts       app-routing.module.ts
```
There's a couple of files in here at the root folder. All of these we will touch on down the road.

- Open your `app.component.html` and add the following code.

```html
<body class="body">
    <div class="title-bar">
        <div class="title-string">
            IoT Web Page
        </div>
    </div>
    <div class="pg-body">
        <div class="sub-title">
            Welcome To The IoT WebPage
        </div>
        <img class="IoT-img" src="https://thumbs.dreamstime.com/b/simple-black-iot-thin-line-logo-concept-internet-things-futuristic-digital-world-wi-fi-waves-fintech-contour-flat-130932853.jpg">
        <div class="page-msg">
            This Page will harness the full potential of all your Node API Routes!
        </div>
    </div>  
    <router-outlet></router-outlet>
</body>
```

What we are adding to the html file is what will be displayed on the screen for the user to see. For example, when a person comes to our landing page, they should be greeted with the message 

Now that we have our elements we will need to add some styling to the `app.component.scss` file.
```scss
.body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    .title-bar {
        background-color: rgb(0, 0, 0);
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        .title-string {
            font-size: 50px;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            color: rgb(255, 255, 255);
        }
    }
    .pg-body {
        margin-top: 40px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .sub-title {
            font-size: 25px;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        }
        .IoT-img {
            width: 350px;
        }
        .page-msg {
            font-size: 18px;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        }
    }
}
```

Now that the our code is added for the landing lets go ahead and serve it up. If you see a large black bar at the top with the words "IOT WEBPAGE" then congrats! You can move on to the next section.

## Creating A Service and Interface
Interfaces and Services are two other major components that we will need before we can begin to lay our website out. 
Interfaces and Services are data handling and organizing files that will allow us to intereact with the `HTTPClient` and inevitably our server. Lets start off with Interfaces. 

### Interfaces
First of we will need an interface so that we can comfortably organize and limit our objects to only the information we need. An interface is like a model for an object that we want to use. A mold if you will. This will allow the us to specify the type of data and its header inside a json object. This way instead of creating a new variable for an object and the populating it with a list of variables for values. You simple all the object and specify if it is a singular object or an array. Let's set up our own intefaces to handle all of the accounts.

Create a folder iniside of the `sictc/angular-iot-app/src/app` directory called <b>core</b>. Navigate into the `/core` directory and make another folder labeled `interfaces`. So you should have a directory style like the following.

```console
i@raspberrypi:~/Desktop/sictcweb/angular-iot-app/src/app $ sudo mkdir core
pi@raspberrypi:~/Desktop/sictcweb/angular-iot-app/src/app $ cd core/
pi@raspberrypi:~/Desktop/sictcweb/angular-iot-app/src/app/core $ sudo mkdir interfaces
pi@raspberrypi:~/Desktop/sictcweb/angular-iot-app/src/app/core $ ls
interfaces
pi@raspberrypi:~/Desktop/sictcweb/angular-iot-app/src/app/core $ 
```

While inside the directory `sictc/angular-iot-app/src/app/core/interfaces`, execute the following command in your terminal.
```cmd
ng generate interface accounts
```
Now you should see a new folder labeld accounts containing a file called `accounts.ts`. Move this file into your interfaces folder and open it up. Remove all the code and add the following.
```ts
export interface Account {
    Address: string;
    City: string;
    CreatedDate?: string;
    Id?: number;
    Name: string;
    State: string;
    Zip?: string;
}
```
A little explination here. Here we have create an interface or in simpler terms a json mold. Anytime we add the `?` means that the field is not required or can be null if the object still has the other required data's and their types. Now if we wanted to define a set of data inside of `.ts` then we can simply define as `Account` instead of say `string` or `{}`. This is also useful because it insures that we won't be passing any data that does not fit exactly what we need.

### Services
Now that we have our interface, we will need a service file to fetch and send all the actual data values we need from our node server. Now inside your `core` folder create another called `services` and then run the following command.
```cmd
ng generate service accounts
```
Then place the new file inside of our `core/services` folder.

Now open the file.
The first thing we need to do is to add all of our imports. This will include things like the `HTTPClient` and the `Account` inteface. Now add the following code at the very top of the page.
```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../interfaces/accounts';
```
Now that everything we will need has been imported go ahead and add the rest of the following code.
```ts
@Injectable({
  providedIn: 'root'
})

export class AccountsService {
  uri = 'http://10.0.0.177:3000';
  constructor(private http: HttpClient) {
  }
  getAccounts() {
    return this.http.get<Account[]>(`${this.uri}/accounts`);
  }
  getAccountById(id: number) {
    return this.http.get<Account>(`${this.uri}/accounts/${id}`);
  }
  addAccount(data: Account) {
    return this.http.post<Account>(`${this.uri}/accounts/add`, data);
  }
  updateAccount(data: Account) {
    return this.http.post<Account>(`${this.uri}/accounts/update`, data);
  }
  deleteAccount(id: number) {
    return this.http.delete<Account>(`${this.uri}/accounts/delete/${id}`);
  }
}
```
Now save the file and run your project must to ensure there are no errors. If not then proceed to part 2.

<b>Continue onto [(Part 2) Angular (Web Framework)](web/ux/angular/ReadMe_New/README2.md)</br>
