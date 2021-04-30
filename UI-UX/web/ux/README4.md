# Angular (Web Framework) (Part 3).

## Table of Contents
[Overview](#overview)<br>
[Updating Service and Interface](#updating-service-and-interface)<br>
[Adding Home HTML and SCSS](#adding-home-html-and-scss)<br>
[Adding Typescript Elements](#adding-typescript-elements)<br>
[Shortcut Cheatsheet](#shortcut-cheatsheet)<br>
[FAQ](#faq)<br>


## Overview
At this point you should now have a `Login` and a `Create New Account` page. These both have a service route for getting and pushing data. 
It should also route you from `Login Component` to the `Home Component`, and the `Login Component` to the `New-Acc Component`.
Now we will use our home page to utilize the rest of our API Routes. We will do this by displaying all of the Accounts and their associated information. We will also give the user the option to delete an account and update account information, reflecting a dynamic interface.

## Updating Service and Interface
Now just like with all the other steps that include pulling data or pushing data, you will need to create a new `Service` function and a new `Interface` model to support your `Delete` and `Get` routes. 
Now to update our service we will want to create two new, specific service functions. We will need one to delete the accounts that are listed. And we will need a second to get all of the accounts for display. 
Open the `accounts.service.ts` file and add the two following Http Requests.

##### accounts.service.ts

import {Account, NewAccount, UpdateAccount} from '../interfaces/accounts';

##### accounts.service.ts
```typescript
getAccounts() {
    return this.http.get(`${this.uri}/accounts`);
}

deleteAccount(id: number) {
    return this.http.delete<Account>(`${this.uri}/accounts/delete/${id}`);
}

updateAccount(data: UpdateAccount) {
    return this.http.post<UpdateAccount>(`${this.uri}/accounts/update`, data);
  }
```

Now you will need to add the interface for `UpdateAccount` since we could alter information on the account and requires new infromation. Go into the `sictcweb/angular-iot-app/src/app/interfaces` and add the export code to the interface file.

##### accounts.ts
```
export interface UpdateAccount {
    Id: number;
    Name: string;
    Address: string;
    City: string;
    State: string;
    Zip: string;
}

```

## Adding Home HTML and SCSS
Now that you have your service routes ready to use you will need a way to interact with those routes. 
To do this we will need to add our HTML. Now open your `home.component` at `/sictcweb/angular-iot-app/src/app/home` and navigate to your HTML & SCSS. 

Open your `home.component.html` file and add the following code below the `pg-body` closing class tag `</div>`. You should still be within the `<body>` tag.

##### home.component.html
```html
<div class="body">
    <div *ngIf="!updateInfo">
        <li class="info" *ngFor="let account of accounts">
            <div class="info-msg">
                <div class="info-msg-text">ID : {{account.Id}}</div>
                <div class="info-msg-text">Name : {{account.Name}}</div>
                <div class="info-msg-text">Address : {{account.Address}}</div>
                <div class="info-msg-text">City : {{account.City}}</div>
                <div class="info-msg-text">State : {{account.State}}</div>
                <div class="info-msg-text">Zip : {{account.Zip}}</div>
            </div>
            <div class="info-btns-container">
                <button class="info-btn" (click)="deleteBtn(account.Id)">Delete Account</button>
                <button class="info-btn" (click)="updateBtn(account.Id)">Update Info</button>
            </div>
        </li>
    </div>
    <div class="form" *ngIf="updateInfo">
        <div class="header">
            UPDATE INFO
        </div>
        <div class="input">
            <div class="idErr" *ngIf="emptyField">
                <div class="idErr-msg">
                    Empty Fields Not Allowed
                </div>
            </div>
            <div class="input-field">
                <div class="header">Name</div>
                <input class="input" value="{{name}}" [(ngModel)]="name" name="name" type="text">
            </div>
            <div class="input-field">
                <div class="header">Address</div>
                <input class="input" value="{{address}}" [(ngModel)]="address" name="address" type="text">
            </div>
            <div class="input-field">
                <div class="header">City</div>
                <input class="input" value="{{city}}" [(ngModel)]="city" name="city" type="text">
            </div>
            <div class="input-field">
                <div class="header">State</div>
                <input class="input" value="{{state}}" [(ngModel)]="state" name="state" type="text">
            </div>
            <div class="input-field">
                <div class="header">Zip</div>
                <input class="input" value="{{zip}}" [(ngModel)]="zip" name="zip" type="text">
            </div>
        </div>
        <div class="update-acc">
            <button class="update-acc-btn" (click)="submitBtn()">Submit</button>
        </div>
    </div>
</div>
```

Make sure that the `Log Out` Button is below the code you just pasted in. Always remember that order matters in the context of `HTML` and `CSS`. In this instance we are creating containers with information regarding the accounts. We only have to create one because of the `*ngFor` statement. This loops an array of typescript objects and allows you to place them individually, like a `forEach()` statement. We also pass in `(account.Id)` into our button functions so we can tell the API which of the tags we want to modify or delete.

Notice that we also pass in values of proper

Now add the following code to the `home.component.scss` file. Remember this will go outside the closing bracket for the `pg-body` class styling

##### home.component.scss
```scss
.body {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title-bar {
            background-color: rgb(115, 115, 185);
            width: 100%;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            .title-string {
                font-size: 50px;
                font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                color: rgb(0, 0, 0);
            }
        }
        .form-log {
            margin-top: 50px;
            border-color: rgb(8, 0, 0);
            border-width: 5px;
            border-radius: 4px;
            background-color: rgb(179, 179, 179);
            width: 350px;
            height: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            .header {
                font-size: 27px;
                font-family: sans-serif;
            }
            .idErr {
                background-color: red;
                width: 270px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                .idErr-msg {
                    color: white;
                    font-family: sans-serif;
                }
            }
            .input {
                .idNum {
                    .idNum-header {
                        font-size: 17px;
                        font-family: sans-serif;
                    }
                    .idNum-input {
                        width: 250px;
                        height: 30px;
                    }
                }
            }
            .acc-info {
                .acc-info-btn {
                    width: 180px;
                    height: 45px;
                    font-size: 20px;
                    background-color: rgba(88, 88, 170, 0.712);
                    border-radius: 4px;
                    border-width: 1px;
                    border-color: rgba(88, 88, 170, 0.712);
                    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                }
            }
        }
        .info {
            margin-top: 15px;
            width: 550px;
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            background-color: rgba(138, 138, 182, 0.795);
            border-radius: 4px;
            border-width: 1px;
            border-color: black;
            .info-msg {
                width: 300px;
                .info-msg-text {
                    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                    font-size: 20px;
                }
            }
            .info-btns-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-evenly;
                height: 200px;
                .info-btn {
                    width: 125px;
                    height: 55px;
                    font-size: 20px;
                    background-color: rgba(88, 88, 170, 0.712);
                    border-radius: 4px;
                    border-width: 1px;
                    border-color: rgba(88, 88, 170, 0.712);
                    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                }
            }
        }
        .form {
            margin-top: 50px;
            margin-bottom: 50px;
            border-color: rgb(8, 0, 0);
            border-width: 5px;
            border-radius: 4px;
            background-color: rgb(179, 179, 179);
            width: 350px;
            height: 600px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            .header {
                margin-top: 10px;
                font-size: 27px;
                font-family: sans-serif;
            }
            .idErr {
                background-color: red;
                width: 270px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                .idErr-msg {
                    color: white;
                    font-family: sans-serif;
                }
            }
            .input {
                .input-field {
                    .header {
                        font-size: 17px;
                        font-family: sans-serif;
                    }
                    .input {
                        width: 250px;
                        height: 25px;
                    }
                }
            }
            .update-acc {
                .update-acc-btn {
                    width: 180px;
                    height: 45px;
                    font-size: 20px;
                    background-color: rgba(88, 88, 170, 0.712);
                    border-radius: 4px;
                    border-width: 1px;
                    border-color: rgba(88, 88, 170, 0.712);
                    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                }
            }
        }
    }
```

## Adding Typescript Elements
The very first thing that you will need to do will be add the imports to the `home.component.ts`. We need to be aware that updating the account and adding account are inside our imports.

##### home.component.ts
```typescript
import { Account, UpdateAccount } from '../interfaces/accounts';
import { Router } from '@angular/router';
import { AccountsService } from '../services/accounts.service';
```

Now add the following properties above the constructor, below the export. 

##### home.component.ts
```typescript
failedAtt: boolean = false;
  emptyField: boolean = false;
  updateInfo: boolean = false;
  accounts: Account[];
  acc: Account = null;
  idNum: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  newAcc: UpdateAccount;
```

Now update the constructer to look as follows

##### home.component.ts
```typescript
constructor(
    private router: Router,
    private accService: AccountsService
  ) { }
```

Now add the folling line of code within the `ngOnInit()`

##### home.component.ts
```typescript
this.accService.getAccounts().subscribe((accs: Account[]) => {
      this.accounts = accs;
    })
```

Finally add the following functions

##### home.component.ts
```typescript
deleteBtn(accId: number) {
    this.accService.deleteAccount(accId).subscribe((acc: Account) => {
      this.acc = acc;
        this.accService.getAccounts().subscribe((accs: Account[]) => {
          this.accounts = accs;
        })
    })
  }

  updateBtn(accId: number) {
    this.accService.getAccountById(accId).subscribe((acc: Account[]) => {
      this.acc = acc[0];
      this.idNum = accId;
      this.name = acc[0].Name;
      this.address = acc[0].Address;
      this.city = acc[0].City;
      this.state = acc[0].State;
      this.zip = acc[0].Zip;

    })
    this.failedAtt = false;
    this.updateInfo = true;
  }

  submitBtn() {
    this.newAcc = {
      Id: this.idNum,
      Name: this.name,
      Address: this.address,
      City: this.city,
      State: this.state,
      Zip: this.zip
    };
    if (this.name.length && this.address.length && this.city.length && this.state.length && this.zip.length) {
      this.emptyField = false;
      this.accService.updateAccount(this.newAcc).subscribe((newAcc: UpdateAccount) => {
        console.log(newAcc);
        if (newAcc.Id !== null) {
          this.router.navigate(['/home']);
        }
      })
    } else {
      this.emptyField = true;
    }
  }
```
Now the main thing to notice that is different is the passing of variables within the function.
We do this because the function is called on the button click in the `HTML`, and it is there where
it is passed in.

Finally run your code and test to make sure everyting works.
Congrats!!! you just finished building a basic ux.

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

## FAQ

<b>My port connection where my index.js is residing seems to be either refusing connection or not being locate? What can I do?</b>

When running your angular application, you also need another screen going that is serving your `index.js` file. When we set that up, we had it listening on `http://localhost:3000`. You may need to change the port number to a open or public, such as 8080.

In yout `uri` variable of the `accounts.service.ts` also confirm the ip address is the same one where `index.js` would be listening on.

You also need to have `cors` installed so any interaction between the api and the database can go through. This is coverd in the dependency section of the tutorial. You have to allow `cors` to execute on both the `index.js` file and the `accounts.js` route. Without `cors` operating, you will receive the error `Access Control Allow Origin`. This error will make any interaction impossible.

<b>So I have to have index.js running while serving my angular project?</b>

Yes, otherwise how is the angular app going to hit your database? If the database is not operating or online, the angular app won't be able to talk to it.

<b>Where am I able to see changes happening on the backend?</b>

On the screen where `index.js` is executing, you can see the changes in data or fetching data appear across the terminal there. The results when populated will appear like a json file, curled in brackets with changes and everything.

<b>Some errors I'm getting is ComponentName doesn't exist?</b>

The most common errors people make buidling their angular app is usually not complicated. Many times, the frustration is becausse you forgot to add in an import or injectionable. This is why before restarting a server, you want to confirm all the imports exist for the files oging live.

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

