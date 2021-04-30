# Raspberry Pi Prep

## Table of Contents

[Overview](#overview)<br>
[What is a Raspberry Pi?](#what-is-a-raspberry-pi)<br>
[Requirements](#requirements)<br>
[Inspection](#inspection)<br>
[Setup Options](#setup)<br>
[Flashing Pi OS](#flashing-pi-os)<br>

<div id='overview'>

## Overview

In this tutorial, we are going to learn how to construct a raspberry pi for testing. Being able to put together and navigate through a raspberry pi will set you on the path for building a new computer. This process take very little time but if you are a new user we will go over some of the contents.

<div id='what-is-a-raspberry-pi'>

## What is a Raspberry Pi?

A raspberry pi is a small, fully functional computer for the cost of about $40. This little device is perfect for a beginner to learn the intricacies of a computer without having to spend an exorbitant amount of money. For many of our tutorials, you will be able to spend so much time figuring out a new system that it will put you ahead of the curve if you go down the computer science career path. 

<div id='requirements'>

## Requirements

- Raspberry pi 3, model B (recommended)
- Raspberry pi power supply (input 100-240V AC, output 5V - 2.5A)
- Raspberry casing (optional)

<div id='inspection'>

## Inspection

The first thing you will want to do is take out the motherboard for inspection. The board is tiny and fragile so handle it with care when removing it from the box. The motherboard should be encased in a protective baggie seal. This was to prevent any outside moisture or rough particles from seeping in and plastering on the hardware. 

In any case, remove the motherboard and inspect the board yourself. Check to make sure the board isn't warped, pieces don't look like they are falling off, and for any destructable damage.

Now grab the black casing box that will create the protective shell around the raspberry pi. When you open the box you should find four items inside: a black case, heatsinks for the cpu's, a screwdriver and a package of four screws inside the black case.

<div id='setup'>

## Setup

Now we can go ahead and construct the pi.

Before we put the pi inside the casing, I recommend you placing the heat sinks on top of the corresponding cpu's to the matching heat-sinks. Although the pi does not consume a lot of power, the cpu's can still heat up with multiple programs executing all at once. This leads to the pi being unresponsive. The unresponsive pi could crash due to heat overload.

Remove the big and small heat-sinks from their packaging. Then remove the blue adhesive on the bottom of each one, exposing the sticky layer. Stick them firmly on the cpu's. Now you can move on to putting the pi into the protective case.

Open up the black casing and remove the screw packaging inside as well as the top plate and the sd-card lip with small holes that allows air traversal. Now set the pi motherboard inside black casing, making sure each port opening aligns with the correct spot. 

<b>Hint</b>: A simple way to lay the motherboard in correctly is to line up the motherboard up with the 3.5mm headphone jack. Taken at an angle with the headphone jack as the target, the pi should fall into place with little resistance.

You should now take the sd-card lip and place it on the opening end of the motherboard. This will be opposite of where the usb ports and ethernet connection is located. The lip should be facing outward for the user. Look for the groove, intended for the sd card opening, and make sure that is facing outward. It should just drop into the crease of the casing.

Put the top part of the casing on the pi and clasp the pi together. You may hear a small click when you do this. Take out the screws from the packaging and tighten the motherboard to the case. Don't put the screws in too tight as it could damage the motherboard. Make sure its nice and snug. 

<b>Hint</b>: I would advise putting the screws in going opposite of each other, such as making an x pattern. This helps spread the weight and keep any displacement minimal. The screwdriver that comes with the packaging tends to be difficult when screwing in. 

Congratulations! You now have a mini computer that has been put together.

## Flashing Pi OS

Before continuing below, you will also need to know how to flash a pi operating system onto a flash card. For the purposes of this tutorial, I'd recommend looking in a separate tab at [raspberry pi imager section](https://www.raspberrypi.org/documentation/installation/installing-images/). 

- On the link above, go to their `Downloads` section ane find the `.iso` file you would like to download.
- Download the Raspberry Pi Imager for your selected OS on your local computer. 
- Have an sd card and sd card reader/writer inserted into your computer.
- Follow the steps for the Raspberry Pi Imager.

There is also a more [advanced version](../prep/README2.md) of cloning a pi image onto a drive with minimal tools if you are using Linux and would like a challenge. However for beginners, I would advise using the tools at the top.


## [Continue to Operating System Linux Setup](linux/README.md)

<details><summary>Tutorial List</summary>

### Prep

[Raspberry Pi Prep](../README.md)<br>
[(Bonus) Flashing OS image to SD card: Linux Version](../prep/README2.md)<br>

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


