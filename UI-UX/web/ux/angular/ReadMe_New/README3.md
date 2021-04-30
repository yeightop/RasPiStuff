# Angular (Web Framework) (Part 3).

## Table of Contents
- [Overview](#overview)<br>
- [Creating A Home Page](#creating-a-home-page)<br>
    - [Creating the Tag](#creating-the-form)<br>
    - [Creating the Update Form](#creating-the-form)<br>
        - [Validation](#validation)<br>

## Overview
This will cover the setup of the home page. The major take away from this page will be the `*ngFor` statement which will allow you to have repeating html and css for a set of objects whilst only having to write the code once. We will also be using inputs with components. Besides that everything here is review.

## Creating A Home Page
**Challenge:** Layout a home component exactly like the Login. It should have a parent component called `accounts` with two children called `acc-form` and `account`. Use the following file structure as a guide.
```
- app
-- accounts
--- acc-form
--- account
---- account.componet
---- account.module
-- accounts.component.html
-- accounts.component.scss
-- accounts.component.spec.ts
-- accounts.component.ts
```
Forget how to generate file types?
```console
ng g the-file-type the-file-name
```
- ng g c acc-form
- ng g c accounts
- those two should be fine, already dropped into the correct area.
- create module component for account.module
- mv account.module into accounts/account and delete extra repo of account
- Put in the missing imports into account.component.ts?
- 



##### need more clarification here
**Note!**: Make sure to create the module and declare the `account.component` and export it. Then import it in the `app.module`.

- place `import { AccountComponent } from './account.component'.` in account.module
- declare AccountComponent
- exports: [ AccountComponent ]

in app.module.ts

- replace import { AccountComponent } with { AccountModule } './accounts/account/account.module'
- remove AccountComponent in declarations.
- Add AccountModule in imports

Now that we have our file structure organized lets go ahead and build out our home component. First we will need our data so that we can display the accounts. Open the `accounts.component.ts` and add the following code.
```ts
export class AccountsComponent implements OnInit {

  accounts: Accounts[];
  index: number;


  constructor(
    private accService: AccountsService
  ) { }

  ngOnInit() {
    // Pull and define all accounts in a list to be displayed to the current user
    this.accService.getAccounts().subscribe((accs: Accounts[]) => {
      this.accounts = accs;
    })
  }
```

<b>Error Here</b>

```console
 ERROR in src/app/accounts/accounts.component.ts:14:24 - error TS2304: Cannot find name 'AccountsService'.
    
    14    private accService: AccountsService
```

##### Which imports?
Don't forget your imports!!!
error here
- need to add the other imports below
```console
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Accounts } from '../core/interfaces/accounts';
import { AccountsService } from '../core/services/accounts.service';
```
What we are doing is simply pulling all of the accounts so that we can list them for the user. Now we will need our visible elements.

`accounts.component.html`
```html
<div class="body">
    <div class="info" *ngFor="let account of accounts; let i = index;">
        <app-account [account]="account" [index]="i"></app-account>
    </div>
    <div class="btn-container">
        <button class="btn" routerLink="/login">Log Out</button>
    </div>
</div>
```
What we have done here is used an `*ngFor` statement to allow us to loop the tag that will display each individual user. To do this we let `account` of `accounts` which is a fancy way of putting `accounts[index]`. This means that for each account it must display the sub-elements withing the html. We also pass a value of `index` into our account tag. We do this so that we know it's exact position within the array of objects should we want to edit or remove it.

Now all we need to do is add some scss. Open the `accounts.component.scss` and add the following code.
```scss
.body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    .info {
        margin: 10px;
    }
    .btn-container {
        width: 300px;
        height: fit-content;
        margin: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        .btn {
            background-color: rgb(23, 204, 23);
            width: 120px;
            height: 50px;
            border: 1px solid black;
            border-radius: 2px;
            font-size: 20px;
        }:hover {
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06);
        }
    }
}
```
Finally we need to add a route so that we can land on the page. Open the `app-routing.module.ts` file and add the following code.
```ts
const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'home', component: AccountsComponent }
];
```
 - add the import { AccountsComponent } as well
Now we are ready to add our tag component to the mix.

### Creating the Tag
Now open your tag component. The very first thing we need to do is add some code to the ts. As you might have noticed in the `accounts.component.html` we used binding elements (`[index]="Index"`). This will allow us to pull information into our tag. In this case we want the index of the item as well as the account information needed to populate fields. Now technically the data is being sent but not retrieved. Let's go ahead and pull that data now.

Open the `account.component.ts` file.

Fist add the imports we will need.
```ts
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Accounts } from '../../core/interfaces/accounts';
import { AccountsComponent } from '../accounts.component';
```
Now set up your constructor.
```ts
constructor(
    private home: AccountsComponent,
    private router: Router
  ) { }
```

Now you will need to create two inputs between the `export` and the `constructor`. This will allow you to pull the values at any given time. `Inputs` are a constant stream of data which when manipulated on one end immediatly effects the other end without having to pull the data after every update.
```ts
@Input() account: Account = null;
@Input() index: number = -1;
```

Now that we have out inputs we will need to add our `HTML` and `SCSS`.
`account.component.html`
```html
<div class="tag-container">
    <div class="info-msg">
        <div class="info-msg-text">ID : {{account.Id}}</div>
        <div class="info-msg-text">Name : {{account.Name}}</div>
        <div class="info-msg-text">Address : {{account.Address}}</div>
        <div class="info-msg-text">City : {{account.City}}</div>
        <div class="info-msg-text">State : {{account.State}}</div>
        <div class="info-msg-text">Zip : {{account.Zip}}</div>
    </div>
    <div class="info-btns-container">
        <button class="btn delete" (click)="deleteBtn()">Delete Account</button>
        <!-- <button class="btn" (click)="updateBtn(account.Id)">Update Info</button> -->
    </div>
</div>
```
Here we are using account to populate the fields. We have also created a button to delete the account. We will come back to its functionality later.
`account.component.scss`
```scss
.tag-container {
    margin-top: 15px;
    width: 550px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: rgba(0, 0, 0, 0.795);
    border: 1px solid black;
    border-radius: 2px;
    .info-msg {
        width: 300px;
        .info-msg-text {
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            font-size: 20px;
            color: white;
        }
    }
    .info-btns-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        height: 200px;
        .btn {
            width: 125px;
            height: 55px;
            font-size: 20px;
            background-color: rgb(23, 204, 23);
            border: 1px solid black;
            border-radius: 2px;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        }
        .btn.delete {
            background-color: rgb(211, 35, 35);
        }
        .btn:hover {
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5), 0px 2px 4px rgba(0, 0, 0, 0.5);
        }
    }
}
.tag-container:hover {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.349), 0px 2px 4px rgba(0, 0, 0, 0.363);
}
```
Now that our page has been laid out lets go back and add the functionality to our delete button. When we program in angular we have to work with something called `DOM Elements`, or the visible and accessable code that is displayed to the user. `DOM Elements` can be edited one of two ways. One is by reseting all data. This option would be great for a small application because we don't work with much actual data. And the data is not complex or amassed. However, we are professionals so we will always code our work to a professional standard. This means that instead of resetting all of our data everytime we make a small change, we will edit only the DOM Element. Let me give you an example.

Imagine you have you have a table of accounts and you remove one item from the list. In most instances you would have to repull the list of accounts from the database so that you have the list that does not include the removed account. Instead we will still push the change to the server but we will manipulate our array locally so that it does not show the deleted component. This, however, will not require us to repull our data.

Let's start by adding some functions to our `accounts.component.ts` file.
```ts
deleteBtn(index) {
    // Delete account by using the account from the list, we pull this by indexing our array of accounts
    this.accService.deleteAccount(this.accounts[index].Id).subscribe(() => {
      // Here we splice the object, this will remove it from the visible list without repulling data
      this.accounts.splice(index, 1);
    })
}

addAcc(acc: Accounts) {
    this.accounts.push(acc);
}
```
First what we have done is created a delete function. This works by hitting the delete route. We want to delete by index so we sort our array of accounts `accounts[0]` but instead we pass the variable index which is holding our index value. 

Next we use the `splice` command. This means we are removing `1` object at the index of `index`. When this runs it will remove the local DOM Element and object without require the user to pull the values again.

Finally we add a method for us to add an object locally. This is done with the `.push(value)` method which is just a fancy way of saying to add the following record.

Now that we have our functions set for data manipulation lets open the `account.component.ts` file and add the following functions.
```ts
deleteBtn() {
    this.home.deleteBtn(this.index);
}
```
This is us passing our current index into the home component function which is still active since it is the parent component.
Now load your page and test to see if your code works for the delete.

### Creating the Update Form 
Now that we can remove our users we also will want to be able to edit the info. Start off by uncommenting the following line of code from the `account.component.html`
```html
<!-- <button class="btn" (click)="updateBtn(account.Id)">Update Info</button> -->
```
Now we need to add its functionality in the `account.component.ts`. Add the following function.
```ts
updateBtn(Id: number) {
    this.router.navigate(['acc/', Id]);
}
```
Now that we are able have a route we need to hit we will need to add it to our `app-routing.component.ts`.
```ts
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'home', component: AccComponent },
  { path: 'acc/:id', component: AccFormComponent },
];
```
This specified route will require an `Id` value in order to be hit.

- also add your imports AccForm and AuthForm if needed

Now lets open up our `acc-form.component.ts` to add it's functionality.
First as always our imports
```ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Accounts } from '../../core/interfaces/accounts';
import { AccountsService } from '../../core/services/accounts.service';
import { ActivatedRoute } from '@angular/router';
```
Then our variables.
```ts
title: string;
  updateInfo: boolean = false;

  newAcc: Account = {
    Id: -1,
    Name: '',
    Address: '',
    City: '',
    State: '',
    Zip: '',
    CreatedDate: '',
  };

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
  });
```

Now our constructor.
```ts
constructor(
    private accService: AccountsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
```

Now we will need to view the value of the `Id` in the url. To do this we are going to add a little code to our `NgOnInit()`. 
```ts
this.newAcc.Id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.newAcc.Id > -1) {
      this.title = "UPDATE INFO";
      this.updateInfo = true;
      this.accService.getAccountById(this.newAcc.Id).subscribe((account: Account) => {
        this.newAcc = account;
      })
    } else {
      this.title = "CREATE ACCOUNT";
      this.updateInfo = false;
    }
```
What we are doing is saving time for coding. The new account page and update info page would look identical. So we made them the same page to save you some time. If the user has logged in then there will be an account Id attached which allows us to pull that from the route params. We are then defining the Id for our account and then pulling its data to pre populate the fields. We will use the title variable to set our header.

Now we will need a submit button. Add the following function.
```ts
submitBtn() {
    if (this.updateInfo) {
        this.accService.updateAccount(this.newAcc).subscribe(() => {
        this.router.navigate(['home']);
        })
    } else {
        delete this.newAcc.Id;
        this.accService.addAccount(this.newAcc).subscribe(() => {
        this.router.navigate(['login']);
        })
    }
}
```
Now we will need to add our `HTML` and `SCSS`.
'
`acc-form.component.html`
```html
<div class="form">
    <div class="header">
        {{title}}
    </div>
    <div class="form-input">
        <!-- "[formGroup]" is our predefined property which will contain all items and their validation logic withing this bound property element -->
        <!-- "(ngSubmit)" is a binding element which tells our form that the function for sumbition is "submitBtn()" -->
        <form [formGroup]="formGroup" (ngSubmit)="submitBtn()">
            <!-- "form-group" is a designated selector within angular forms to make an input section (includes: header, input type, and error message) -->
            <div class="form-group">
                <!-- header -->
                <label class="header">Username</label>
                <!-- input: required = makes field input required for button use, form-control = name to add params, ngModel = data bound property/property that holds value -->
                <div class="backing">
                    <input required class="form-control" formControlName="name" name="name" [(ngModel)]="newAcc.Name">
                </div>
                <!-- error: *ngIf = checks to see if property holds value and has been touched to display an error message -->
                <span *ngIf="formGroup.controls.name.hasError('required') && formGroup.touched" class="error">*This field is required*</span>
            </div>
            <div class="form-group">
                <label class="header">Address</label>
                <div class="backing">
                    <input required class="form-control" formControlName="address" [(ngModel)]="newAcc.Address" name="address" >
                </div>
                <span *ngIf="formGroup.controls.address.hasError('required') && formGroup.touched" class="error">*This field is required*</span>
            </div>
            <div class="form-group">
                <label class="header">City</label>
                <div class="backing">
                    <input required class="form-control" formControlName="city" [(ngModel)]="newAcc.City" name="city">
                </div>
                <span *ngIf="formGroup.controls.city.hasError('required') && formGroup.touched" class="error">*This field is required*</span>
            </div>
            <div class="form-group">
                <label class="header">State</label>
                <div class="backing">
                    <input required class="form-control" formControlName="state" [(ngModel)]="newAcc.State" ngModel name="state">
                </div>
                <span *ngIf="formGroup.controls.state.hasError('required') && formGroup.touched" class="error">*This field is required*</span>
            </div>
            <div class="form-group">
                <label class="header">Zip</label>
                <div class="backing">
                    <input required class="form-control" formControlName="zip" [(ngModel)]="newAcc.Zip" name="zip">
                </div>
                <span *ngIf="formGroup.controls.zip.hasError('required') && formGroup.touched" class="error">*This field is required*</span>
            </div>
            <!-- type must be submit to match "(ngSubmit)", [disabled] will remove button ability on false required statements -->
            <button type="submit" [disabled]="formGroup.invalid" class="btn update-acc-btn">Submit</button>
        </form>
    </div>
</div> 
```
`acc-form.component.scss`
```scss
.form {
    margin-top: 50px;
    margin-bottom: 50px;
    border-color: rgb(8, 0, 0);
    border-width: 5px;
    border-radius: 4px;
    background-color: rgb(0, 0, 0);
    width: 350px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    .header {
        margin-top: 25px;
        font-size: 27px;
        font-family: sans-serif;
        color: white;
    }
    .form-input {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-content: center;
    .form-group {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-start;
        width: 300px;
        height: 80px;
        margin-top: 10px;
        .header {
            color: white;
            font-size: 25px;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        }
        .backing {
            z-index: 97 !important;
            background-color: rgb(255, 255, 255);
            height: fit-content;
            width: fit-content;
            margin-top: 10px;
            .form-control {
                width: 290px;
                height: 30px;
                font-size: 17px;
                z-index: 99 !important;
                background-color: rgba(255, 255, 255, 0);
            }
        }
        .error {
            color: rgb(216, 54, 54);
            position: absolute;
            margin-top: 50px;
            margin-left: 10px;
            z-index: 98 !important;
        }
    }
    .btn {
        margin-top: 40px;
        margin-left: 55px;
        margin-bottom: 25px;
        width: 180px;
        height: 45px;
        font-size: 17px;
        background-color: rgb(23, 204, 23);
        border-radius: 2px;
        border: 1px solid black;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }
    .btn:hover {
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.397), 0px 2px 4px rgba(0, 0, 0, 0.404);
    }
}
```
Finally add the following bellow `Don't Have An Account?` in the `login.component.html`.
```html
<button class="btn" routerLink='/acc/-1'>Create New Account</button>
```
Now load and run your app. Congrats the layout of your page is done!!!. Want to take it to the next level? Go to the next page to find out how we can make our program even cleaner.

<b>Continue onto [(Part 4) Angular (Web Framework)](web/ux/angular/ReadMe_New/README4.md)</br>
