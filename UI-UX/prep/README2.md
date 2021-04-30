# Flashing OS image to SD card: Linux version

## Table of contents

[Overview](#overview)<br>
[Requirements](#requirements)<br>
[Linux setup](#linux-setup)<br>
[Adding SSH and Wpa_supplicant](#adding-ssh-and-wpa_supplicant)<br>
[Finding a Connection](#finding-a-connection)<br>
[Setting up Static IP](#setting-up-static-ip)<br>
[FAQ](#faq)<br>

<div id='overview'>

## Overview

This short tutorial will help you get set up flashing the Debian to your sd card without using any external tools for the setup. In this section, we will cover how to flash an image from Linux using the command utility `dd`. Depending on your operating system, you may find more than one method to flash the image down onto your sd card.

<b>Note</b>: This may be a little advanced for a beginner, but a great way to learn how to flash an image onto an sd card with minimal outside tools. I'd reccommend doing this with Hans in case of any problems.

</div>

<div id='requirements'>

## Requirements
- SD card (minimum 8 GB)
- SD card reader/writer
- Linux OS

</div>

<div id='linux-setup'>

## Linux setup

You will first need to go to the [Raspberry Pi Downloads page](https://www.raspberrypi.org/downloads/raspberry-pi-os/) and choose to either download the zip files or get a torrent version of the operating system you would like. For this tutorial, we are going to use `Raspberry Pi OS (32-bit) with desktop and recommended software`. 

<b>Note</b>: If you are only using an 8GB sd card, my other recommendation would be the `Raspberry Pi OS with Desktop` instead. This will leave you with more room once you install everything you need. 

<b>Note</b>: Depending On your choice, downloading the zip files can take an average of 30 minutes, even on the best connections. If you are wanting to download them quickly, I would suggest the torrent.

Once you've finished downloading your preferred image, remember the file path where your image is located. If you choose to download the zip files, unzip the download and your image should appear in the folder.

While you're waiting for the image download to complete, you can do the following below to transit into getting your Pi OS setup:

- Insert the sd card into your sd card reader/writer and plug into your computer. Your desktop should display a message similar to `8.1 GB Volume` and show a new mounted partition on the desktop.
- Open your terminal with `CTRL+ALT+T` to find your where the sd card partition is located.
- On the terminal, run the command `lsblk -p` to find where your SD card is located. Remember how big your sd card is and if any information is located on it. 

```console
/dev/sda      8:0    0 298.1G  0 disk 
/dev/sdb      8:16   0 931.5G  0 disk 
├─/dev/sdb1   8:17   0    32G  0 part /media/hans/NEWDRIVE
├─/dev/sdb2   8:18   0     1K  0 part 
├─/dev/sdb3   8:19   0  37.3G  0 part /media/hans/TestPart
└─/dev/sdb5   8:21   0    61G  0 part /
/dev/sdc      8:32   1   7.5G  0 disk 
└─/dev/sdc1   8:33   1   7.5G  0 part /media/hans/9016-4EF8
/dev/sr0     11:0    1  1024M  0 rom  
```

For example, the `8.1 GB Volume` will actually have about 7.5 GB worth of free space. The partition will also have a weird name compared to the other volumes mounted. For my demonstration, I found my sd card was labeled at `/dev/sdc` and the partition of the sd card location is on `/dev/sdc1` 

<b>Note</b>: If by chance the sd card was used previously and not a brand new one, run the command over the sd card `sudo dd if=/dev/zero of=/dev/sdcardpartitionlocation bs=4M status=progress`. Change `sdcardparitionlocation` to where your sd card is mounted. In my case it was `/dev/sdc1`

Before you begin the command, you need to unmount where the specific partition is located on the sd card, not the entire location. The location you need to unmount is usually called `/dev/sdc#` or `/dev/sdb#` where `#` is usually 1 or 2. You can unmount where the sd card is by typing in the following command: `umount /dev/sdc#`. Make sure to replace the `#` with the correct number you see from the `lsblk -p` command. 

To see if the partition was unmounted, you can run the `lsblk -p` command again. There should not be anything on the folder path if you unmounted the partition successfully. You can see below when I ran the command `lsblk -p` again to check my `/dev/sdc` partition.

```console
/dev/sda      8:0    0 298.1G  0 disk 
/dev/sdb      8:16   0 931.5G  0 disk 
├─/dev/sdb1   8:17   0    32G  0 part /media/hans/NEWDRIVE
├─/dev/sdb2   8:18   0     1K  0 part 
├─/dev/sdb3   8:19   0  37.3G  0 part /media/hans/TestPart
└─/dev/sdb5   8:21   0    61G  0 part /
/dev/sdc      8:32   1   7.5G  0 disk 
└─/dev/sdc1   8:33   1   7.5G  0 part 
/dev/sr0     11:0    1  1024M  0 rom  
```

After unmounting the correct location, you can flash the os img file onto the sd card with the following command `sudo dd bs=4M if=locationofraspberryimg of=/dev/sdcardlocation status=progress conv=fsync`. You can also run `sync` at the end to complete the process.

```console
hans@hans:~$ sudo dd bs=4M if=/home/hans/Downloads/2020-08-20-raspios-buster-armhf.img of=/dev/sdc status=progress conv=fsync
3812622336 bytes (3.8 GB, 3.6 GiB) copied, 105 s, 36.3 MB/s
911+0 records in
911+0 records out
3821010944 bytes (3.8 GB, 3.6 GiB) copied, 141.591 s, 27.0 MB/s
hans@hans:~$ sync
```

Again because of my location, I'll be burning the pi OS to location`/dev/sdc`. Your location may vary.

The `if=` stands for input file,`locationofraspberryim` is just the folder path of where you downloaded the OS. 

<b>Note</b>: Please be patient while this process takes place. Depending on your computer, this could take a while to write to your SD card. The command `dd` does not tell you or show any progress until the flashing is complete, but adding the `status=progress` will show progress in action.

Now just wait for the progress to complete. When you complete the process, you should have two new partitions for your raspberry pi os. They should be `boot` and `rootfs`.

</div>

<div id='addingsshandwpa'>

## Adding SSH and Wpa_supplicant.

Since we want to set this up as a headless pi, we need a way to access the device remotely. We can do that by creating an empty file called `ssh`. This is short for Secure Shell, which allows us to connect to any device inside or outside the locate network. To do all this, you will need to accomplish a couple of steps. One of which is to remount your new os.

- Remount your newly created raspberry image by typing in the following command: `sudo mount /dev/sdc# /media/yourusername/`. Remember you will have two new names as I mentioned above. Mount both of these drives.

```console
hans@hans:~$ sudo mount /dev/sdc1 /media/hans/
[sudo] password for hans: 
hans@hans:~$ sudo mount /dev/sdc2 /media/hans/
```

- Run the `lsblk -p` command again and take note where your image has been mounted at. It should be something similar to `/media/yourusername/`.

```console
/dev/sda      8:0    0 298.1G  0 disk 
/dev/sdb      8:16   0 931.5G  0 disk 
├─/dev/sdb1   8:17   0    32G  0 part /media/hans/NEWDRIVE
├─/dev/sdb2   8:18   0     1K  0 part 
├─/dev/sdb3   8:19   0  37.3G  0 part /media/hans/TestPart
└─/dev/sdb5   8:21   0    61G  0 part /
/dev/sdc      8:48   1   7.5G  0 disk 
├─/dev/sdc1   8:49   1   256M  0 part /media/hans
└─/dev/sdc2   8:50   1   7.3G  0 part /media/hans
/dev/sr0     11:0    1  1024M  0 rom  

```

- Go into your boot folder by typing in `cd /media/yourusername/` or where the partition is located. Run the `ls` command when you get to this directory. It should list files having `rpi` in the name.

To see if you are in the right area, you can do an `ls` command to list files inside the the folder. You should see some files such as `rpi` in the name. This is where you are going to add the `ssh` file.

- Create a file inside this directory by typing into the terminal `sudo touch ssh`.
- Type `ls` to make sure the file was added.
- In that same directory add another file with the command `sudo touch wpa_supplicant.conf`.

With the `ssh` file added you can now login into the pi without having to worry about plugging it into a monitor. However, you will also need to create another file called `wpa_supplicant.conf` like the last step above. This file we create will hold both the our SSID of our router and password. Once setup, we can then connect the pi over the Internet.

- Now you need to edit the file. For now you can use `nano`. Type in the following command to the terminal: `nano wpa_supplicant.conf`. This will bring up a blank terminal screen.
- Paste in the following below into the new file:

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

- Save your work by pressing `CTRL + S`.
- Return to the previous terminal screen press `CTRL + X`.

You can now go ahead and safely eject your device from your computer. You can do this by either right-clicking on the device and click `Eject` or via terminal `sudo unmount /dev/sdcardlocation`.
</div>

<div id='findingaconnection'>

## Finding a Connection

Now comes the test of finding your pi on the local network. In this stage, you will plug in your sd card into the pi you assembled earlier and test to see if you can access it remotely. If you aren't sure which way it should go in, make sure the logo on the sd card is facing you. 

Give the pi a little bit before logging in. If you see a green light blink on in a pattern, that means the image was flashed successfully and will begin the boot-up process. Now you can attempt to log in. To do this, you need to find the ip address of the pi when plugged in.

- To find the pi, you can ping the address on your network. Type into your terminal `ping raspberrypi.local` and observe what comes back. If you followed the tutorial correctly, you should be getting packets appearing along the terminal. 

<b>Note</b>: In the event that you have multiple raspberry pi's setup across the network, a better command you can run that will list the pi's in an easier format to read.<br>

`arp -a | grep b8:27:eb | awk -v OFS='\t' '{print $4, $2}'`

There should be a IPv4 address appearing, usually starting with `192.168` or `10.0.0`. That should be the local address for your raspberry pi. Yours may be different depending on the location.

- Log in to the pi using the command `sudo ssh pi@localipaddress`. Type `yes` to continue to connect.
- Type in the default password for the pi: `raspberry`. You won't see it appear on screen so make sure you spell it correctly. 

Congratulations! You just made your first attempt at logging into another computer with very little outside tools in this tutorial. If you want to make sure you have logged in, you can type into the terminal `hostname -I`. The response you get should be the ip address location of the pi. You can also check to see if the terminal name is `pi@raspberry`.

One more thing we want to check. To see if you are connected, type in the terminal `ping 8.8.8.8`. Let this run for a couple of seconds, then stop by using `CTRL+C`. If you see a message saying you transmitted and received packets, your device is currently working.

Now before moving on to setting up a static ip, go ahead and run the following commands.<br>

`sudo apt update`<br>
`sudo apt upgrade`

This is just to update and upgrade everything for your pi before you begin to experiment on the device. Keep in mind depending on your distro, the updates could take awhile.

</div>

<div id='settingupastaticip'>

## Setting up Static IP

One thing you can do once you get in is you can set a static ip assigned to your raspberry pi. The ip on a raspberry pi tends to be dynamic, which changes either on next startup or over the course of 24 hours. If you would like to give it a maintained ip, you can do so with the following steps. This will take editing a certain file and checking your default gateway and DNS.

- In your terminal, run the command `cat /etc/resolv.conf`. This should give you a nameserver ip.
- Remember or marked down what that IP is, you will need it when adding the DNS ip.
- Now run the command `route -n` to display our routing table.
- Again, mark down the ip address you find under `Gateway`. You will also need to add this into the file for setting up the static ip.

Now you will need to edit a new file to set up your desired ip address

- Navigate to the `etc` folder by typing `cd /etc`.
- Open the file the edit by typing `nano dhcpcd.conf`.
- Go all the way to the bottom of the page and add the following:

```
interface wlan0

static ip_address=192.168.0.200/24
static routers=192.168.0.1
static domain_name_servers=192.168.0.1 8.8.8.8
```
Now there are a couple of things to know here before moving on

The interface `wlan0` is used for WiFi connection. Now if you were going to connect via ethernet, the interface name would instead be `eth0`.

For the `static ip_address`, this is where you will set up your static ip. You can change this to anything you want on the end. Make sure to not include the `/24` portion on your ip that you choose. For my example, I used ip address `192.168.1.22`.

The `static routers` is the gateway ip that is associated with your router. You found this when you ran the command `route n`. This is the variable you will associate with it.

Finally the `static domain_name_servers` or DNS is what you found when you ran the command `cat /etc/resolv.conf`. There is a good chance the ip will be similar or the same to your static router. There is also a possibility you may have more than one. Add each one to your variable separated b a space.

<b>Note</b>: If you are having trouble connecting or getting an unreachable host, you can add the ip address, separated by a space, `8.8.8.8` to your DNS variable.

- Reboot your raspberry pi using the command `sudo reboot`. This should close your current connection then while the reboot takes place.

After waiting for a short period of time, you can check to see if your raspberry pi is now set to the current ip address you typed in. Log in via ssh to the ip address you changed it to. Ping your raspberry pi with the command `ping raspberrypi.local` or `arp -a | grep b8:27:eb | awk -v OFS='\t' '{print $4, $2}'`.

When you find the correct address and log in, you can check to make sure it does hold the same ip you changed it to by typing the command `hostname -I`. This will list your current ip in the terminal. And remember to check your connection by doing a `ping 8.8.8.8` to see if you are receiving packets from transmission.

<b>Note</b>: There will be more content for this section added to a later date for those getting interested in Linux. For now, you can [jump to Secure Copy Location](linux/README.md#command-line-text-editors) on the next tutorial.

</div>

<div id='faq'>

## FAQ

<b>My Pi isn't appearing on the network?</b><br>

If you are not locating your device when executing the `ping` command, there is a good chance you may have not put all your information into the `wpa_supplicant.conf` correctly. The most common error is an incorrect name for your `ssid` or the wrong password for the `psk` category. 

<b>What is the difference between wlan0 and eth0?</b><br>

The `wlan0` information is what will be used when the Raspberry Pi is connected to the internet over WiFi. Otherwise the `eth0` information is used if the Raspberry Pi is connected to the internet via Ethernet.  

</div>

<details><summary>Tutorial List</summary>
<br>

### Prep

[Raspberry Pi Prep](../prep/README.md)<br>
[(Bonus) Flashing OS image to SD card: Linux Version](prep/README2.md)<br>

### Linux - WSl setup

[Operating System (Linux)](linux/README.md)<br>
[Toggle Raspberry Pi led light](linux/embed/README.md)<br>
[Autoboot Services](linux/embed/sysd/README.md)<br>

### Database

[(Part 1) Database (MySQL)](db/README.md)<br>
[(Part 2)  Tables, Querys, and SQL](db/README2.md)<br>
[(Part 3)  Working with Relations](db/README3.md)<br>
[(Part 4) Putting it all together](db/README4.md)<br>
[(Extras) Setting MySQL Timezone on Raspberry Pi](db/MYSQLTZ.md)<br>

### Web

[Getting Started with Node](web/README.md)<br>
[(Overview) Getting Started with Node](web/README)<br>
[(Part 1) Web API (Node)](web/api/js/src/iotapi/README.md)<br>
[(Part 2) Web API (Node)](web/api/js/src/iotapi/README2.md)<br>
[(Part 3) Web API (Node)](web/api/js/src/iotapi/README3.md)]<br>
[(Part 4) Web API (Node)](web/api/js/src/iotapi/README4.md)]<br>
[(Part 5) Web API (Node)](web/api/js/src/iotapi/README5.md)]<br>

### UX

[Angular (Web Framework)](web/ux/README.md)<br>

### API

[Installing MySQL Connector for Python](web/api/py/README.md)

### Cryptography

[Crypto](web/CRYPTO.md)<br>


</details>


