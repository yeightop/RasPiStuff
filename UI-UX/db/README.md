# (Part 1) Database (MySQL).

## Table of Contents

[Overview](#overview)<br>
[Preparing the Raspberry Pi](#preparing-the-raspberry-pi)<br>
[Install and Configure MySQL](#install-and-configure-mysql)<br>
[Secure the mysql database](#secure-the-mysql-database)<br>
[Shortcuts Cheatsheet](#shortcuts-commands-and-cheatsheet)<br>
[References](#references)<br>

<div id='overview'/>

## Overview
In this tutorial we will setup MySQL on the Raspberry Pi.  MySQL hosts the database used by our web application and accompanying APIs. In this example I am using the Raspberry Pi 3 Model B v1.2.

<div id='preparingtheraspberrypi'/>

## Preparing the Raspberry Pi
Before we begin, we want to ensure the Raspberry Pi is up to date to avoid any complications. You always want to make sure your Raspberry Pi has all of their packages at the latest version.
Login to the Raspberry Pi by issuing the ssh command below to establish a new connection.  Make sure to replace `your-raspberry-ip-ip-address` with your Raspberry Pi's IP address.

```console
ssh pi@your-raspberry-ip-ip-address
```
The Raspberry Pi will then ask for the password. Enter the Raspberry Pi's default password: `raspberry`.

Now that we are connected, issue the commands below to begin the update and upgrade process. The upgrade process can take some time so be patient.

```console
sudo apt update
sudo apt upgrade
```

<div id='installandconfiguremysql'/>

## Install and Configure MySQL
Now that the Raspberry Pi is all up to date, you can install MySQL. On your Raspberry Pi terminal, install MySQL server by issuing the following command from your terminal.

```console
sudo apt install mariadb-server
```

## Secure the mysql database
You will then need to secure the database. The following command will start the securing process. 

```console
sudo mysql_secure_installation
```

For this example we will use `Password1` as the `root` level password. Answering `Y` to all of the prompts ensures the most secure installation. Normally the password would be much stronger than suggested, but for the tutorial and simplicity's sake, just use `Password1`.

<b>Note</b>: make sure you install both of these packages before you move on to the next section. Failure to do so will lead to errors of creating the database as well as leaving the database unsecured access. The error message will read as so:
<br>
```mysql
ERROR 1698 (28000): access denied for user 'localname'@'localhost'
```


## Login to the database

Login to MySQL using root user. You will be prompted with the password we created above. For this example we created user's password as  `Password1`. As mentioned above, this password is fragile and suspect to brute-force attacks. When you create a database for production systems, you will want a stronger password.

```console
sudo mysql -u root -p
```
You'll have a different text appearance that details you are inside MySQL. You first need to create a database to hold the information.

## Create exampledb

This command creates our example database. Type the command into your terminal and hit `Enter`. For our first test case, we are going to create a new database called `exampledb`.

```mysql
CREATE DATABASE exampledb;
```
This will result in a query taking place. You should see a similar message below.

```mysql
Query OK, 1 row affected
```
If you want to see if your database has been created, run the command `SHOW DATABASES` to list all the available tables you have created thus far.

### Create a user

Now that we have created a database, we now need a user. For this example, the user will be called `sictc` and the password will be `Pencil1`.

On your terminal, type in the command to create a new user and the associated password on the same line. Reminder that the literal string `localhost` should be typed in, not the ip address corresponding with your Raspberry Pi. 

```mysql
CREATE USER 'sictc'@'localhost' IDENTIFIED BY 'Pencil1';
```

<b>Note</b>: Something to keep in mind with MySQL commands. All commands end with the `;`. For a new user, it's easy to forget to hit the semi-colon key and just press enter on instinct. If you do by chance hit enter before finishing the command, you will have a little symbol appear at the bottom like so with an unfinished command:

```mysql
MariaDB [none]> CREATE USER test01
    ->
```

The database is just waiting on you to finish the command. Simply press the `;` key and the command will either succeeded or fail.

### Granting proper access to our new user

Once you have created a new user and their password, that means you have everything you need to log in, right? Not quite. You may have created a new user and password, but you also must allow them to interact with the database. Right now the user is waiting in limbo, void of any actions they can take. To correct this, we want to grant all privileges to our new user. Run the command below for the new user your created.

```mysql
GRANT ALL PRIVILEGES ON exampledb.* TO 'sictc'@'localhost';
```
### Flush the privilege table
This command will ensure the newly created user can access the database. 

```mysql
FLUSH PRIVILEGES;
```

### Try out the new user
Now it's time to test out our creation. Let's see if we can login with our new user. First we will need to exit the MySQL console. The console can be exited by issuing the command `quit;` or the keyboard shortcut  `CTRL+D`.

Now attempt to login using the new user `sictc`. Reminder the password is `Pencil1`.

```console
sudo mysql -u sictc -p
```

### Verify MySQL User
We can verify that we are logged in as the sictc user by issuing the following command.

```mysql
SELECT CURRENT_USER();
```
Query Results:
```mysql
+-----------------+
| current_user()  |
+-----------------+
| sictc@localhost |
+-----------------+
1 row in set (0.001 sec)
```

<div id='cheatsheet'/>

## Shortcuts Commands and Cheatsheet

| Commands | Definition |
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
|`sudo mysql -u sictc -p`| Login to MySQL console. |
|`quit;` or `CTRL+D` | Command to exit MySQL console. |
|`exampledb`| MySQL example database. |
|`Password1`| MySQL root password. |
|`sictc`| MySQL exampledb user. |
|`Pencil`| MySQL exampledb password. |


### References
 - https://pimylifeup.com/raspberry-pi-mysql/
 - https://www.raspberrypi.org/documentation/remote-access/ssh/
 - https://raspberrytips.com/mac-address-on-raspberry-pi/
 - https://en.wikipedia.org/wiki/MAC_address


## Continue to [Database Part 2](README2.md)

<details><summary>Tutorial List</summary>

### Prep

[Raspberry Pi Prep](prep/README.md)<br>
[(Bonus) Flashing OS image to SD card: Linux Version](prep/README2.md)<br>

---

### Linux - WSl setup

[Operating System (Linux)](/linux/README.md)<br>
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

