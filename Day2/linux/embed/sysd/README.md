# Services (systemd) 


## Table of Contents

[Overview](#overview)<br>
[Service Descriptor](#servicedescriptor)<br>
[Managing Service](#management)<br>
[Cheatsheet](#cheatsheet)<br>
[References](#references)<br>

<div id='overview'/>

## Overview
There are times when you will want code to automatically start when the `Raspberry Pi` boots up. For example, you'll want the `api` service to start and also any `ux` hosting services to launch so that you can host your application. We do this with a simple tool called `systemd`

<div id='servicedescriptor'/>

## Service Descriptor

Login to your `Raspberry Pi` and type or paste the service descriptor below into a new filed named `toggle.led.service`.

```console
[Unit]
Description=Toggle Led Service
After=network.target

[Service]
ExecStart=/home/pi/sictcweb/linux/embed/toggle.led.sh
WorkingDirectory=/home/pi/sictcweb/linux/embed/
StandardOutput=inherit
StandardError=inherit
Restart=always
User=pi

[Install]
WantedBy=multi-user.target
```

<div id='management'/>

## Managing Service
Great, now we need to copy this file into the `/etc/systemd/system` as `root` which means we will use the `sudo` command. Login to the `Raspberry Pi` and issue the command below.

```console
sudo cp toggle.led.service /etc/systemd/system/toggle.led.service
```

Now we can start the service.

```console
sudo systemctl start toggle.led.service
```

To stop the service simply issue the command below.

```console
sudo systemctl stop toggle.led.service
```

In order to automatically start the service on boot we need to enable it.

```console
sudo systemctl enable toggle.led.service
```


In order to stop the service from automatically starting on boot we need to disable it.

```console
sudo systemctl disable toggle.led.service
```

<div id='cheatsheet'/>

## Shortcuts Commands and Cheatsheet

| Commands | Definition |
|---|---|
|`systemctl start service-name`| Start service.|
|`systemctl stop service-name`| Stop service.|
|`systemctl restart service-name`| Restart service.|
|`systemctl enable service-name`| Enable service.|
|`systemctl disable service-name`| Disable service.|
|`systemctl status service-name`| Query service status.|
|`systemctl daemon-reload service-name`| Reload systemd manager configuration.|

<div id='references'/>

## References: 
 - https://www.raspberrypi.org/documentation/linux/usage/systemd.md
 - https://wiki.archlinux.org/index.php/systemd

<details><summary>Tutorial List</summary>
<br>
 
### Prep
 
[Raspberry Pi Prep](/prep/README.md)<br>
[(Bonus) Flashing OS image to SD card: Linux Version](prep/README2.md)<br>
 
### Linux - WSl setup
 
[Operating System (Linux)](linux/README.md)<br>
[Toggle Raspberry Pi led light](linux/embed/README.md)<br>
[Autoboot Services](../sysd/README.md)<br>

 
 
### Database
 
[(Part 1) Database (MySQL)](db/README.md)<br>
[(Part 2)  Tables, Querys, and SQL](db/README2.md)<br>
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
 
[Angular (Web Framework)](web/ux/README.md)<br>
[Angular (Web Framework) (Part 1)](web/ux/README2.md)<br>
[Angular (Web Framework) (Part 2)](web/ux/README3.md)<br>
[Angular (Web Framework) (Part 3)](web/ux/README4.md)<br>
 
### API
 
[Installing MySQL Connector for Python](web/api/py/README.md)
 
### Cryptography
 
[Crypto](web/CRYPTO.md)<br>
 
</details>

