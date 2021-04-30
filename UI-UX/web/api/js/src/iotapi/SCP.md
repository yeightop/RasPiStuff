
#  Secure Copy (SCP)

Let's start by creating a simple script for automating deployment of our Javascript files, files ending in `.js`, to the Raspberry Pi. On your local machine, load your favorite editor and create the file `copy.to.pi.sh`. Paste the contents below in the file.

<b>Note<b>: If you already created an `index.js` or an `iot.json` file in your Raspberry Pi, you can just create a simple text file to copy over.

```console
#!/bin/bash
scp index.js iot.json pi@raspberrypi-ip:~/sictcweb/web/api/js/src/iotapi
```
If you are getting a permission denied error, you may have to enable write permissions for that directory so your local client can move files to the Raspberry Pi.

In the code above, whenever you make a shell script, you need to include the line at the start of the script `#!/bin/bash`. This indicates the file is a script to be executed. This entry is often referred to as Shbang.

Be sure to save the file as `copy.to.pi.sh` and exit back to the terminal on you local machine. 

There is one additional command we need to execute on our `copy.to.pi.sh` script to give it execute permissions. From your local machine's terminal issue the command illustrated below.

```console
chmod +x copy.to.pi.sh
```

When you invoke the  `chmod +x` command on a file, you are giving the file execution permissions. Any shell script you make needs to have this permission set.

You can now issue `./copy.to.pi.sh` to execute the command. You will be prompted for a password to login followed by a listing of files successfully uploaded. As the tutorial progresses we will make changes to the script to allow for other files to be uploaded. There will be times when you rename a source file on your machine, you'll want update the name in the `copy.to.pi.sh` script accordingly.

<b>Note</b>: Again, the section above had you exit from a file and add more onto the file once you finished. Having multiple terminals running can help you avoid closing out a screen all the time when building you application.