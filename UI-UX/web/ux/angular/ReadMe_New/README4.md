# Angular (Web Framework) (Part 3).

## Table of Contents
- [Overview](#overview)<br>
- [Using Global SCSS](#using-global-scss)<br>
- [Using trackBy](#using-trackby)<br>
- [Removing Page Border](#removing-page-border)<br>
- [Adding Component Library](#adding-component-library)<br>
- [Adding Font Awesome](#adding-font-awesome)<br>

## Overview
This tutorial will cover adding some creature comforts and advancing that stage of your app. Our goal is always to make ur products run as fast and efficient as possible. This also means making your job of programing a page a lot easier. We will be removing more code than adding for most of this. And what we do add will be more efficient giving you the ability to expand.

## Using Global SCSS
Here we will cover how to use global scss classes. Essencially this allows us to write our scss once for repeating html class tags. Take our forms for example. We use the same scss for every form. Let's fix that.

Create a folder called `sass` in the `assets` folder. Now add a file called `_global.scss` in the `sass` folder. Also add folder called `global`, then add the file `_form.scss` in the `global` folder. This should be your layout.
```
- assets
-- sass
--- _global.scss
--- global
---- _form.scss
```
Now remove the `.form-input` from the `auth-form.component.scss` and `acc-form.component.scss`.
Then place the following code in the `_form.scss`.
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
Now open the `_global.scss` file and add the following line of code. This will import all of the scss from `_form.scss`.
```scss
@import '../sass/global/form';
```
Finally we will need to import it in the `styles.scss` file in the `/src` directory.
```scss
@import './assets/sass/_global';
```
Now load the project and check to make sure it works. Now anytime you use the `.form-input` then it will auto style the html for you. Nothing else is required. 

## Using trackBy
This section will cover the usage and purpose behind `trackBy`. `trackBy` is a DOM listener that allows us to edit specific `DOM Elements` only vs. updating the entire page after changing a `DOM`. Let me give you an example.

Say you had the following list of buttons
```html
<button class="Item">Item1</button>
<button class="Item">Item2</button>
<button class="Item">Item3</button>
```
Now if we were to delete `Item1` then the DOM will also have to reload `Item2` and `Item3`. If we use `trackBy` in the `*ngFor` statement then only the item with the index of the item being edited will be removed. `DOM Elements` `Item2` and `Item3` will be left along.

Lets start by adding the following function to your `account.ts` service file inside yout `/services` file path.
```ts
trackByIndex(index: number): number {
    return index;
}
```
(will have errors here due to index not being added or recognized)

Now open the `accounts.component.ts` and change the `private accService` to `public`.
Then open the `accounts.component.html` and the following code to the `*ngFor` statement.
```html
*ngFor="let account of accounts; let i = index; trackBy: accSerivce.trackByIndex(index);"
```

Now run your code to make sure it works. You won't notice anything specific has changed but the `DOM` very much has.

## Removing Page Border
This is a simple one but many people struggle with this for one simple reason. They don't understand the structure of an angular app. Your base `HTML` file will always be `index.html` not `app.component.html`. Your base syling sheet is `styles.scss` not `app.component.scss`. In this case the border placed around the entire page can simply be added by adding the following code to the `index.html`. Add `style="margin: 0;"` to the corresponding spot. Follow the example.

`index.html`
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AngularIotApp</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body style="margin: 0;">
  <app-root></app-root>
</body>
</html>
```
Now load your page and you should no longer see a border on the sides.

## Adding Component Library

Here we will be adding the Component Library from VinPoint. A Component Library is a list of really accessable components that can be called at an point in time as many times as needed. This is also important because it allows us to save our work without having to have repeating code.

First create a file in `src` called `.npmrc`. This is our controller which will tell us where we need to fetch our npm from. 

Now enter the following code to the file.
```
@cpht:registry=https://gitlab.com/api/v4/packages/npm/
//gitlab.com/api/v4/packages/npm/:_authToken="${OAUTH_TOKEN}"
```
Your `authToken` will be provided to you from a supervisor and should look as follows.
```
npm/:_authToken=xxxxxxxx_xxx
```
Now run the following command in the project terminal.
```cmd
npm i @cpht/web-components
```

Now refer to the following document for the usage and input types for all of the components. Besides that you are ready to go.
```link
https://gitlab.com/cpht/shared-resources/npm-packages/web-components
```

## Adding Font Awesome
Here we will be adding Font Awesome. Font Awesome is a service that generates icons and fonts for us to use within our program. These are all custom and can only be called from its npm package.

First run the following command in the project terminal.
```cmd
npm install --save font-awesome angular-font-awesome
```
Then import it into the `app.module.ts`
```ts
//...
import { AngularFontAwesomeModule } from 'angular-font-awesome';
@NgModule({
  //...
  imports: [
    //...
    AngularFontAwesomeModule
  ],
  //...
})
export class AppModule { }
```
Then add the following to your `angular.json` file in home directory of the project.
```json
"styles": [
              "src/styles.scss",
              "../node_modules/font-awesome/css/font-awesome.css"
            ],
```
Now you are ready to use it. Here is an example with the `HTML`.
```html
<fa name="cog" animation="spin"></fa>
```
