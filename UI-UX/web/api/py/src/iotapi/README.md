# (Part 1) Web API (Node)

## Table of Contents
[Overview](#overview)<br>
[Installing Pip](#installpip3)<br>
[Installing Virtual Environment](#installvenv)<br>
[Hello Python Example](#hello-python-example)<br>
[Shortcuts Cheatsheet](#shortcuts-cheatsheet)<br>


<div id='overview'/>

## Overview
In this tutorial we will begin creating our API that talks to our database. Before we can do this, we need to install `Node` and the required dependencies. The required dependencies are also called `modules`. Follow the steps below to begin preparing your installation of the Node stack. 

As always, the code used in this tutorial can be used to create other programs by simply modifying the syntax.

<b>Note</b>: Throughout this tutorial, it's highly recommended having at least two terminals open. One should give you access to your Raspberry Pi The other should be open and connected on your host computer. In a later part of this tutorial, you will begin to work with multiple screens on the Raspberry Pi terminal.


<div id='installpip3'/>

## Installing pip3
First you will need to install and enable `pip3` on your `Raspberry Pi`. Some versions of `Raspberry Pi` come pre-installed with `pip3`, but if not, this will get you up and running.


```console
sudo apt install python3-pip
```
<div id='installvenv'/>

## Installing Virtual Environment
First you will need to install and enable Virtual Environment on your Raspberry Pi. Virtual Environment allows you to manage multiple versions of Python on a single machine. This not only keeps code portable but ensures there aren't conflicts with other projects.

We will use the Package Installer for `Python` knowns as `pip`.

```console
sudo pip3 install virtualenv
```

<div id='hello-python-example'/>

## Hello Python Example
First we need to determine the path of the `Python` version we would like to run. This example uses `Python 3.7` so we will issue the `which` command below to determine:
```console
which python 3.7
```
The terminal results reveals `Python 3.7` is installed under `/usr/bin/python`. Great, moving right along.


Now initialize a new virutal envrionment and configure with `Python 3.7`.

```console
virtualenv -p python3.7 env
```

In order to e our new envionment we need to activate it. Issue the command below to activate the new environment.


```console
. env/bin/activate
```

You will see a virutal console indicating the `Environment` is now active. Your `Raspberry Pi` terminal should now have a prefix at the beginning that looks similar to the following:
```console
(env) pi@raspberrypi:
```

Great, now we can create a new script and test out our new setup.

Create a new file named `hello.py` by issuin the touch command below.

```console
touch hello.py
```

Now, on your `Raspberry Pi`, fire up nano and type or paste the code below.

```python
if __name__ == "__main__":
    print("Hello Python!")
```
Save the file, if using nano, by issuing the keyboard shortcut `CTRL+O` or `CTRL+S` , and then exit by issuing the keyboard shortcut `CTRL+X`.
If using Vim, you can save and exit the file by using `:wq`.

Now we can test our new `hello.py` script by issuing the following command from our `Raspberry Pi` terminal.

```console
python hello.py
```
You should see the following results:

```console
Hello Python!
```

You can now begin installing additional modules using `pip` or run your code.

Next we need to be able to deactivate the `Environment`. This is done by typing `deactivate` on the `Raspberry Pi` terminal. Give it a try, once deactivated you are returned to the default `Raspberry Pi` terminal and the `(env)` prefix being removed.

We've covered quite a bit here but you should now be able to setup a new `Python` installation using `Virtual Environment`.


### Prep

[Raspberry Pi Prep](/prep/README.md)<br>

### Linux - WSl setup

[Operating System (Linux)](../../../../../linux/README.md)<br>

### Database

[(Part 1) Database (MySQL)](db/README.md)<br>
[(Part 2)  Tables, Querys, and SQL](db/README2.md)<br>
[(Part 3)  Working with Relations](db/README3.md)<br>
[(Part 4) Putting it all together](db/README4.md)<br>
[(Extras) Setting MySQL Timezone on Raspberry Pi](db/MYSQLTZ.md)<br>

### Web

[Getting Started with Python](web/api/py/src/README.md)<br>
[TODO: (Part 1) Web API (Python)](web/api/py/src/iotapi/README.md)<br>
[TODO: (Part 2) Web API (Python)](web/api/py/src/iotapi/README2.md)<br>
[TODO: (Part 3) Web API (Python)](web/api/py/src/iotapi/README3.md)]<br>
[TODO: (Part 4) Web API (Python)](web/api/py/src/iotapi/README4.md)]<br>
[(Part X) Security](web/READMEX.md)<br>

### UX

[Angular (Web Framework)](web/ux/README.md)<br>

### API

[Installing MySQL Connector for Python](web/api/py/README.md)

### Cryptography

[Crypto](web/CRYPTO.md)<br>


</details>
