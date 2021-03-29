# Scripts 


## Table of Contents

[Toggle Led](#toggleled)<br>
[References](#references)<br>

<div id='toggleled'/>

## Toggle Led
There will be times that you'll want to identify your `Raspberry Pi` from others. A simple way to do this is to toggle the green led on and off. The example script below toggles the led at 10 Hz. That's 10 times per second.


Login to your `Raspberry Pi` and type or paste the shell script below into a new filed named `toggle.led.sh`. Make sure to issue the `chmod +x` command on the new file. When complete you can run the script by issuing `./toggle.led.sh`. You will see the green led toggle on and off. To stop the script issue the `CTRL+C` command.


```bash
#!/bin/bash

sudo sh -c "echo none > /sys/class/leds/led0/trigger"

led_state=0
run_loop=1

while [ $run_loop -eq 1 ]
do
  if [ $led_state -eq 0 ]
  then
    led_state=1
    # toggle led on
    sudo sh -c "echo 1 > /sys/class/leds/led0/brightness"
  else
    led_state=0
    # toggle led off
    sudo sh -c "echo 0 > /sys/class/leds/led0/brightness"
  fi
  sleep .1

  echo "led_state:  $led_state"
done
```

<div id='references'/>

## References: 
 - https://www.tutorialkart.com/bash-shell-scripting/bash-sleep/
 - https://linuxhandbook.com/if-else-bash/

 <details><summary>Tutorial List</summary>
<br>
 
### Prep
 
[Raspberry Pi Prep](/prep/README.md)<br>
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
