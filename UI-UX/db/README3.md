#  (Part 3) Working with Relations

## Table of Contents

[Overview](#overview)<br>
[Normalization](#normalization)<br>
[Coffee Break](#coffee-break)<br>
[Relating Tables and Foreign Keys](#relating-tables-and-foreign-keys)<br>
[Joins](#joins)<br>
[Challenge](#challenge)<br>
[Shortcuts Cheatsheet](#shortcuts-cheatsheet)<br>
[References](#references)<br>

<div id='overview'/>

## Overview
In this tutorial we will begin creating relating tables from the MySQL console. 

Now why would we do something like that?

Storing all of the information in one table is not optimal. For example, think of your household. There's a good chance your family has a drawer called the junk drawer, stuffed with every object that doesn't have a specific place. Instead of having a junk drawer, its better to have multiple drawers dedicated to certain appliances. The same concept applies to databases.

For databases, normalizing the data into a relational structures reduces the amount of table space taken up by records. 

As always, the scripts used in this tutorial can be used to create other queries by simply modifying the syntax.

<div id='normalization'/>

## Normalization
In our `Contacts` table for our database `exampledb`, we need three additional fields. We will call the fields City, State, and Zip. City and Zip are pretty straight forward but the State column can be stored in a relating table. Furthermore, if there are additional tables that require a state we already have States table there for our convenience.

Below we will use the `CREATE` and `ALTER` commands to achieve or goal. We will then followup with an `UPDATE` command to populate the the newly created fields. Take note of the additional features of the `CREATE` command. Inside database `exampledb`, create the following.

```mysql
CREATE TABLE States(
    Id int NOT NULL AUTO_INCREMENT, 
    State varchar(2),
    PRIMARY KEY (Id),
    UNIQUE KEY (State)
);
```

In our example above, we are including an `AUTO_INCREMENT` field for `Id`. This allows us to just create the records as we need them and allow the database to number them accordingly. 

Another interesting field attribute you haven't seen yet is the `PRIMARY KEY`. When you include a `PRIMARY KEY`,  you are assigning an `Id` field constrained to provide a unique number. 

The `UNIQUE KEY` constraint placed on the `State` column prevents duplicate values. These are all very convenient features of Relational Database Management Systems (RDBMS).

There are difference between using a Primary Key and Unique Key. A Primary Key will not accept NULL values and must be filled where a Unique Key can have a NULL column, but only one NULL per column. There can be only one Primary Key per table, where there can be multiple Unique Keys. When you start getting involved with relating to different databases, this becomes crucial, especailly with using Unique Keys. With Unique Keys, this should still be a column that should not contain duplicates.

After adding the following above, you should get this message.

Query Results:
```mysql
Query OK, 0 rows affected (0.183 sec)
```
When you have created a table, you always want to verify its existence and its scheme. Let's do that now using `SHOW TABLES`. This will list all tables residing in a database.

```mysql
SHOW TABLES;
```
You should get two tables.

Query Results:
```mysql
+---------------------+
| Tables_in_exampledb |
+---------------------+
| Contacts            |
| States              |
+---------------------+
2 rows in set (0.001 sec)
```

Since we confirmed the table exists, lets also confirm the scheme exists as well. After creating a table, its always good practice to verify that you created the scheme correctly. Use the `DESCRIBE` command to check your new table.

```mysql
MariaDB [test01062021]> DESCRIBE States;
+-------+------------+------+-----+---------+----------------+
| Field | Type       | Null | Key | Default | Extra          |
+-------+------------+------+-----+---------+----------------+
| Id    | int(11)    | NO   | PRI | NULL    | auto_increment |
| State | varchar(2) | YES  | UNI | NULL    |                |
+-------+------------+------+-----+---------+----------------+
```

As you can see, we have both fields we created with the correct options specified. Null values have been noted, as well as if the Key is a Primary field or Unique field. 

Now that we verified the existence of our new table called `States` and the correct scheme, we can add new records into this table via the `INSERT` command. For this example I would like to add Indiana and Ohio. Take a look at the code below.

```mysql
INSERT INTO States (State) VALUES ('IN');
INSERT INTO States (State) VALUES ('OH');
```

You will notice a subtle difference between the previous `INSERT` commands and this one. 

This command includes a field listing at the beginning. That field being `State`. We could add more if we had more columns included to input in the same parenthesis. Each column would be separated by a comma.

Since the `Id` column is an `AUTO_INCREMENT` field, we can omit the parameter from the `INSERT` command, and thus not have to worry about adding the `Id` field. Anytime you are passing in fewer values than what the `TABLE` has columns, you need to explicitly pass in the fields you want to update. 

In simpler terms, the `VALUES` need to be in the same order as the field list or you will encounter errors.


We can verify the `AUTO_INCREMENT` field is working by querying the `States` table. We should see a record for `IN` and `OH`.

```mysql
SELECT * FROM States;
```

Query Results:
```mysql
+----+-------+
| Id | State |
+----+-------+
|  1 | IN    |
|  2 | OH    |
+----+-------+
2 rows in set (0.001 sec)
```

Now this is where Unique Keys come into play. For example, every state in the U.S. will have 50 Ids, representing the 50 states. Let's see what happends when we try to add Indiana, represented by `IN` again.

```mysql
INSERT INTO States (State) VALUES ('IN');
ERROR 1062 (23000): Duplicate entry 'IN' for key 'State'

```
If you do this for any State you have put into the table, the same error message will appear for you. Unique keys are used so data that is entered for them are not duplicates and can identify a tuple in a table. The data is suppossed to be unique, but not necessarily the sole identifier in a table.

<div id='coffeebreak'/>

## Coffee Break

Wow, we're moving right along and you are becoming a better database developer by the minute! Take a break, grab some coffee or go on a walk. Good time to let the diffuse mode of the brain to do it's work. We are covering a lot of material here and the number of relating research items that could branch off of each topic are too many to enumerate. So let's take 15-20 minutes and then come back.

<b>Note</b>: When working with computers, I encourage learning how to take time away from the computer. Not only will this help alleviate blocks you encounter, but will help you recharge when you return. You;ll run into problems that may take several hours of your time but when you come back after a rest, you realize the mistake could be fixed in 5 minutes.

<div id='relatingtablesandforeignkeys'/>

## Relating Tables and Foreign Keys
Now that you are well rested, we can continue on to the next lesson. 
The next step is to take table `States` and begin adding results. To do so, we will need to add a new column to our `Contacts` table. To add the new column, we will be using the `ALTER TABLE` command to add a new field names, `StateId`.

```mysql
ALTER TABLE Contacts ADD StateId int;
```

Our new field name will also use a data type of `int`. This field will store the `Id` from the `States` table.

Query Results:

```mysql
Query OK, 0 rows affected (0.016 sec)
Records: 0  Duplicates: 0  Warnings: 0
```

When making any such changes, you always want to verify before proceeding. We can now verify the table changes by issuing the `DESCRIBE` command on the `Contacts` table. Doing so should list all fields including the new `StateId` field. Enter the command below.

```mysql
DESCRIBE Contacts;
```
Query Results:
```mysql
+-----------+--------------+------+-----+---------+-------+
| Field     | Type         | Null | Key | Default | Extra |
+-----------+--------------+------+-----+---------+-------+
| Id        | int(11)      | YES  |     | NULL    |       |
| LastName  | varchar(100) | YES  |     | NULL    |       |
| FirstName | varchar(100) | YES  |     | NULL    |       |
| Email     | varchar(255) | YES  |     | NULL    |       |
| StateId   | int(11)      | YES  |     | NULL    |       |
+-----------+--------------+------+-----+---------+-------+
5 rows in set (0.004 sec)
```

Note the `StateId` column is of data type  `int`. In this case, we are using `int` to store the foreign key `Id` from the `States` table. That is exactly what we need to store is the desired `State` for each record corresponding with the `StateId` we give to our record. 

We can now use our `UPDATE` command to set the correct `State` for each record in our `Contacts` table. But before we update the `Contacts` table with the `StateId` column with the foreign key value, let's take a peek at what what records we have and the value currently stored in the `StateId` column.

```mysql
SELECT * FROM Contacts;
```
Query Results:
```mysql
+------+----------+-----------+--------------------------------------+---------+
| Id   | LastName | FirstName | Email                                | StateId |
+------+----------+-----------+--------------------------------------+---------+
|    1 | Doe      | Jane      | sweetcaroline@neildiamondfanclub.com |       1 |
+------+----------+-----------+--------------------------------------+---------+
1 row in set (0.001 sec)
```

And there she is, our Sweet Caroline all alone in our contacts table. The last time I checked she was tucked away in good old Indiana. Let's complete this entry by placing Caroline in her home state in the next section.

If by chance you have forgotten to update the `Email` or `StateId` area from the previous tutorial, go ahead and do so now like the following command:

```mysql
UPDATE Contacts SET Email = 'sweetcaroline@neildiamondfanclub.com', StateId = 1 WHERE Id = 1;
```

Now, if you run the command `SELECT * FROM Contacts;` you should have the appropriate styling.

```mysql
+------+----------+-----------+--------------------------------------+---------+
| Id   | LastName | FirstName | Email                                | StateId |
+------+----------+-----------+--------------------------------------+---------+
|    1 | Caroline | Sweet     | sweetcaroline@neildiamondfanclub.com |       1 |
+------+----------+-----------+--------------------------------------+---------+
1 row in set (0.000 sec)
```


<b>Note</b>: This example does not fully illustrate the power of relational tables but helps us perceive a good starting point. To put into perspective, imagine storing millions of records of relating types where the relating table is storing more than one field to represent the selection. One field could be related to many tables and needs to have the correct association.


<div id='joins'/>

## Joins

Relating tables is great, but for our information to make sense we need to join our tables.

 Using our `JOIN` command for `Contacts` and `States` will help alleviate our problem. For the most part our data is complete but we would like to see which state the contact is in.

```mysql
SELECT C.Id, C.LastName, C.FirstName, C.Email, S.State FROM Contacts C 
LEFT JOIN States S
ON
C.StateId = S.Id;
```

Query Results:
```mysql
+------+----------+-----------+--------------------------------------+-------+
| Id   | LastName | FirstName | Email                                | State |
+------+----------+-----------+--------------------------------------+-------+
|    1 | Doe      | Jane      | sweetcaroline@nieldiamondfanclub.com | IN    |
+------+----------+-----------+--------------------------------------+-------+
1 row in set (0.002 sec)
```
Ok, there we go, our data is now complete. Note the `SELECT` command is only pulling the necessary fields. This is a verbose but preferred method of writing queries. This keeps the number of fields and dataset size to a minimum. This is a good practice to get accustomed to as optimization, tuning, and code readability become more important. The more you practice with efficient work, the more you will start to think about how you can build queries in the most effective way possible. 

<div id='challenge'/>

## Delete Empty rows

If by chance you enter some information on a user, but forget to fill out a field, the field will be filled with NULL. Getting rid of any NULL values will take a special command you will have to do.

```mysql
DELETE FROM table WHERE columnname IS NULL;
```
## Challenge

Add the additional fields `City` and `Zip` to the `Contacts` table. `UPDATE` the fields with example data. Modify the `JOIN` query to include the new fields. Use various parts of this tutorial to complete this challenge.

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
|`JOIN value`| Ability to join rows from a table to another table |

<div id='references'/>

## References
 - https://www.w3schools.com/sql


## Continue to [Database Part 4](README4.md)

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
