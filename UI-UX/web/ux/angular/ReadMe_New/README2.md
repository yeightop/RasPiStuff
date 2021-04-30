# Angular (Web Framework) (Part 2).

## Table of Contents
- [Overview](#overview)<br>
- [Creating An Auth Component](#creating-an-auth-component)<br>
    - [Creating the Layout](#creating-the-layout)<br>
    - [Creating the Form](#creating-the-form)<br>
    - [Validation](#validation)<br>

## Overview
In Part 2 we will cover the setup of an authentication page. This will include the creation of the components and their layouts, the creation of an angular react form, and the validation of data to user input. This section has lots of code so be prepared to go back and reread or problem solve. Remember we aren't reinventing the wheel here. Most of this can be found on google pages. Just take your time and read. 

## Creating An Auth Component
### Creating the Layout
First we are going to want to create our layout by generating all of our required components. 
Create the components using the following command in `/angular-iot-app/src/app`
```cmd
ng g component login
```
So now we should have a new component folder alongside our core folder. You can run `ls` to be sure of this as well.

```console
pi@raspberrypi:~/Desktop/sictcweb/angular-iot-app/src/app $ sudo ng g component login
CREATE src/app/login/login.component.scss (0 bytes)
CREATE src/app/login/login.component.html (20 bytes)
CREATE src/app/login/login.component.spec.ts (619 bytes)
CREATE src/app/login/login.component.ts (272 bytes)
UPDATE src/app/app.module.ts (471 bytes)
pi@raspberrypi:~/Desktop/sictcweb/angular-iot-app/src/app $ ls
app.component.html  app.component.spec.ts  app.module.ts          core
app.component.scss  app.component.ts       app-routing.module.ts  login
```

Now that we have our component we need to generate or form. Navigate into your `app/login` directory and run the following command:

```console
ng g component auth-form
```
This will generate your new component for `auth-form` inside your `/app/login` directory. Go ahead an run `ls` to verify that the `auth-form` is inside the `login` directory.

```console
hans@hans:~/Documents/sictcweb/angular-iot-app/src/app/login$ ls
auth-form             login.component.scss     login.component.ts
login.component.html  login.component.spec.ts
hans@hans:~/Documents/sictcweb/angular-iot-app/src/app/login$ 
```

If you ran the command outside the prescribed folder, place the auth-form folder inside the login component. You will have to use the `mv` command to do so for this one.


Lastly, to finish our structure we will need to add a module to our form so that we can call it in the component. Run the following command to create the module for the authentication form. Be sure that you are insdie the 

```console
ng g module auth-form
```
When an module form is created, it will also create a seperate folder for the `module.ts`. You can see this below when you run the command on where my new typescript file is located.

```console
$ ng g module auth-form
CREATE src/app/login/auth-form/auth-form/auth-form.module.ts (194 bytes)
hans@hans:~/Documents/sictcweb/angular-iot-app/src/app/login/auth-form$ ls
auth-form                 auth-form.component.spec.ts
auth-form.component.html  auth-form.component.ts
auth-form.component.scss
hans@hans:~/Documents/sictcweb/angular-iot-app/src/app/login/auth-form$ cd auth-form/
hans@hans:~/Documents/sictcweb/angular-iot-app/src/app/login/auth-form/auth-form$ ls
auth-form.module.ts
```
Notice how the `login/auth-form` has another directory called `auth-form`? We need to move that file into the previous folder and delete the duplicate `auth-form`. 

First let's move the new `auth-form.module.ts` file into the first `auth-form` folder. You can do that by using the `mv` command. 

```console
hans@hans:~/Documents/sictcweb/angular-iot-app/src/app/login/auth-form/auth-form$ mv auth-form.module.ts /home/hans/Documnets/sictcweb/angular-iot-app/src/app/login/auth-form 
```
When you are moving a file, you'll need to type int he entire folder path of where you want to move the new file to. This includes the `home/username/` directory.

Once you've moved the `auth-form.module.ts` folder into the correct location, run `ls` to verify the location. In the `auth-form` folder, you should have five files total.

##### Raspberry Pi terminal
```console
hans@hans:~/Documents/sictcweb/angular-iot-app/src/app/login/auth-form$ ls
auth-form.component.html     auth-form.component.ts
auth-form.component.scss     auth-form.module.ts
auth-form.component.spec.ts  auth-form
```
Once you've confirmed the folder has the same five files, delete the duplicate `auth-form` that is inside the directory `src/app/login/auth-form`. You can do this by using `rm -d auth-form`.

Run `ls` one more time and verify that the extra folder has been deleted and that the `auth-form-module.ts` file is placed in the remaining `auth-form` directory. It should look like the terminal below.

##### Raspberry Pi terminal
```console
hans@hans:~/Documents/sictcweb/angular-iot-app/src/app/login/auth-form$ ls
auth-form.component.html     auth-form.component.ts
auth-form.component.scss     auth-form.module.ts
auth-form.component.spec.ts
```

Again, make sure the typescript file is placed in the correct folder from above. 

<b>Note</b>: If you still have your website up and running, the compiler should still display the page without any errors.

Now open the file called `auth-form.module.ts`and make sure that is matches the following code.

##### auth-form.module.ts
```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './auth-form.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthFormComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthFormModule { }
```
Make sure that you added the `ReactiveFormsModule` and `FormsModule`
Now that our module is created we will need to import it in the `app.module`. Navigate back to the `/angular-iot-app/src/app` directory. Open the file and add the following to section `@NgModule` under `imports: [`

##### app.module.ts
```ts
AuthFormModule
```
Getting an error that looks something like this? 

```console
ERROR in src/app/app.module.ts:19:5 - error TS2304: Cannot find name 'AuthFormModule'.
    
    19     AuthFormModule
```

Did you import the `auth-form` module in the `app.module`? Remember that every variable not defined in the file is an import of some kind. So make sure to add the `AuthFormModule` in the import section as well. Be sure that you also have the correct route location as well.

- Remove import { AuthFormComponent } as well since it will already get called.
- Remove `AuthFormComponent` as well from the declarations

##### Raspberry Pi terminal
```console
import { AuthFormModule } from './login/auth-form/auth-form.module';
```

Finally we will need to add some routing to hit the `HTML`. Open the `app.routing-module.ts` file and at the following object to the routes array. Once again you will have to import the component from the designated area that you have stored it.
##### app-routing.module.ts
```ts
const routes: Routes = [
  { path: '', component: LoginComponent }
];
```
This means that the user will be routed to the login component if the user hits `localhost:4200/`. Also include the correct `import` location at the top.

##### app-routing.module.ts
```console
import { LoginComponent } from './login/login.component';
```

Now serve your code and check to make sure that you are auto routed to the login page.

(<b>Right here is where the problems begin</b>)

Was getting errors here 

```console
ERROR in src/app/app-routing.module.ts:5:25 - error TS2304: Cannot find name 'AuthComponent'.

5  { path: '', component: AuthComponent }
                          ~~~~~~~~~~~~~
src/app/app.module.ts:18:5 - error TS2304: Cannot find name 'AuthFormModule'.

18     AuthFormModule
       ~~~~~~~~~~~~~~

** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **


```

Finally lets layout our html and scss in the login page to ensure that we are able to use our component correctly and that is calls our child component where we need. 

Move back into your `/app/login` directory and start working on the `login.component.html`.

##### login.component.html
```html
<body class="body">
    <div class="header">
        LOGIN
    </div>
    <app-auth-form></app-auth-form>
    <div class="new-acc">
        <div class="new-acc-msg">
            Don't Have an account?
        </div>
        <!-- <button class="btn" routerLink='/acc/-1'>Create New Account</button> -->
    </div>
</body>
<router-outlet></router-outlet>
```
Notice the `<app-auth-form>` selector within the html. This is what calls our child, just like `<router-outlet>`. We use this selector because it is the designated selector defined within the `auth-form.component.ts`. When called however it will only display that component within the html, not just any old component that you can grab. You must use it selector.

Save your file from the added material and they let's work on the style of the login page. Put the following source code into your login `.scss` file.

##### login.component.scss`
```scss
.body {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 350px;
    height: 525px;
    background-color: rgba(0, 0, 0, 0.75);
    .header {
        font-size: 27px;
        font-family: sans-serif;
        color: white;
    }
    .new-acc {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        .new-acc-msg {
            font-size: 18px;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            color: white;
        }
        .btn {
            margin-top: 20px;
            width: 180px;
            height: 45px;
            font-size: 17px;
            background-color: rgb(23, 204, 23);
            border-radius: 2px;
            border: 1px solid black;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        }:hover {
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.397), 0px 2px 4px rgba(0, 0, 0, 0.404);
        }
    }
}
```

(still having the two errors down here persisting)

```console
ERROR in src/app/app-routing.module.ts:5:25 - error TS2304: Cannot find name 'AuthComponent'.

5  { path: '', component: AuthComponent }
                          ~~~~~~~~~~~~~
src/app/app.module.ts:18:5 - error TS2304: Cannot find name 'AuthFormModule'.

18     AuthFormModule
       ~~~~~~~~~~~~~~


```

## Creating The Authentication Form
Our next step will be to layout our `HTML`. Clear out the top of the file containing `<p>auth-form works!</p>`. Add the following code then read the explination behind it. **Note!**: Do not skip the reading bit. It will be nessecary.

`auth-form.component.html`
```html
<div class="form-input">
    <form [formGroup]="formGroup" (ngSubmit)="submitBtn()">
        <div class="form-group">
            <label class="header">Username:</label>
            <div class="backing">
                <input required class="form-control" formControlName="name" [(ngModel)]="acc.Name" name="name" >
            </div>
            <span *ngIf="formGroup.controls.name.hasError('required') && formGroup.touched" class="error">*This field is required*</span>
        </div>
        <div class="form-group">
            <label class="header">Id:</label>
            <div class="backing">
                <input required class="form-control" formControlName="id" [(ngModel)]="acc.Id" name="id">
            </div>
            <span *ngIf="formGroup.controls.id.hasError('required') && formGroup.touched" class="error">*This field is required*</span>
        </div>
        <button type="submit" [disabled]="formGroup.invalid" class="btn">Submit</button>
    </form>
</div>
```
Now just like with out `.html` file, let's go ahead and fix up our `.scss` file.

`auth-form.component.scss`
```scss
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
Now you should have a form set up. Don't bother running it yet as you don't have your typescript setup. So any errors that you had persisting, they will still exist here.

What we've done here is create an Angular Form. We do this using the `ngForm` Directive which signifies what input and buttons do to control that form specifiaclly.
`formGroup` = Defines the overall form and its name.
`form-group` = Defines the specific input field.
`form-control` = Defines the place where control outputs are issued.
`formControlName` = Defines name of form control so that values can be called.
`*ngIf on span` = Defines when to display the error to the user. (Must be touched and empty)

### Validation
Lastly we will need some programming to add functionality to our page. Open the `auth-form.component.ts` and add the following imports.
```ts
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Accounts } from '../../core/interfaces/accounts';
import { AccountsService } from '../../core/services/accounts.service';
import { Router } from '@angular/router';
```

Now lets set up all of our data types. Place these within the export above the `constructor() {}`.
```ts
acc: Accounts = {
    Id: null,
    Name: null,
    Address: '',
    City: '',
    State: '',
    Zip: '',
    CreatedDate: '',
  };

  accounts: Accounts[]

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    id: new FormControl(-1, Validators.required),
  });
```
What we have done here is defined our form as `formGroup`. And then we give it a type and a validator. This will allow us to see if the field is empty or to toggle our submit button. Wel also define `acc` as a model of the interface `Account`. This allows us to pre pupulate the data fields or to pull the actual data values to be used.

Now add the following to the constructor.
```ts
constructor(
    private accService: AccountsService,
    private router: Router
  ) { }
```

Now that we have all of our variables we will need to populate accounts first so that we have data to compare to. In the `NgOnInit()` add the following code.
```ts
this.accService.getAccounts().subscribe((accounts: Accounts[]) => {
      this.accounts = accounts;
    })
```
What we have done is subscribed to the function that pulls all meta data from our node server. It returns an observabel, or a bound object if you will which is returned to us in the form of `accounts` which we use to populate our variable for accounts.

Now we will need to have a way to validate our data as it comes in. To do this we will be adding the following function.
```ts
submitBtn() {
    this.accounts.forEach((account: Account) => {
      if (account.Id === Number(this.acc.Id) && account.Name === this.acc.Name) {
        this.router.navigate(['home']);
      }
    })
  }
```
This will use the array of `accounts` to check if the Id's and the Name's of both an objects and the users input match. On the even that they do then we call `router.navigate` to hit the home page and remove our auth page. Now run your code to make sure it works. **Note!**: The routing to the home page will not actually work till we get the home page setup do just be patient.

Congrats! You can move on to the next section.

(<b>So currently the errors persisitng up to this point</b>)

```console
ERROR in src/app/app-routing.module.ts:5:25 - error TS2304: Cannot find name 'AuthComponent'.

5  { path: '', component: AuthComponent }
                          ~~~~~~~~~~~~~
src/app/app.module.ts:18:5 - error TS2304: Cannot find name 'AuthFormModule'.

18     AuthFormModule
       ~~~~~~~~~~~~~~

```

Technically the site is live, but just have the CANNOT GET / folder.

<b>Continue onto [(Part 2) Angular (Web Framework)](web/ux/angular/ReadMe_New/README3.md)</br>
