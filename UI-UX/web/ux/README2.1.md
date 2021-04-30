[Overview](#overview)<br>
[Creating a Login/Create Account Page](#creating-a-logincreate-account-page)<br>
[Login Page](#login-page)<br>
[Login Routing](#login-routing)<br>
[Login HTML and SCSS](#login-html-and-scss)<br>
[FormsModule](#formsmodule)<br>
[New Account Page](#new-account-page)<br>
[New Account Routing](#new-account-routing)<br>
[New Account HTML and SCSS](#new-account-html-and-scss)<br>
[Shortcut Cheatsheet](#shortcut-cheatsheet)<br>

## Overview

In this tutorial, we will continue building out our front end design for general users. This section you will build the page and routing needed for logging in and for creating a new account. You will also see how two-way data is to be interpeted in Angular and how a user input is passed to the database on the backend. As you begin through this section, you'll notice some of the material will require you have the `index.js` serving while testing.

As specified, you can resuse this code for furhter applications.


## Creating a Login/Create Account Page
Now that the basic layout of our page is created you need a login page. Not only is a login page needed, 
but we also need a create an account page. This is because a user might need to sign up before using an account. Not only does is the login page required, but it would be great if the login page was the first page the user goes to when accessing the website.

## Login Page
First create a Login Page. To do this you must first generate a new component called `login`, 
and route to that component then adjust it for the login layout. 

Inside the `/angular-iot-app` directory of the project, create a new component on the terminal `ng g c login`. Then when you navigate back to the `/sictcweb/angular-iot-app/src/app` folder path, you should see a new folder called login.

```console
pi@raspberrypi:~/sictcweb/angular-iot-app $ ng g c login
CREATE src/app/login/login.component.scss (0 bytes)
CREATE src/app/login/login.component.html (20 bytes)
CREATE src/app/login/login.component.spec.ts (619 bytes)
CREATE src/app/login/login.component.ts (272 bytes)
UPDATE src/app/app.module.ts (695 bytes)
pi@raspberrypi:~/sictcweb/angular-iot-app $ cd src/app/
pi@raspberrypi:~/sictcweb/angular-iot-app/src/app $ ls
app.component.html  app.component.spec.ts  app.module.ts          home
app.component.scss  app.component.ts       app-routing.module.ts  login
pi@raspberrypi:~/sictcweb/angular-iot-app/src/app $ 
```

## Login Routing
We will route this component just like we did with the home component, except this time we will use `routerLink` to bind the route to a button.

In the `/sictcweb/angular-iot-app/src/app/home` directory, open the `home.component.html` file. Now add the following button below. This will be in between the last `</div>` tag and the `</body>` in the file.

##### home.component.html
```html
<button class="button" routerLink="/login">Log Out</button>
```
Save your changes and go to the `/sictcweb/angular-iot-app/src/app` directory. Locate `app.module.ts` file and apply the following changes below. We are going to change the route so that the user is pointed to the login page first.

##### app.module.ts

```typescript
imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ])
  ],
```
So the file path works as the following. The user will go to the login screen either when they go to the default page or if the address has the `/login` portion typed in the address bar. The user will get to the `/home` screen once they use a correct login.

While you are in this file, verify that the import `LoginComponent` is included and that `LoginComponent` is also inside your declarations. Save your changes once you have confirmed this.

In the same directory, we also need to make changes to our routes for the user in both the body and `import` sections. Add the following below for `app-routing.module.ts`

##### app-routing.module.ts
```typescript
import { LoginComponent } from './login/login.component';
```

##### app-routing.module.ts
```typescript
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }
];
```

Now refresh your browser and check to make sure your button takes you where it should. There should be a simple plain message at the top left of the page with the line `login works!`.

Remember to leave the `LoginComponent` path as `login` alone becuase we will want the `Account` to be able to logout.

## Login HTML and SCSS

Now lets update our HTML & SCSS files for the appearance of a login page. It would be farily pointless if the login screen did not allow a user to enter their credentials. Insert the following into their correct file locations. Remember that this will be in the directory `/sictcweb/angular-iot-app/src/app/login `. 

First start with the html. Clear out the one liner of the html file and paste in the following.

##### login.component.html
```html
<body class="body">
    <div class="title-bar">
        <div class="title-string">
            IoT Web Page
        </div>
    </div>
    <div class="form">
        <div class="header">
            LOGIN
        </div>
        <div class="input">
            <div class="username">
                <div class="name-header">Username</div>
                <input class="name-input" [(ngModel)]="username" name="username" type="text">
            </div>
            <div class="password">
                <div class="pswrd-header">ID Number</div>
                <input class="pswrd-input" [(ngModel)]="idNum" name="idNum" type="text">
            </div>
        </div>
        <div class="login">
            <button class="login-btn" (click)="loginBtn()">Login</button>
        </div>
        <div class="new-acc">
            <div class="new-acc-msg">
                Don't Have an account?
            </div>
            <button class="new-acc-btn" routerLink='/new-acc'>Create New Account</button>
        </div>
    </div>
</body>
<router-outlet></router-outlet>
```
So this html file is presenting a couple of new concepts that work with angular. Let's go over a couple of them.

The newest class you see here is called `form`. Angular uses forms to handle user input of data. In this case, we are allowing the user to login and must enter their credentials. We have the section for their username and password, with their password being their ID number assigned in the database from earlier. 

Both the username and password are going to use an input class with a directive called `[(ngModel)]`. The directive `[(ngModel)]` allows for two-way binding that can be used in HTML or in a component. 

So in our source code, the two-way data being binded is what a user is entering for their username and password. We have to specify how the value will be passed. In our case, this is `type="text"` or the value will be in a text format.   Whatever is put in the input section will be tied to the application data needing verification. Not only can we set the value, but we can fetch the data from this directive. The property is bound in the brackets `[]` while the event is enclosed in the paraenthesis `()`. 

In simpler terms, you can think of it as a placeholder that changes depending on the user. If you look at your Amazon account, it will say `Hello, You`. However, if you are on your friend Newman's account, the account may say `Hello, Newman`.

In this case the variable `idNum` is assigned text from a user which can now be used within the typescript code. There is also another binding we are making on the `username`. When using the `[(ngModel)]` binding tag, remember to include the name binding tag as well. The name binding you choose acts as a waypoint to the `HTML` element, which points to a `Typescript` property.

We also add a `(click)` function. This element binds to a button click and activates a givin function, in this case `loginBtn()`. If a user clicks that button, the function should then perform the designated function you code for activation. If the login is correct, it should take the user to their account. If it fails, it may just display an error message.

At the end, we also give the user the ability to create an account. This will come later, but we want to go ahead and include some of the simple matter right now. New accounts will ask the user to put all information related to their account when clicked.

Save your changes and lets style the login page. By now you probably realize that if you are going to edit the html file, the next section you edit is the scss.

##### login.component.scss
```scss
.body {
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
    .form {
        margin-top: 50px;
        border-color: rgb(8, 0, 0);
        border-width: 5px;
        border-radius: 4px;
        background-color: rgb(179, 179, 179);
        width: 350px;
        height: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        .header {
            font-size: 27px;
            font-family: sans-serif;
        }
        .input {
            .username {
                .name-header {
                    font-size: 17px;
                    font-family: sans-serif;
                }
                .name-input {
                    width: 250px;
                    height: 30px;
                }
            }
            .password {
                margin-top: 17.5px;
                .pswrd-header {
                    font-size: 17px;
                    font-family: sans-serif;
                }
                .pswrd-input {
                    width: 250px;
                    height: 30px;
                }
            }
        }
        .login {
            .login-btn {
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
        .new-acc {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            .new-acc-msg {
                font-size: 18px;
                font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                color: rgb(0, 0, 0);
            }
            .new-acc-btn {
                margin-top: 20px;
                width: 180px;
                height: 45px;
                font-size: 17px;
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
Wow! That was a lot of code you pasted in. While it might seem confusing and a bit overwhelming, do not let this stress you out. The majority of what you are putting is just styling to make the site look pretty with custom format. You want to be proud and show this off don't you?

The new major thing to keep in mind is the `type` field in `</input>` tag. This is because the type determines the type of input and therefore what should be called in the field. For example if a button is being used then it will become a Truthy statement.

As well as pay attention to how the styling is placed in for the scss file. Notice how it matches along with the html? Its good pratice to drill this in as you learn to connect the front-end and have to make changes. Plus if anyone else is reviewing your code, they want to have a clean and easy style to follow. The more messy the code, the more frustrating it is for troubleshooting.

## FormsModule

Now before you build your website again, we need a way for the two-way binding for the two way inputs to work. Since the user can add in multiple fields and are in a `Form` class, we need to add a certian module.

Go back to your directory `sictcweb/angular-iot-app/src/app`. Open up the `app.module.ts` file and add the import to the others.

##### app.module.ts
```typescript
import { FormsModule } from '@angular/forms';
```
and inside the `imports: [`, add it with the other module calls you have. After adding `FormsModule` you should have five module calls total.

##### app.module.ts
```typescript
BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot
```

Save your changes. Now if you try to serve your webpage, you will get plenty of errors. Don't fret on this! We just need to build out the values for a couple of properties. 

The errors you will be running into will be your application will not recognize certain values you put in for the `ngmodule` sections. We will have to create interfaces and services for that so when the user passes the data through, it will be handled and placed properly for the query. However, we need to build our new account page for the next section.

## New Account Page

So we know that we have a login page floating around somewhere, but still keep up the good work! You have made a login page, something a lot of people never know where to begin or have not attempted until late in college.

Now it's your turn to make the next page and help clear out some errors. First, create a new component called `new-acc` inside the `sictcweb/angular-iot-app` folder directory. Let's route that component and create the layout of its HTML & SCSS.

If you need help of get stuck refer to the example below. We will begin tying in the routing after you create the new component.

## New Account Routing

Let's get the difficult part out of the way first. We need to create the route so that a user can access to create a new account.

##### app.module.ts
```typescript
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'new-acc',
        component: NewAccComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ])
  ],
```

Just a small change here, all you are doing is adding a path for the page of a new account. Now go ahead and create the route layout.

##### app-routing.module.ts

```typescript
import { NewAccComponent } from './new-acc/new-acc.component';
```
<b>Note</b>: Unlike with your `app.module.ts` file, you always have to manually add the import you will use with the routing module. Many common errors for beginners come from not importing the correct components, making Angular freak out when you test your changes. Always check your routing file after your finish with the `app.module.ts`.

And add onto the routes in that same file. You may already have a couple of these included from the previous section.

##### app-routing.module.ts
```typescript
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'new-acc', component: NewAccComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }
];
```
Save your changes after adding the above code. Go ahead and `ng serve` your angular IoT application. After adding all the correct routes, you should now see a login screen with `IoT Web Page` in the top center. There should also be a small, square box in the middle of your page called `LOGIN` with two textboxes asking for input on the username and ID number. There should also be a button at the bottom with the text saying `Create New Account`.

## New Account HTML and SCSS

Now lets design the HTML file for the new account. Navigate back to the `/sictcweb/angular-iot-app/src/app/new-acc` folder path to edit the file.

##### new-acc.component.html`
```html
<body class="body">
    <div class="title-bar">
        <div class="title-string">
            IoT Web Page
        </div>
    </div>
    <div class="form">
        <div class="header">
            CREATE NEW ACCOUNT
        </div>
        <div class="input">
            <div class="input-field">
                <div class="header">Name</div>
                <input id="name" class="input" value="{{name}}" [(ngModel)]="name" type="text">
            </div>
            <div class="input-field">
                <div class="header">Address</div>
                <input class="input" value="{{address}}" [(ngModel)]="address" id="address" type="text">
            </div>
            <div class="input-field">
                <div class="header">City</div>
                <input class="input" value="{{city}}" [(ngModel)]="city" id="city" type="text">
            </div>
            <div class="input-field">
                <div class="header">State</div>
                <input class="input" value="{{state}}" [(ngModel)]="state" id="state" type="text">
            </div>
            <div class="input-field">
                <div class="header">Zip</div>
                <input class="input" value="{{zip}}" [(ngModel)]="zip "id="zip" type="text">
            </div>
        </div>
        <div class="new-acc">
            <button class="new-acc-btn" (click)="newAccBtn()">Create Account</button>
        </div>
        <div class="login">
            <div class="login-msg">
                Already Have An Account?
            </div>
            <button class="login-btn" routerLink='/login'>Login</button>
        </div>
    </div>
</body>
<router-outlet></router-outlet>
```

Again just like on the login page, you also have the `form` field. Since you are adding in all your following information, this makes sense to use a form on the page.

Similar to the login page, you also see the `[(ngModel)]` being passed through when a user is submitting information. Creating the account would require a validation page, similar to updating and account with the correct information. When a user creates an account, they need to fill out all five fields for a new account.

To add with the account, you should already have a parameter set up from the database tutorial that catches for state abbreviations. Say a user creates their account, but puts three characters for the state initial instead of two. Not only will the form stay on the page, but you should also receive an error on the backend with `index.js` running. The console window should appear as such.

##### Terminal Results
```console
ERROR: Error: Data too long for column 'State' at row 1
```
This helps catch any errors that appear if a user is randomly typing characters. Note however that we are not checking the characters for being letters, numbers, special characters, etc... For now that's outside the scope of this example.

After finishing the html file, now you need to finish the scss file.

##### new-acc.component.scss
```scss
.body {
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
        .new-acc {
            .new-acc-btn {
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
        .login {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            .login-msg {
                font-size: 18px;
                font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                color: rgb(0, 0, 0);
            }
            .login-btn {
                margin-top: 20px;
                width: 180px;
                height: 45px;
                font-size: 17px;
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

We will also need to edit the typescript file. This is where we will call the activation when someone clicks on the `newAcc` button. We will just leave a comment here, indicating that this needs some code later.

##### new-acc.component.ts

```typescript
export class NewAccComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  newAccBtn() {
    // Will add new account function for a user
  }
}
```

Now in the next section, you will begin to work with the service and interface typescript files. These files will be able to add and read information that must communicate with your database.

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

## <b>Continue to [ Angular Part 2](web/ux/README3.md)</br>

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
