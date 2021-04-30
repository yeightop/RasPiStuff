# (Part 4) Entity Creation: IoT Database

## Table of Contents
[Overview](#overview)<br>
[Systems Analysis](#systems-analysis)<br>
[Identify Tables](#identify-tables)<br>
[Identify Fields - Data Types](#identify-fields-data-types)<br>
[Entity Diagram](#entity-diagram)<br>
[Create Accounts Table](#create-accounts-table)<br>
[Verify Accounts Table](#verify-accounts-table)<br>
[Insert Account Record](#insert-account-record)<br>
[Create Users Table](#create-users-table)<br>
[Insert User Record](#insert-user-record)<br>
[Verify User Record](#verify-user-record)<br>
[Create IoT Table](#create-iot-table)<br>
[Create Groups Table](#create-groups-table)<br>
[Create IoTGroups Table](#create-iotgroups-table)<br>
[Create States Table](#create-states-table)<br>
[Verify All Tables](#verify-all-tables)<br>
[Challenges](#challenges)<br>
[Shortcuts Cheatsheet](#shortcuts-cheatsheet)<br>
[References](#references)<br>

<div id='overview'/>

## Overview

<b>Note</b>: This section will have you creating a new database, using what you learned earlier to create the scheme. Please pay attention and read carefully. The ending of this tutorial will be used in the next chapters.

This section is going to have you create a new database. The name of the new database will be called `IoT`. This separate entity will be used in the corresponding tutorial about how to build web API calls. Please read this section carefully and affirm you have all the correct tables built.

In this tutorial we will begin creating that are relational tables for our Internet of Things (IoT) application. On this section, we will be adding a lot more records and building out a database. However, the tables we will be adding data to will be `Accounts`. 

As always, the scripts used in this tutorial can be used to create other query's by simply modifying the syntax.

<div id='systemsanalysis'/>

## Systems Analysis
The first step to designing our database is to ask what are the data requirements of our application? Conducting a thorough `Systems Analysis Design`, or `SAD` for short.

A `SAD` helps to determine all entities and attributes which identify our tables and columns. Conducting a `SAD` reveals the relationship between tables commonly known as an `Entity Relationship Diagram (ERD)`. 
 
To keep this tutorial simple we will use bulleted lists and tables to illustrate. Since we are creating an IoT tracking system we need to store information about each IoT device. During the `SAD` we discovered the need to track the following items: 

- Accounts
- Users
- Iot
- Groups
- IoT Groups
- States

We also discovered that each IoT device can belong to multiple groups, which in this case changes the IoT to Groups relationship from a `1-1`, also called a one-to-one relationship, to a `1-N` relationship, also called a one-to-many relationship. 

This requirement is solved by adding table `IoTGroups` to house this relationship. Next we identify the attributes we want to track about each entity/table. This gives us a simple entity relationship diagram listed below.

<div id='identifytables'/>

## Identify Tables
- <b>Accounts</b>: Store account level information for the assets. This will allow us to bring on more than one organization to use the system.
- <b>Users</b>: Store the User login information. The Users belong to an Account.
- <b>IoT</b>: Store the device information along with current location. IoT devices belong to an Account.
- <b>Groups</b>: Store logical or geographical grouping information about an IoT(s). IoT(s) can be assigned to multiple groups. To help visualize the groups, think of departments within a company. A local maintenance company may have Groups for: Electrical, Plumbing, HVAC, etc.
 - <b>IoTGroups</b>: Store the relationship(s) between IoT and Group. IoT(s) can be assigned to multiple Groups thereby defining a ```1``` to ```N``` relationship between IoT(s) and Groups.
 - <b>States</b>: States will be used for the first part of testing in Web API.

<div id='identifytablesdatatypes'/>

## Identify Fields - Data Types

Keep in mind that the majority of this system is going to be managed by a few simple data types. For our experiment, the `Id` fields will be of type `int` and will set for `AUTO_INCREMENT`. 

The strings are of type `VARCHAR(n)` with `n` defining max number of characters. 

Dates are stored in `DATETIME` format and capture `Universal Time Coordinated (UTC)`. The application calculates time based upon the user's local timezone on their computer or device. Below you will see how the database `IoT` will be setup. The correct scheme we want will be revealed througout the tutorial.

<div id='entitydiagram'/>

## Entity Diagram

```console
Tables:
Accounts
 - Id (int)
 - Name (string)
 - Address (string)
 - City (string)
 - State (string)
 - Zip (string)
 - Phone (string)
 - LastUpdate
 - CreatedDate

Users
 - Id
 - AccountId
 - Email
 - LastName
 - FirstName
 - Password
 - LastLogin
 - LastUpdate
 - CreatedDate

IoT
 - Id
 - AccountId
 - TypeId
 - IMEI
 - Serial
 - Name
 - Lat
 - Lng
 - Alt
 - Speed
 - Direction
 - Bearing
 - LastUpdate
 - CreatedDate

Groups
 - Id
 - AccountId
 - Name
 - CreatedDate
 - LastUpdate

IoTGroups
 - Id
 - IoTId
 - GroupId
 - CreatedDate

States
 - Id
 - State
 - PK (Id)
 - UK (State)
```

<div id='createdatabase'/>

## Create Database

<b>Note</b>: I would advise to build all the tables that we have described above by the end of this tutorial. Database IoT in particular, will use the Accounts portion to demonstrate making API calls in the next chapter. Keep following below and by the end of the lesson, you should have all the tables built for the API tutorial.

I also advise to type out all the code instead of copying and pasting. Sometimes values will not be recognized in the same fashion when you copy them over instead of typing out the commands. You also build a better rentention to how the language works and envisionning what will happen on the backend.

Ok, we need to issue the following commands to get the database created and assigned to our user. This topic was covered previously so I will just be listing the commands in sequential order.

- Logout of MySQL: `exit;`
- Login as root: `sudo mysql -u root -p`
- Create the new database: `CREATE DATABASE IoT;`
- Grant Privileges: `GRANT ALL PRIVILEGES ON IoT.* TO 'sictc'@'localhost';`
- Flush Privileges: `FLUSH PRIVILEGES;`
- Logout: `exit;`
- Login with sictc: `sudo mysql -u sictc -p`
- Show Databases (optional): `SHOW DATABASES;`
- Select Database: `USE IoT;`

Remember to give privileges to the user you created for accessing the database.

<div id='createaccountstable'/>

## Create Accounts Table

Now we can go ahead and create our first table that will be used for furhter tutorials. Make sure you are in the database `IoT`.

```mysql
CREATE TABLE Accounts(
    Id int NOT NULL AUTO_INCREMENT, 
    Name varchar(50),
    Address varchar(50),
    City varchar(50),
    StateId int,
    Zip varchar(10),
    LastUpdate timestamp DEFAULT CURRENT_TIMESTAMP,
    CreatedDate timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Id)
);
```
<div id='verifyaccountstable'/>

## Verify Accounts Table
Now that we created the new table, let's verify its existence by issuing the `SHOW TABLES;` command. After confirming the existence we will ensure all fields attributes were created successfully by issuing the `DESCRIBE Accounts` command. You should get something similar to the accounts below.

```mysql
SHOW TABLES;
```
Query Results:
```mysql
+------------------+
| Tables_in_IoT    |
+------------------+
| Accounts         |
+------------------+
1 row in set (0.001 sec)
```

```mysql
DESCRIBE Accounts;
```

Query Results:
```mysql
+-------------+-------------+------+-----+---------------------+----------------+
| Field       | Type        | Null | Key | Default             | Extra          |
+-------------+-------------+------+-----+---------------------+----------------+
| Id          | int(11)     | NO   | PRI | NULL                | auto_increment |
| Name        | varchar(50) | YES  |     | NULL                |                |
| Address     | varchar(50) | YES  |     | NULL                |                |
| City        | varchar(50) | YES  |     | NULL                |                |
| StateId     | int(11)     | YES  |     | NULL                |                |
| Zip         | varchar(10) | YES  |     | NULL                |                |
| LastUpdate  | timestamp   | NO   |     | current_timestamp() |                |
| CreatedDate | timestamp   | NO   |     | current_timestamp() |                |
+-------------+-------------+------+-----+---------------------+----------------+
7 rows in set (0.006 sec)
```

<div id='insertaccountrecord'/>

## Insert Account Record
Now that we verified the existence of our new table called `Accounts`, we can add new records via the `INSERT` command. For this example I will add two accounts.

```mysql
INSERT INTO Accounts (Name, Address, City, StateId, Zip) VALUES ('SICTC', '1901 Lynch Rd', 'Evansville', 1, '47711');
```

Query Results:

```mysql
Query OK, 1 row affected (0.010 sec)
```
<div id='verifyaccountrecord'/>

## Verify Account Record

Now lets verify our account that we just added into our records. Type in the command below.

```mysql
SELECT * FROM Accounts;
```

Query Results:
```mysql
+----+-------+---------------+------------+---------+-------+---------------------+---------------------+
| Id | Name  | Address       | City       | StateId | Zip   | LastUpdate          | CreatedDate         |
+----+-------+---------------+------------+---------+-------+---------------------+---------------------+
|  1 | SICTC | 1901 Lynch Rd | Evansville |       1 | 47711 | 2020-09-28 17:04:08 | 2020-09-28 17:04:08 |
+----+-------+---------------+------------+---------+-------+---------------------+---------------------+
1 row in set (0.001 sec)
```

I would advise adding a couple more records in this section for `Accounts`. This will be the table deomonstrated when building a user interface. Having more accounts included means you can test more without having to jump back as much.

<div id='createuserstable'/>

## Create Users Table
Before we cut loose and build out the next tables I want to walk through creating the `Users` table. In particular, we have a column that requires special attention, the password for each user.

<b>You never want to store a password in plain text format.</b>  This example stores the `Password` field as a `Secure Hash Algorithm (SHA)` checksum. Now luckily for us, MySQL provides such a function to secure passwords.

MySQL provides a `SHA1()` function that will hash values into 160 bit checksums. MySQL's `SHA1()` function returns these values in a `hexadecimal tuple` format for calculation.  To calculate the amount of storage of the `SHA` we use the following equation: `160 / 8 * 2 = 40`. The result tells us we need 40 characters of storage.  Since `SHA1()` consistently returns 160 bit values our `Password` field will have a datatype of `CHAR(40)` to store the `salted` password. 

Go ahead and create the `User` table with the information provided.

```mysql
CREATE TABLE Users(
    Id int NOT NULL AUTO_INCREMENT, 
    AccountId int NOT NULL,
    Email varchar(200) NOT NULL,
    LastName varchar(50),
    Firstname varchar(50),
    Password CHAR(40),
    LastLogin timestamp NULL,
    LastUpdate timestamp NULL, 
    CreatedDate timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Id),
    UNIQUE KEY (Email)
);
```
<div id='inseruserrecord'/>

## Insert User Record

Now we want to go ahead an insert our first new record. Go ahead and issue the command below with all the information provided.

```mysql
INSERT INTO Users (AccountId, Email, LastName, FirstName, Password) VALUES(1, 'johnc@sictc.edu', 'Cobb', 'John', SHA1('Pencil1'));
```
<div id='verifyuserrecord'/>

## Verify User Record

Again, it's important to always verify anything new that you add. Check the new user added: 

```mysql
SELECT * FROM Users;
```

Query Results:
```mysql
+----+-----------+-----------------+----------+-----------+------------------------------------------+-----------+------------+---------------------+
| Id | AccountId | Email           | LastName | Firstname | Password                                 | LastLogin | LastUpdate | CreatedDate         |
+----+-----------+-----------------+----------+-----------+------------------------------------------+-----------+------------+---------------------+
|  1 |         1 | johnc@sictc.edu | Cobb     | John      | 9e0259a2ef6cf6399c9a9a78072f1d79ce7f2f16 | NULL      | NULL       | 2020-09-28 19:32:43 |
+----+-----------+-----------------+----------+-----------+------------------------------------------+-----------+------------+---------------------+
1 row in set (0.000 sec)
```

Now do you see the section under `Password`? Note the `Password` field is scrambled and appear incoherent to human eyes. This prevents unwanted password snooping by database admins. Keep in mind that there are other more secure authentication schemes but this will get you started.


There you have it, we successfully created the Accounts table and inserted our first record! Now we need to finish up creating the rest of our tables.

<b>Hint</b>: Following the `ERD`is the key to building the remaining tables. 

## Create IoT table

The `IoT` table will list all of our selected devices that are connected on our network. This could include the Raspberry Pi that you are working on for this tutorial.

Create a new table called `IoT` and use the following scheme below:

```mysql
CREATE TABLE IoT(
    Id int NOT NULL AUTO_INCREMENT, 
    AccountId int NOT NULL,
    TypeId int NOT NULL,
    IMEI CHAR(16) NOT NULL,
    Serial VARCHAR(20) NOT NULL,
    Name varchar(50) NOT NULL,
    Lat int NULL,
    Lng int NULL,
    Alt int NULL,
    Speed int NULL,
    Direction int NULL,
    Bearing int NULL,
    LastUpdate timestamp NULL, 
    CreatedDate timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Id)
);

```

## Create Groups Table

Our Groups table will be next. The general scheme is below.

```mysql
CREATE TABLE Groups(
    Id int NOT NULL AUTO_INCREMENT, 
    AccountId int NOT NULL,
    Name varchar(50),
    LastUpdate timestamp NULL,
    CreatedDate timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Id)
);
```

## Create IoTGroups Table

The second last table we need to create is the `IoTGroups` table. This table will be for any groups our IoT devices may be lumped into.

```mysql
CREATE TABLE IoTGroups(
    Id int NOT NULL AUTO_INCREMENT, 
    IoTId int NOT NULL,
    GroupId int NOT NULL,
    CreatedDate timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Id)
);

```

## Create States Table

The last table we need to check for is our `States` table. This will also be in our `IoT` database. Write the scehem to your database like the following:

```mysql
CREATE TABLE States(
    Id int NOT NULL AUTO_INCREMENT, 
    State varchar(2),
    PRIMARY KEY (Id),
    UNIQUE KEY (State)
);

```

We have both a primary and unique key attached to State. The reason for this is to catch any states that end up including duplicate values. We don't want any two states sharing the same initials. Such mistakes can happen with certain states like Minnesota, Maryland, Missouri, Mississippi, and others that follow. Check for existence of your tables with the command below.

```mysql
MariaDB [IoT]> SHOW tables;
```
and you should get back the tables created.

```mysql 
+---------------+
| Tables_in_IoT |
+---------------+
| Accounts      |
| Groups        |
| IoT           |
| IoTGroups     |
| States        |
| Users         |
+---------------+
```

Don't worry if you tables appear out of order in this tutorial. As long as they have been built and hold the correct scheme, you can move on.

## Verify All Tables

After you have created all the final tables needed, you should always do a check on the tables you have created. Good practice is to check peridoically on small changes. For example, I would chekc to verify all of my tables were created after making them and verifying the existence. Testing peridoically is to help minimize where a problem occured when building your database. The other benefit is it reduces mental fatigue as you go. You also need to check to see if you added everything correct in accordance to the scheme. Let's check the last four tables you just created. First lets chek the table `IoT`.

```mysql
MariaDB [IoT]> DESCRIBE IoT;
+-------------+-------------+------+-----+---------+----------------+
| Field       | Type        | Null | Key | Default | Extra          |
+-------------+-------------+------+-----+---------+----------------+
| Id          | int(11)     | NO   | PRI | NULL    | auto_increment |
| AccountID   | int(11)     | NO   |     | NULL    |                |
| Name        | varchar(50) | YES  |     | NULL    |                |
| TypeID      | int(11)     | NO   |     | NULL    |                |
| Lat         | int(11)     | NO   |     | NULL    |                |
| Lng         | varchar(50) | YES  |     | NULL    |                |
| LastUpdate  | timestamp   | YES  |     | NULL    |                |
| CreatedDate | timestamp   | YES  |     | NULL    |                |
+-------------+-------------+------+-----+---------+----------------+
8 rows in set (0.004 sec)

MariaDB [IoT]> 
```
Now let's check `IoTGroups`

```mysql
MariaDB [IoT]> DESCRIBE IoTGroups;
+-------------+-----------+------+-----+---------------------+----------------+
| Field       | Type      | Null | Key | Default             | Extra          |
+-------------+-----------+------+-----+---------------------+----------------+
| Id          | int(11)   | NO   | PRI | NULL                | auto_increment |
| IoTId       | int(11)   | NO   |     | NULL                |                |
| GroupId     | int(11)   | NO   |     | NULL                |                |
| CreatedDate | timestamp | NO   |     | current_timestamp() |                |
+-------------+-----------+------+-----+---------------------+----------------+
4 rows in set (0.004 sec)

```
Next will be just `Groups`

```mysql
MariaDB [IoT]> DESCRIBE Groups;
+-------------+-------------+------+-----+---------------------+----------------+
| Field       | Type        | Null | Key | Default             | Extra          |
+-------------+-------------+------+-----+---------------------+----------------+
| Id          | int(11)     | NO   | PRI | NULL                | auto_increment |
| AccountId   | int(11)     | NO   |     | NULL                |                |
| Name        | varchar(50) | YES  |     | NULL                |                |
| LastUpdate  | timestamp   | YES  |     | NULL                |                |
| CreatedDate | timestamp   | NO   |     | current_timestamp() |                |
+-------------+-------------+------+-----+---------------------+----------------+
5 rows in set (0.004 sec)
```

And last, check the table `States`

```mysql
MariaDB [IoT]> DESCRIBE States;
+-------+------------+------+-----+---------+----------------+
| Field | Type       | Null | Key | Default | Extra          |
+-------+------------+------+-----+---------+----------------+
| Id    | int(11)    | NO   | PRI | NULL    | auto_increment |
| State | varchar(2) | YES  | UNI | NULL    |                |
+-------+------------+------+-----+---------+----------------+
2 rows in set (0.004 sec)
```

In regards of checking all the tables after creation, I would advise to check them individually after building them. This is just better practice as in build small, test small, and fix small problems. The longer you go without building and verifying, the farther you have to backtrack when an error does occur.

## Challenges:

### Challenge 1

The next challenge is to change the `Password` field from `SHA1 160 bit` salt to `SHA2 512 bit`. This will require a change to the `SHA` function and the `CHAR(n)` data type.


### Altering Fields:

While creating this tutorial I accidentally pasted an incorrect datatype for the `Address` and `City` fields. These fields were created with `varchar(2)` data types. This limits the number of characters allowed in the fields to just two.  Not enough to capture the full Address and City. Instead of dropping the table, I was able to issue the `ALTER TABLE` command to change each field's data type. See example below:

```mysql
ALTER TABLE Accounts MODIFY Address varchar(50);
ALTER TABLE Accounts MODIFY City varchar(50);
```

Anytime you need to make alterations to the table, you can use these commands instead of destroying and creating a new table.

### Time Stamp Fields;
When updating records, it's a good idea to log the last time the record was updated. We typically record this in our `LastUpdate` column. When designing your `UPDATE` statements, you can use the builtin `NOW()` function to date or time stamp this field. Check out the example below for more details:

```mysql
UPDATE Accounts SET StateId = 2, LastUpdate = NOW();
```
<div id='cheatsheet'/>

Before moving on to the next section be sure to logoff of MySQL (mariadb).
```mysql
quit;
```

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
|`cat`| Short for `concatenate`, it displays contents of a file. You can think of it like `call at attention`. |

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
|`JOIN value`| Ability to join rows from a table to another table |


<div id='references'/>

## References
 - https://www.w3schools.com/sql
 - https://www.howtogeek.com/410442/how-to-display-the-date-and-time-in-the-linux-terminal-and-use-it-in-bash-scripts/
 - https://phoenixnap.com/kb/change-mysql-time-zone
 - https://www.geeksforgeeks.org/mysql-sha1-function/

## Continue to [Extras MySQL](db/MYSQLTZ.md)

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
