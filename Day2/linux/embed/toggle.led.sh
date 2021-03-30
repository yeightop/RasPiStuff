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



# References: 
# https://www.tutorialkart.com/bash-shell-scripting/bash-sleep/
# https://linuxhandbook.com/if-else-bash/
