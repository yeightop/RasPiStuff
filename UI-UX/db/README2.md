# (Part 2) Tables, Querys, and SQL.

## Table of Contents

[Overview](#overview)<br>
[Structured Query Language (SQL)](#structured-query-language-sql)<br>
[Creating Tables](#creating-tables)<br>
[Inserting Records](#inserting-records)<br>
[Querying Records](#querying-records)<br>
[Updating Records](#updating-records)<br>
[Deleting Records](#deleting-records)<br>
[Altering Tables](#altering-tables)<br>
[Challenge](#challenge)<br>
[A Word on Optimization](#a-word-on-optimization)<br>
[Shortcuts Cheatsheet](#shortcuts-cheatsheet)<br>
[References](#references)<br>

<div id='overview'/>

## Overview
In this tutorial we will begin creating tables from the MySQL console. The script used in this tutorial can be used to create other tables by simply modifying the table, field names, and data types.

<div id='sql'/>

## Structured Query Language (SQL)
Going into the depths of SQL is beyond the scope of this tutorial but I will list some basic SQL commands below. This will get you started on your journey of becoming a great database designer or administrator.

## Table Operations
```console
SHOW
DESCRIBE
CREATE
ALTER
DROP
```

Heres a brief description of each command

| Command | Definition | 
|---|---|
|`SHOW tables`| Lists the available tables.|
|`DESCRIBE tables`| Shows the contexts of the rows and values of the selected table.|
|`CREATE tables/values`| Creates a new table.|
|`ALTER table/database`| Modifies the selected tables or databases.|
|`DROP tables/values`| Deletes the table or selected value.|



## Query Operations
Query operations are SQL commands issued again a SQL database to Create Read Update Delete records in a particular table. As the acronym spells out these are known as CRUD operations.

```console
INSERT
SELECT 
UPDATE
DELETE
```
<b>Note</b>: CREATE is also part of INSERT. The SELECT statement also contributes to the Read operation.

<div id='creatingtables'/>

## Creating Tables
First things first, if you logged out of your Raspberry Pi, login to your Raspberry Pi as in the previous tutorial and connect to the MySQL console. 

<details><summary><b>Pro tip:</b></summary> sudo mysql -u sictc -p will get you logged in or what you made your username.</details>

List the databases using the `SHOW DATABASES;` to ensure our `exampledb` is present. 

Once confirmed, connect to the `exampledb` database by issuing the command `use exampledb;` from the MySQL console. This will switch the selected database to `exampledb`.

<b>Pro tip</b> If you forget who you logged in as in MySQL, issue the ```SELECT CURRENT_USER();``` command. MySQL responds with the currently logged in user. 

Let's start by creating our first table for our contacts database. The first thing we're going to need is a table to store the contacts. From the MySQL mysql copy and paste the `CREATE TABLE` command below.

```mysql
CREATE TABLE Contacts(
    Id int, 
    LastName varchar(100),
    FirstName varchar(100)
);
```

When the command completes we are notified with a successful response. You should see something to the effect:

```mysql
Query OK, 0 rows affected (0.115 sec)
```

Next we are going to check if our table exists by issuing the `DESCRIBE` command. This will return the structure of the table including field names, data types, as well as other information.

<b>Note</b>: Some of the information that will be returned is beyond the scope of this tutorial for right now. Just soak up the information to retain later.

```mysql
DESCRIBE Contacts;
```
Below are the results of our `DESCRIBE` command. 
```mysql
+-----------+--------------+------+-----+---------+-------+
| Field     | Type         | Null | Key | Default | Extra |
+-----------+--------------+------+-----+---------+-------+
| Id        | int(11)      | YES  |     | NULL    |       |
| LastName  | varchar(100) | YES  |     | NULL    |       |
| FirstName | varchar(100) | YES  |     | NULL    |       |
+-----------+--------------+------+-----+---------+-------+
3 rows in set (0.005 sec)
```
We can see that each field and data type are the same compared to the `CREATE TABLE` command we issued previously.

<div id='insertingrecords'/>

## Inserting Records

Now that we have our table ready we can insert some example records. In this case we will be adding two contacts, Jane Doe and Max Payne.

```mysql
INSERT INTO Contacts VALUES(1, 'Doe', 'Jane');
INSERT INTO Contacts VALUES(2, 'Payne', 'Max');
```
Barring any errors, you should see something similar to the message listed below for each command:

```mysql
Query OK, 1 row affected (0.069 sec)
```

<b>Note</b>: In the chance you get the error `Column count doesn't match value count at row 1`, there's a good chance you did not fill out all the required fields. In the example above, we just have three values being added as the Id, first name, and last name. If you had another category but did not fill out the information, this message will appear. 
<div id='queryingrecords'/>

## Querying Records

Now for the fun part, seeing all of you information appear in a query! Let's query all of the records in our new table. There should only be one.

```mysql
SELECT Id, LastName, FirstName FROM Contacts;
```
Query Results:
```mysql
+------+----------+-----------+
| Id   | LastName | FirstName |
+------+----------+-----------+
|    1 | Doe      | Jane      |
|    2 | Payne    | Max       |
+------+----------+-----------+
2 rows in set (0.001 sec)
```
For only three fileds to fill out, this query is fine to type out. However, if you have more than several categories to search through on a user, you can use a quicker method. The quickest way is with the command `SELECT * FROM Contacts`. This would give you the same result, since the `*` character represents all columns in the table.

<div id='updatingrecords'/>

## Updating Records

Now that you have seen what some of the records you created appear, now we want to update a contact. Issue the following command below to change the record of the first id.

```mysql
UPDATE Contacts SET FirstName = 'Sweet', LastName='Caroline' WHERE Id = 1;
```
Query Results:

```mysql
Query OK, 1 row affected (0.010 sec)
Rows matched: 1  Changed: 1  Warnings: 0
```

<div id='deletingrecords'/>

## Deleting Records
There are times when your application will need to delete records from the database. Maybe a user is no longer with your company. Perhaps a new subscriber has cancelled their subscription. You don't want to leave any contacts in your database that don't need to be there. This leads to bloat and questions needing answers.

 The `DELETE` command allows us to do just that. For this tutorial, we just want to focus on removing one contact at a time. 

```mysql
DELETE FROM Contacts WHERE Id = 2;
```
Now if we query the records in the database we can see Max Payne has been removed and Sweet Caroline is all alone in the Contacts table.

Query Results:
```mysql
Query OK, 1 row affected (0.009 sec)
```

<b>Note</b>: Another concept related to deleting records. Cascading deletes and orphaning records is beyond the scope of this tutorial. However I encourage researching these topics before moving your system to production.

<div id='alteringtables'/>

## Altering Tables

There will be times when your database tables require changes to columns. Privileges change, people move to new locations, etc... Getting on top of changes in the database is important

The `ALTER` command allows you to add/remove or make changes to existing columns. For example, the following command will add the new column called `Email` to the `Contacts` table. 

```mysql
ALTER TABLE Contacts ADD Email varchar(255);
```
Once the command completes you will be notified of the number of rows set.

Query Results:

```mysql
Query OK, 0 rows affected (0.029 sec)
Records: 0  Duplicates: 0  Warnings: 0
```

<div id='challenge'/>

## Challenge

For an extra challenge use the `UPDATE` example above to add an email address to each user. If you forgot the `Id` of the Contact reference the `SELECT` example above. 

<div id='awordonoptimization'/>

## A Word on Optimization

<i>The rabbit hole of normalization and optimization burrows to infinity.</i>

Many times when concerned about optimization speed, having just the right level is all that is required. Your first instinct when trying to create a flow is how efficient can I make this? In reality, the first step is just getting the workflow to function correctly. Just like with any drafts in writing, optimization and normalizations go through constant revisions.

In many cases certain optimizations made can begin to create bottlenecks in other areas of performance.  I leave you with these words. Build the system you need today, optimize for today, forecast based on what you know today, adapt the system based on what you learned up to today, rinse... repeat.

<div id='summary'/>

## Summary

By now you are starting build up some basic SQL skills.  There are many purpose driven simplifications that are being made in this tutorial so that you experience the entire build up of skills. Before you can rely on the shortcuts, you need to understand how they work and why they exist. Instead of delivering you a cheat sheet, through this you build up a cheat sheet for memorization.  

<div id='cheatsheet'/>

## Shortcuts Cheatsheet

|Commands|Definition|
|---|---|
|`ssh pi@ipaddress`| Command to login to Raspberry Pi.|
|`raspberry`| Default password for Raspberry Pi. |
|`touch filename`| Command to create a file. |
|`ls`| Command to list contents in a directory. Think of the contents you see on your desktop icons. |
|`pwd`| Command that prints the current directly, called print working directory|
|`whoami`| Command that displays the current logged in user. |
|`sudo`| Command to allow admin executions, short for `super user do`|
|`apt update`| Command to update repository. |
|`apt upgrade`| Command to upgrade the installed packages. |
|`apt install packagename`| Command to install a package. |
|`arp`| Command displaying the IPv4 network neighbor cache.  |
|`grep`| Command that search for a pattern matching an expression. |
|`awk`| Command that search a file or text containing a pattern. |
|`cat`| Display contents of a file, think of it like `call at attention`. |

For MySQL

| Commands | Definition | 
|---|---|
|`sudo mysql -u sictc -p`| Login to MySQL console.|
|`quit;` or `CTRL+D`| Exit MySQL console.|
|`exampledb`| MySQL example database.|
|`Password1`| MySQL root password.|
|`sictc`| MySQL exampledb user.|
|`Pencil1`| MySQL exampledb password.|
|`SELECT CURRENT_USER();`| MySQL current logged in user.|
|`SHOW DATABASES;`| MySQL list all databases.|
|`USE sictc;`| MySQL use or choose a database.|
|`DESCRIBE Contacts;`| MySQL describe a table, giving you a layout.|
|`CREATE TABLE value`| Create a database table with certain types.|
|`INSERT INTO value`| Command to create a new record.|
|`SELECT value FROM`| Query a result to show the user.|
|`UPDATE value SET `| Update command that allows you to change a value.|
|`DELETE FROM value`| Removes a record from a table.|
|`ALTER TABLE value`| Adds, removes, or make changes to existing columns.|

### References
 - https://www.w3schools.com/sql

## Continue to [Database Part 3](README3.md)

<details><summary>Tutorial List</summary>

### Prep

[Raspberry Pi Prep](prep/README.md)<br>
[(Bonus) Flashing OS image to SD card: Linux Version](prep/README2.md)<br>

---

### Linux - WSl setup

[Operating System (Linux)](linux/README.md)<br>
[Toggle Raspberry Pi led light](linux/embed/README.md)<br>
[Autoboot Services](linux/embed/sysd/README.md)<br>

---

### Database

[(Part 1) Database (MySQL)](../db/README.md)<br>
[(Part 2) Tables, Queries, and SQL](../db/README2.md)<br>
[(Part 3) Working with Relations](../db/README3.md)<br>
[(Part 4) Putting it all together](../db/README4.md)<br>
[(Extras) Setting MySQL Timezone on Raspberry Pi](../db/MYSQLTZ.md)<br>

---

### Web

[Getting Started with Node](web/README.md)<br>
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
