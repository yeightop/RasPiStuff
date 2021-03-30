# Operating System 

## Table of Contents

[Overview](#overview)<br>
[WSL](#windows-windows-subsystem-for-linux)<br>
[Enabling SSH on Raspberry Pi (headless)](#enable-ssh-on-raspberry-pi-headless)<br>
[Finding Raspberry Pi on the network](#finding-raspberry-pi-on-the-network)<br>
[List Raspberry Pi(s) on your local network](#list-raspberry-pis-on-your-local-network)<br>
[Logging into the Raspberry Pi](#logging-into-the-raspberry-pi)<br>
[Package Managers](#package-managers)<br>
[Command-line Text Editors](#command-line-text-editors)<br>
[Introduction to Secure Copy (SCP)](#introduction-to-secure-copy-scp)<br>
[MAC Address Spoofing](#mac-address-spoofing)<br>
[Shortcuts Cheatsheet](#shortcuts-and-commands-cheatsheet)<br>

<div id='overview'/>

## Overview
In this tutorial we configure the Raspberry Pi and prepare it for installation.  MySQL host the database used by our web application and accompanying APIs. In this example I am using the Raspberry Pi 3 Model B v1.2.

<div id='wsl'/>

### Windows (Windows Subsystem for Linux)
Windows users must install Windows Subsystem for Linux (WSL) before proceeding. Click on the dropdown below to enable WSL 2 on Windows 10.
<br><br>

<details><summary>Click here for WSL Setup</summary>

## Verifying Correct Version

Before getting started, you will need to check the version of Windows 10 operating on
your client. To do that, press the windows command and r button. In the search bar that appears, type `winver`.

You need to be on the following
- <b>x64 systems</b>: Version 1903 or higher with Build 18362 or higher.
- <b>ARM64</b>: Version 2004 or higher with Build 19041 or higher.

You can also update your windows with the [Windows Update Assistant](https://www.microsoft.com/software-download/windows10)
As well as [Update latest Windows version](ms-settings:windowsupdate).

If you are unsure what your system is, you can do this by opening the command prompt. Type into the windows search bar `cmd `to open the command prompt. When the terminal appears, type into the terminal `systeminfo | find "System Type"` and your system type will appear on screen after execution.

## Starting up

This next section will get you to enable the correct features and grab the Linux kernel update package. For updating and executions, we are going to use the Windows Powershell. Powershell is a CLI for Windows used for task automation. 

- In you Windows searchbox, type in `Powershell`. Right click the application that appears and select `Run as Administrator`. 
- Click yes and a terminal window should pop up.
- Copy into the Powershell terminal the following command:<br> 
`dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart`<br>

The `dism` command is short for Deployment Image Servicing and Management, an application for the command line in Windows Powershell. This prepares Windows Images and is commonly used for setting up a virtual hard disk, which is what we are doing here for WSL. The command is enabling the WSL feature for your client for all users on your machine without executing the restart option.

- Now add the next command into Powershell:<br> `dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart`<br>

This allows the virtual machine platform to execute on Windows. This is a computer system virtually built in your client. You can think of it like using VirtualBox.

Once finished go ahead and download the [Linux kernel update package](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi) but don't run the program yet. If on a ARM64 system, get the [ARM64 package](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_arm64.msi)
    
At this point you will need to go ahead and restart your device to apply all the features

## Version and Launch

Once you have restarted your device, you can go ahead and apply the Linux package update you downloaded earlier. This will run through the setup wizard to get Windows Subsystem for Linux installed. After this, open up Powershell again, right-clicking to select for `run as administrator`. Set the default for WSL with the following command: `wsl --set-default-version 2`.

If you have followed the tutorial correctly, you should only have a line appear `For information please visit https://aka.ms/wsl2kernel`.

Now grab the [Debian GNU/Linux](https://www.microsoft.com/store/apps/9MSVKQC78PK6) distribution from the link. It will take you to the Microsoft Store section and install on your computer. Once it gets installed, go ahead and click Launch. This will then take you into the process of logging in to the pi for the first time [which is explained down below](#logging-into-the-raspberry-pi).

## FAQ

If you get this error by chance:

`Error: 0xc03a001a The requested operation could not be completed due to a virtual disk system limitation.  Virtual hard disk files must be uncompressed and unencrypted and must not be sparse.`

It's because the location of where your virtual hard disk exists hasn't been uncompressed or doesn't have the option unchecked for this.To fix the problem, you need to find the folder the distro exists at. It will be similar to the following file path:
 
`c:\Users\YourUsername\AppData\Local\TheDebianProject.DebianGNULinux...`

<b>Note</b>: If you don't see the folder `AppData`, its probably set to hidden. To fix the hidden issue:

- Go to `YourUsername` folder. 
- Go to the View panel at the top of your screen. 
- Locate the the `Hidden items` checkbox and check it. The `AppData` folder should then appear.

Once inside `TheDebianProject.DebianGNULinux...` folder, locate the folder `LocalState` and right click on the folder. Go into `Properties`.

- In `General` click on `Advance`.
- Deselect both checkboxes under `Compress or Encrypt attributes`.
- Click `Apply` then `OK`.
 
Now you should be good 

## References

[WSL Setup](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/what-is-dism#:~:text=Deployment%20Image%20Servicing%20and%20Management,vhd%20or%20.
https://teckangaroo.com/enable-windows-10-virtual-machine-platform/

</details>
<br><br>

<div id='enablessh'/>

## Enable SSH on Raspberry Pi (headless)

SSH can be enabled by creating an empty file named `ssh` on the boot partition of the SD card from another computer. For this section, I am using a Mac and the volumes are listed under `/Volumes`. 

Issuing the `touch` command places an empty file ssh file on the boot partition of the Raspberry Pi.

`touch /Volumes/boot/ssh`

<details><summary>Click here if you are using a Windows machine to provision</summary>

### If on a Windows machine

If you are on a a Windows client, when you add the `ssh` file, you will need to make sure the extension is cleared out. Windows will always add an extension be default to any file you add. The most common extension added will either be a `.txt` or a `.docx`.

- Go into your `boot` section of your pi OS.
- Add the `ssh` file inside.
- Clear out the extension Windows will add.

</details>

<details><summary>Click here if you plan on accessing your Raspberry Pi via WiFi</summary>

Just like how you added the `ssh` file to access the Raspberry Pi without a monitor, you will also need to add another file to the boot startup called `wpa_supplicant.conf`. This will connect you to your WiFi network. Create the new file in the `boot` partition and add the following into the file:

```
country=US
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
scan_ssid=1
ssid="your_wifi_ssid"
psk="your_wifi_password"
}
```

Make sure to replace the `ssid` and the `psk` with the name of your network connection and password respectively. Also remember to include the quotations. 

</details>

<div id='findingraspberry'/>

## Finding Raspberry Pi on the network

Now that we have the Raspberry Pi Operating System installed its time to boot up the pi. To log into the raspberry pi, you will need to have it connected via ethernet to your network if you are not connecting to your pi over WiFi.


Once the Pi has booted up, we will need to find the device on the network. We can find the address on the network by doing a couple of commands, starting with `arp`.


The `arp` command uses the <b>Address Resolution Protocol (ARP)</b> to enumerate all attached network devices on a particular network segment. The `ARP` protocol gathers all `Network Interface Controllers (NIC)`s on a network segment. The controllers on the network will respond with `MAC` and `IP` address among other things.

Every `NIC` is assigned a unique identifier called a `Media Access Control (MAC) Address`. This provides a network address for use within a network segment.  

MAC addresses are assigned by manufacturers and you can consider "burned-in addresses" tattooed on the device's firmware. The Raspberry Pi Foundation designates `b8:27:eb` as the first three tuples to identify a Raspberry Pi MAC address. The next section outlines the details of searching for the Raspberry Pi on your network and printing out both the `MAC` and `IP` address. This will allow us to connect to the Pi via SSH.


MAC addresses are assigned by manufacturers and you can consider "burned-in addresses" tattooed on the device's firmware. The Raspberry Pi Foundation designates `b8:27:eb` as the first three octets "tuples" to identify a Raspberry Pi MAC address. The next section outlines the details of searching for the Raspberry Pi on your network and printing out both the `MAC` and `IP` address. This will allow us to connect to the Pi via SSH.

### List Raspberry Pi(s) on your local network
Now that we know how to find the pi on our network, we need to connect to the device for installing MySQL. You can find all devices connected to your network by issuing the ```arp -a``` from the terminal with a couple of other piped-in commands.

 The command below will filter out only devices connected to the network with the first two octets `b8:27:eb` by using the `grep` command. From your terminal issue the following command (may need to explain more of this in detail). 

```console
arp -a | grep b8:27:eb | awk -v OFS='\t' '{print $4, $2}'
```

<b>Note</b>: Be patient as the resolution of the device can take a moment.

You should see something like the following. 

```console
b8:27:eb:44:fe:ff	(169.254.178.239)
```
As you can see our command discovered and displayed the MAC and IP address of our Raspberry Pi. We will use this IP address to connect to our Raspberry Pi via `Secure Shell` also known as `SSH`.

<details><summary><b>If you receive an the following message: `bash: arp: command not found`</b>:</summary>This means the package containing `arp` it's not available, run this command to add `arp`:

```console
sudo apt install net-tools
```

</details>

<div id='loggingintoraspberrypi'/>

### Logging into the Raspberry Pi.

Once you discover the mac and IP address of your Raspberry Pi you are ready to connect to it. Issue the ssh command below to establish a new connection. Remember to replace the `your-raspberrypi-ip-address` with your actualy Raspberry Pi address.

```console
ssh pi@your-raspberrypi-ip-address
```

When prompted enter the Raspberry Pi's default password `raspberry`.

<div id='packagemanagers'/>

## Package Managers
The Raspberry Pi comes pre installed with a package manager called `APT`, short for `Advanced Packaging Tool`.  

Package managers maintain software packages downloaded from a repository. You can think of `APT` as like your personal secretary, keeping an eye on all of your recent downloaded applications.

Software can be installed, upgraded and removed with a package manager. Besides `APT`, common package managers for Linux are also `DPKG` and `YUM`.  

Other operating systems like Mac include `Home Brew` and `MacPorts` as the popular package managers as well as others. 

<b>Note</b>: For the remainder of this tutorial we will be using `APT`.

Before we proceed we want to make sure the Raspberry Pi is up to date with the latest updates.

```console
sudo apt update 
sudo apt upgrade
```

<div id='commandline'/>

## Command-line Text Editors

`Nano` is just one of many editors available to you on Linux that would be just fine for the tutorial. A personal recommendation is `Vim`, which is a bit difficult to learn at first due to its un-intuitiveness, but powerful once you get used to it. However, for the purpose of these tutorials, you can just use `nano` for now. 

<b>Note:</b> If you would like to learn how to use Vim's general navigation and basic searching, you can [follow this tutorial](https://cpht.gitlab.io/docs/wiki/docs/docVi/)

The majority of this tutorial involves command line access to the Raspberry Pi to get applications setup. The source code provided in the simpler examples can be managed using a simple editor as described above. Larger code blocks in subsequent tutorials require you to upload files to the Raspberry Pi from your local machine. Using this workflow will accelerate the development process.


<div id='scp'/>

## Introduction to Secure Copy (SCP)

Editing files on the Raspberry Pi using `Vim` or `Nano` can be inefficient. Your raspberry pi can only power so much when you have it in operation. For example, if you have it serving a website and the database is active, the processing power decreases and causes overheating.

So for starting out on a couple of lessons, we will move our source editing to our local machine, also called the host machine,  and copy files to the Raspberry Pi for testing. Using this technique will also deliver the chance of seeing how a machine can communicate with another when transferring data. 

To automate the transfer of files in this tutorial we will be using `SCP`, which is short for Secure Copy Protocol.  The `scp` command is used to securely copy files between a local client and remote host or between two remote hosts. `SCP` uses `ssh` or Secure Shell Protocol to transfer files. We can demonstate this on your machine by moving over a file you will create on your host machine.

- On one terminal, make sure you are logged into your machine and at the home directory. If you are not logged in, use the command `sudo ssh pi@your-raspberry-pi-ip-address` to get logged in. Remember to replace `your-raspberry-pi-ip-address` with you actual raspberry pi ip address. 
- Run the command `pwd` to see if you are at the home directoy, which should be called `/home/pi`.

```console
pi@raspberrypi:~ $ pwd
/home/pi
```
- On your terminal connected to your host machine, not the raspberry pi, create a new file using the `touch` command. For example, I created a new file `touch droids.dat` on my host machine. I also created another called `hello.txt` just to be sure.
- Run the command `ls` to make sure the file is listed. 

```console
Tonys-iMac:~ ironman$ touch droids.dat hello.txt
Tonys-iMac:~ ironman$ ls
Applications		Library			VirtualBox VMs
Desktop			Movies			corporate-website	sictcweb
Documents		Music			droids.dat		testsite
Downloads		Pictures		hello.txt		unison-web
ILP			Public			homebrew		zpltemplatesetup
Tonys-iMac:~ ironman$ 
```
- On your host temrinal, not your raspberry pi terminal, copy over one or all the files created in the step above using `scp`. Use `scp filename pi@your-raspberry-pi-ip-address:`. Remember to replace `filename` with the one you named and `your-raspberry-pi-ip-address:` With your correct raspberry pi ip adddress.

<b>Note</b>: Also make sure to add the `:` on the end of the command. Otherwise, the file(s) will never copy over and you will not see the results. This will just result in an empty command

Below is an example of transferring a single file to the Raspberry Pi. Be sure to replace `raspberrypi-ip` with your Raspberry Pi's IP address.

```console
Tonys-iMac:~ ironman$ scp droids.dat hello.txt pi@raspberry-pi-ip-address:
pi@raspberry-pi-ip-address's password: 
droids.dat                                                                 100%    0     0.0KB/s   00:00    
hello.txt                                                                  100%    0     0.0KB/s   00:00    
Tonys-iMac:~ ironman$ 
```

The command copies the `droids.dat` and `hello.txt` file you created to the Raspberry Pi. We hit the Raspberry Pi, inidcated by the `pi@your-raspberry-pi-ip-address` and drop it in the home directory is indicated by the symbol `:`. Then, `scp` will prompt you for the Raspberry Pi's password before beginning the transfer. 

On the other terminal you have open and connected to your Raspberry Pi, you can see the results by running `ls` on your Raspberry Pi terminal.

```console
pi@raspberrypi:~ $ ls
Bookshelf  Desktop  Documents  Downloads  droids.dat  hello.txt  Music  Pictures  Public  Templates  Videos
pi@raspberrypi:~ $ 
```

<div id='macspoofing'/>

## MAC Address Spoofing
There are times when you will want to make it more convenient to find your Raspberry Pi on the network. This tutorial teaches you how to change the last three octets of the MAC address on the Raspberry Pi.

If you are not already, log into your Raspberry Pi check the contents of the `/boot/cmdline.txt` file by issuing the following command. 

```console
cat /boot/cmdline.txt
```
You should see something like this:

```console
console=serial0,115200 console=tty1 root=PARTUUID=4d59a030-02 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait quiet splash plymouth.ignore-serial-consoles
```

The `cat` command displays the contents of the file. Fire up your favorite text editor and add the following lines to the end of the file if not already present. Be sure to put a space between the last entry and the new `MAC` address entry. 

`smsc95xx.macaddr=b8:27:eb:xx:xx:xx`. Be sure to replace xx:xx:xx` with your own octets. 

<b>Note</b>: `octets` are hexadecimal format so the characters should in the range from `0` to `9` and `a` through `f`. You will need issue the `nano` or  `vim` command to edit the file using `sudo`. 

Once you complete the process issue the reboot command to restart your Raspberry Pi, `sudo reboot`.

The reboot command terminates the terminal session and places you back at the local command line. Give the raspberry pi some time to boot.

Once you see your raspberry pi online, repeat the `arp` command above to discover your raspberry pi on the network. If successful, you will notice the raspberry pi listed with a newly assigned `MAC` address.

<div id='cheatsheet'/>

## Shortcuts and Commands Cheatsheet

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
|`arp`| Command displaying the IPv4 network neighbor cache.  |
|`grep`| Command that search for a pattern matching an expression. |
|`awk`| Command that search a file or text containing a pattern. |
|`cat`| Display contents of a file. |


### References
 - https://pimylifeup.com/raspberry-pi-mac-address-spoofing/
 - https://www.raspberrypi.org/documentation/remote-access/ssh/
 - https://raspberrytips.com/mac-address-on-raspberry-pi/
 - https://en.wikipedia.org/wiki/MAC_address
 - https://en.wikipedia.org/wiki/GNU_nano
 - https://en.wikipedia.org/wiki/Vim_(text_editor)

## Continue to [Database: Part 1](../db/README.md)

<details><summary>Tutorial List</summary>

### Prep

[Raspberry Pi Prep](../prep/README.md)<br>
[(Bonus) Flashing OS image to SD card: Linux Version](../prep/README2.md)<br>

---

### Linux - WSl setup

[Operating System (Linux)](../linux/README.md)<br>
[Toggle Raspberry Pi led light](../linux/embed/README.md)<br>
[Autoboot Services](../linux/embed/sysd/README.md)<br>

---

### Database

[(Part 1) Database (MySQL)](../db/README.md)<br>
[(Part 2) Tables, Queries, and SQL](../db/README2.md)<br>
[(Part 3) Working with Relations](../db/README3.md)<br>
[(Part 4) Putting it all together](../db/README4.md)<br>
[(Extras) Setting MySQL Timezone on Raspberry Pi](../db/MYSQLTZ.md)<br>

---

### Web

[Getting Started with Node](../web/README.md)<br>
[(Part 1) Web API (Node)](../web/api/js/src/iotapi/README.md)<br>
[(Part 2) Web API (Node)](../web/api/js/src/iotapi/README2.md)<br>
[(Part 3) Web API (Node)](../web/api/js/src/iotapi/README3.md)<br>
[(Part 4) Web API (Node)](../web/api/js/src/iotapi/README4.md)<br>
[(Part 5) Web API (Node)](../web/api/js/src/iotapi/README5.md)<br>

---

### UX

[Angular (Web Framework Setup)](../web/ux/README.md)<br>
[Angular (Web Framework) (Part 1)](../web/ux/README2.md)<br>
[Angular (Web Framework) (Part 2)](../web/ux/README3.md)<br>
[Angular (Web Framework) (Part 3)](../web/ux/README4.md)<br>

---

### API

[Installing MySQL Connector for Python](../web/api/py/README.md)

</details>
