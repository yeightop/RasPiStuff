# (Extras) Setting MySQL Timezone on Raspberry Pi.

## Table of Contents
[Overview](#overview)<br>
[Setting MySQL Timezone](#setting-mysql-timezone)<br>
[Get Raspberry Pi date and time](#get-raspberry-pi-date-and-time)<br>
[Query MySQL Timezone](#query-mysql-timezone)<br>
[Edit MySQL Configuration File](#edit-mysql-configuration-file)<br>
[Restart MySQL](#restart-mysql)<br>
[References](#references)<br>

<div id='overview'/>

## Overview

This tutorial guides you through the process of setting the timezone for MySQL. Setting the timezone to Universal Time Coordinated (UTC) is good practice. This allows the clients connecting to your MySQL server to use their local timezone when viewing time sensitive information. This also eliminates calculating timezone offsets in your application.  

Remember: Let the operating system do the work, work smart not hard.

<div id='settingmysqltimezone'/>

## Setting MySQL Timezone
From the Raspberry Pi terminal, issue the `date` command to display the current date and time on the Raspberry Pi. By default this is the system datetime that MySQL uses to timestamp information in `DATETIME` columns.

### Get Raspberry Pi date and time

Type the following command in your terminal to request the local date and time from the Raspberry Pi.

```console
date
```
Example Terminal Result:

```console
Fri 25 Sep 22:19:09 BST 2020
```

### Query MySQL Timezone

So we know that timezone we get when we just check the date on our Raspberry Pi. But what happens when we check on the mysql database? Try it out with the command below. Be sure to include the quotes.

```console
sudo mysql -e "SELECT @@global.time_zone;"
```
You should see the following result:

```console
+--------------------+
| @@global.time_zone |
+--------------------+
| SYSTEM             |
+--------------------+
```

When we enter the command, we notice the time zone is whatever our system is ccurrently set on. From our first command above, the BST stands for British Summer Time.

### Edit MySQL Configuration File
In order to set the GMT timezone, we need to edit the local configuration file. We can do this by navigating and edit the file in one loaded command below.

```console
sudo nano /etc/mysql/my.cnf
``` 
<b>Note</b>: I personally use Vim but you can use nano or another editor of choice. 

Load your favorite editor from the terminal and type the following configuration information at the bottom of the file `my.cnf`. 

##### my.cnf
```console
[mysqld]
default-time-zone = "+00:00"
```
Save your file afterwords and then exit the file.

### Restart MySQL

Go ahead and restart your mysql server. This will determine if we changed the results correctly.

```console
sudo service mysql restart
```

We are now going to query the `@@global.time_zone` setting by issuing the command below.

```console
sudo mysql -e "SELECT @@global.time_zone;"
```

You should see the following result:

```console
+--------------------+
| @@global.time_zone |
+--------------------+
| +00:00             |
+--------------------+
```

Now that we have the correct timezone set, let's query MySQL for the ```DATETIME```.

```console
sudo mysql -e "SELECT NOW();"
```

You should see something similar to the result below:

```console
+---------------------+
| NOW()               |
+---------------------+
| 2020-11-16 05:11:12 |
+---------------------+
```

## References
 - https://phoenixnap.com/kb/change-mysql-time-zone

## Continue to [Getting Started with Node](web/README.md)

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
