# FTP Download to Specified Folder

This app was intended to run as a background process in macOS. 
At 5PM on wednesday, it uses the date to select the filename. 
It then downloads the file to a specified location.

### Changing Settings

Main settings for this are found at the top of the index.js file

    $ //OPTIONS
    $ let host = "216.251.155.90";
    $ let user = "shawn";
    $ let password = "wolt777";
    $ let localDir = "/Documents/06_current_quote";

Settings for the macos process are found in /build/com.local.quoteDownloader.plist.
Here you can change the name of the registered proccess, name, location of the script.


### Building

Step 1: In the home directory of this app run

    $ npm install

This will get all the dependancies.

Step 2: Then, change neccessary settings, and run

    $ npm run buildOsx


Next we are going to copy the to where it will be loaded at startup.
and then start the process.

Step 3:

    $ sudo cp ./build/com.local.quoteDownloader ~/Library/UserAgents/com.local.quoteDownloader
    $ sudo launchctl mount ~/Library/UserAgents/com.local.quoteDownloader
    $ sudo launchctl start ~/Library/UserAgents/com.local.quoteDownloader

**BOOM WALA WALA**
**SUCCESS**

### Debugging

Debug Log
~/Documents/logs/quoteDownloader/debug.log

Getting Build Errors?
Try changing the npm build commmand to your platform or a newer version of node.
