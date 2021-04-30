# Angular (Web Framework) (Part 2).

## Table of Contents
[Overview](#overview)<br>
[Creating a Service](#creating-a-serve)<br>
[Creating an Interface](#creating-an-interface)<br>
[Pulling and Validating Data](#pulling-and-validating-data)<br>
[Create New Account Functionality](#create-new-account-functionality)<br>
[Updating Service](#updating-service)<br>
[Subscribing and Pushing Data](#subscribing-and-pushing-data)<br>
[Shortcut Cheatsheet](#shortcut-cheatsheet)<br>

## Overview
In this tutorial, you will continue designing the IoT Web Page. Here you will create the `Service.ts` and `Interface.ts` files which will handle our node routing. You will then add a routing subscribe to access/send the data from/to the `API`. This is a fundamental step in building a `UX` as it handles all `HTTP` communications with an `API`. 

This tutorial will not cover port encryption or auth services for backend communication. This however are still recommended when developing a front-end service for an `API`.

Once your begin testing, remember to have your `index.js` running so that your interface can interact with the database on the backend. Otherwise the data will not reflect.

## Creating a Service
Use the command `mkdir` to create a new directory called `services`. Place this folder inside the app folder of `sictcweb/angular-iot-app/src/app`. After making the directory, confirm you have the correct file path.

```console
pi@raspberrypi:~/sictcweb/angular-iot-app/src/app $ ls
app.component.html  app.component.scss  app.component.spec.ts  app.component.ts  app.module.ts  app-routing.module.ts  home  login  new-acc  services
pi@raspberrypi:~/sictcweb/angular-iot-app/src/app $ cd services/
pi@raspberrypi:~/sictcweb/angular-iot-app/src/app/services $ 
```
This folder is going to hold your services needed for any accounts. Since a user needs to login in and must validate their credentials, we need to set up authentication for them. The files will also hold any updates that are made to the accounts.

Navigate into the directory `sictcweb/angular-iot-app/src/app/services` and execute the following command to generate a new service.

```console
ng generate service accounts
```
or you can use the shortcut

```console
ng g s accounts
```
When you finish, there should be two new files inside the directory. But the file we are concerned with is `accounts.service.ts`. Open the new service file, `accounts.service.ts` that was created and paste the following code.

##### accounts.service.ts
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../interfaces/accounts';
```

Add this below to your export class. Be aware that the data for variable `uri` will need to be changed to your correct Raspberry Pi ip address. You also need to keep the port section of where your `index.js` file will be listening one, from previous tutorilas should be `3000`. 

##### accounts.service.ts
```typescript
export class AccountsService {
  uri = 'http://your-raspberry-pi-ip-address:3000';
  constructor(private http: HttpClient) {
  }

  getAccountById(id: number) {
    return this.http.get<Account[]>(`${this.uri}/accounts/${id}`);
  }
}
```
Although a small amount added, we got a bit to break down.

We currently are importing two services, the `HttpClient` and the `Accounts`. The `HttpClient` is going to handle any HTTP services that normally come across when requesting. The `Accounts` service will fetch our Accounts database, but we will get into the `Account` interface later when hooking up. Just be aware it will hit on our database when requested. 

Next we port the `HttpClient` into our constructor that will be classed as private. The `private` classification does not mean its making it secured. We use the private label to keep our component encapusulated. Encapulsation with private means the component cannot be touched by other components. Encapsulation is another topic that we are only touching base on but must continue.

Now that we can use `http` we perform a GET request to hit the api URL. You can see this in the function to find the account by its id. When the call is made, the url string that comes back is your Raspberry Pi ip address, with it being in the accounts and the id the account is attached to.

## Creating an Interface

The next step we need for our services is to create an interface for them. 

To give you a glimpse of what an `interface` is in Angular, picture the interface as tasks that need to be done. Maybe one of the tasks is to pick up groceries and you have to buy coffee, cereal, and bread. However, you don't have to buy a specific brand, nor do you have to get them in a ordered fashion. 

These interfaces have files filled with `models`, which serve as the parameters for the incoming data. For example, a car will have a model, year, name, and VIN. The parameters can also be determied to be different values, such as strings or numbers, depending how you want the data set up. When you look at how the data format is created later on, it shares similarities to JSON format.

Just like with the service files, create a new directory called `interfaces`. The directory `interfaces` will also be located in the folder path `sictcweb/angular-iot-app/src/app/`. So your new folder path should be `sictcweb/angular-iot-app/src/app/`.

```console

pi@raspberrypi:~/sictcweb/angular-iot-app/src/app $ sudo mkdir interfaces
pi@raspberrypi:~/sictcweb/angular-iot-app/src/app $ ls
app.component.html  app.component.scss  app.component.spec.ts  app.component.ts  app.module.ts  app-routing.module.ts  home  interfaces  login  new-acc  services
pi@raspberrypi:~/sictcweb/angular-iot-app/src/app $ cd interfaces/
pi@raspberrypi:~/sictcweb/angular-iot-app/src/app/interfaces $ 
```

Navigate to the `interfaces` directory and create a new filed called `accounts.ts`. 

Now open the new `accounts.ts` file and add the following code.

##### accounts.ts
```typescript
export interface Account {
    Address: string;
    City: string;
    CreatedDate: string;
    Id: number;
    Name: string;
    State: string;
    Zip: string;
}
```
Now this looks familiar doesn't it? That's because this is the same format and data matter we used to set up our Accounts in our database IoT. We are going to export this into our model.

The model `Account` includes all items that the API will return. It is important to note that all parameters sent and recieved by the `API` needs to be included in the model (which is why we stressed confirming all the categories to be correct). If not it will not work as there will be unassigned data. 

The term `Account[]` from the service file `accounts.service.ts` is essentially saying that there is a possiblity to return multiple accounts. So if you have added more than one account, this will catch for it. 


## Pulling and Validating Data
Now that we have a route to hit and a model to store the data, let's connect to that route and vaildate the account data in the login component. This is first done by subscribing to the route. To do this, navigate to the `login.component.ts` file and add the following imports.

##### login.component.ts
```typescript
import { Account } from '../interfaces/accounts';
import { AccountsService } from '../services/accounts.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
```

Now we will need add our router and service to our export class and the constructor.

##### login.component.ts
```typescript
    idNum: number;
    username?: string;
    accName?: string;
    failedAtt?: boolean;

    constructor(
        private accService: AccountsService,
        private router: Router
    ) { }
```

For the three values `username`, `accName`, and `failedAtt`, we initialize these datatypes late so in our case we will put a ? in front of the varibale.
Now that we have our service lets edit our `loginBtn()` click function. This will go after and outside the `ngOnInit(){}` function.

##### login.component.ts
```typescript
    loginBtn() {
        this.accService.getAccountById(this.idNum).subscribe((accounts: Account[]) => {
        this.accName = accounts[0].Name.toUpperCase();
        if (this.username === this.accName) {
            this.router.navigate(['/home']);
            this.failedAtt = false;
        } else {
            this.failedAtt = true;
        }
    })
  }
```
A little explination for you. First you set `id` to the id of `idNum` from the `HTML`. You set this to a number because the API will need a number for its route. 

Next you `subscribe` to the service. What subscribe is doing is taking the account of the id `this.id` and using it as our observable for the user logining in. We only need the Name for validation so we set `accName` to `accounts[0].Name`. We use `[0]` because you need to only use the first item of the array which is returned by the `API`. 

Next we have a boolean check to see if the username typed, and the username from the `API`, match. Depending on outcome this toggles a boolean. Also if successful you use `router.navigate` to send the user to the `/home` page.

Now that we have our data and validation check you will need to notify the user if the attempt fails. Navigate to your `login.component.html` and `.scss` files and add the following code accordingly. Add the following to the `login.component.html` file below the `<div>` with the class `header`

##### login.component.html
```html
<div class="loginErr" *ngIf="this.failedAtt">
    <div class="loginErr-msg">
        Username or Password Incorrect
    </div>
</div>  
```

Jump over and add the style for the login error message. Remember to put it below the `header` tag
`login.component.scss`
Below the `.header` css tag
```sscss
.loginErr {
            background-color: red;
            width: 270px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            .loginErr-msg {
                color: white;
                font-family: sans-serif;
            }
        }
```

Now run your server and test the login page.
If it works then you should be able to login and be routed to the home page. Now you should automatically be loaded to the login page by default.

## Create New Account Functionality
Now comes the very real challenge of making a push to our `API`. This is especially difficult because of the amount of moving parts that go into a push. First the front end must record into a varible, send via our model to a push in our service. Which will then make it to the `API`.

## Updating Service
The very first thing we need to do is adjust our service file to handle a push. 
First go back to the `accounts.service.ts` file, located in `/sictcweb/angular-iot-app/src/app/services`. Add the following code. Make sure this goes outside the bracket of the last function you plugged in.

##### acccounts.service.ts
```typescript
addAccount(data: NewAccount) {
    return this.http.post<NewAccount>(`${this.uri}/accounts/add`, data);
  }
```

Now as you can see we have to use a different `Model`. This is going to add any new account we create. Since the new account won't already have an id, we can get rid of this category. We also won't need to add the category `date`, so let's go adjust our `accounts.ts` file. Add the following code to the bottom of the code, after your `Account` creation.

Remember: The file path for this file is `/sictcweb/angular-iot-app/src/app/interfaces`.

##### accounts.ts
```typescript
export interface NewAccount {
    Name: string;
    Address: string;
    City: string;
    State: string;
    Zip: string;
}
```
Now go back to the `accounts.service.ts` file. Back at this file, we will import our new model next to our old one. 

##### accounts.service.ts
```typescript
import { Account, NewAccount } from '../interfaces/accounts';
```
Once you add this import, confirm that you have 3 imports total in this file. The other two should be `import { Injectable }` and `import { HttpClient }`.

With those additions plugged you, our service file is ready to handle post.

## Subscribing and Pushing Data
Now that all of our `HttpClient` work is done, lets go edit the `new-acc.component.ts` file and add the following.

First under the imports add the following properties. You may already have some of the properties added, so verify this on your file.

##### new-acc.component.ts
```typescript
import { Component, OnInit } from '@angular/core';
import { Account, NewAccount } from '../interfaces/accounts';
import { AccountsService } from '../services/accounts.service';
import { Router } from '@angular/router';
```

Now let's set up the property matter. Put the code inside the export class, right above the constructor.

##### new-acc.component.ts
```typescript
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  newAcc: NewAccount;
```
All the data we enter is going to be used in our variable instance `newAcc`. The variable `newAcc` is taking what a new account will have and parse the string in the query when we add our new account. We do not have to worry about adding and id since that will auto increment.

Now import our router and service into the constructor like so. 

##### new-acc.component.ts
```typescript
constructor(
    private accService: AccountsService,
    private router: Router
    ) { }
```
Finally, add our button function using the following code below the `ngOnInit(){}` bracket that we left empty in an earlier tutorial. This should be its own independent function that is enclosed in the export class bracket.

##### new-acc.component.ts
```typescript
newAccBtn() {
    this.newAcc = {
        Name: this.name.toUpperCase(),
        Address: this.address,
        City: this.city,
        State: this.state,
        Zip: this.zip
    }
    this.accService.addAccount(this.newAcc).subscribe((newAcc: NewAccount) => {
        this.router.navigate(['/login']);
    });
}
```
Now run your save your code and refresh your page, test and see if you can now create a new account. I know this seemed like a lot of jumping around, but that's how Angular is set up. Every file, no matter the size, has its place. The organization leads to efficiency.

Always remember the following order when it comes to routing data within components and Http Requests.

| File | Step | TODO |
|---|---|---|
| `accounts.service.ts` | Step 1 | Create a route function to reach the Http Url (i.e ``this.router.get()``) |
| `accounts.ts` | Step 2 | Create a model `interface` to organize info |
| `accounts.service.ts` | Step 3 | Import the new Model in the service file |
| `new-acc.component.ts` | Step 4 | Subscribe to the service function via its import |

## Shortcut Cheatsheet

| Commands | Definition |
|---|---|
| ng new angularprojectname | Creates a new Angular project. |
| ng serve | Will serve your website, default port 4200. |
| ng serve --port #### | Will serve your website on a port you choose. |
| netstat -nltp | Shows the network statistics and protocols. |
| ng g c componentname | Creates a new component and the requried files. |
| .html| Webpage of how the page should appear in order. Can include button clicks that will be written out in Typescript. |
| .scss| Stylesheet of how each class will appear in the html file. Helps make a page look dynamic.|
| .spec.ts| Unit testing file.|
| .ts | Typescript file where function calls exist on the html page. Will usually include what happens when a button is clicked or input from a user is required.  |
| form | Class in Angular used when handling input data.|
| [(ngModel)] | Directive that allows for two-way binding data in html or component. |
|ng g s servicename| Generates a service account.|

## <b>Continue to [Angular Part 3](web/ux/README4.md)</br>

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
[(Part 5) Web API (Node)](web/api/js/src/iotapi/README5.md)<br>
 
### UX
 
[Angular (Web Framework)](../ux/README.md)<br>
[Angular (Web Framework) (Part 1)](../ux/README2.md)<br>
[Angular (Web Framework) (Part 2)](../ux/README3.md)<br>
[Angular (Web Framework) (Part 3)](../ux/README4.md)<br>
 
### API
 
[Installing MySQL Connector for Python](web/api/py/README.md)
 
### Cryptography
 
[Crypto](web/CRYPTO.md)<br>
 
</details>

