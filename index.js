#!/usr/bin/env node
const scheduler = require("node-schedule");
const ftp = require("basic-ftp");
const fs = require('fs-extra');
const path = require('path')
let date = require('date-and-time');
const os = require('os');

//OPTIONS
let host = "216.251.155.90";
let user = "shawn";
let password = "wolt777";
let localDir = "/Documents/06_current_quote";
let logLocation = "Documents/logs/quoteDownloader/";

//Log Stuff
let logLocation = path.join(os.homedir(), logLocation)
fs.ensureDirSync(logLocation)
const logger = require('simple-node-logger').createSimpleLogger(path.join(logLocation, "debug.log"));
log("Program Has Started")

// for date options see https://www.npmjs.com/package/node-schedule
scheduler.scheduleJob("* * 17 * 4", () => { //Every Wednesday at 5pm
    downloadQuote()
})

//Functions
async function downloadQuote() {
    const client = new ftp.Client()
    client.verbose = true;

    try {
        await client.access( { host, user, password }) 

        let now = new Date();
        let dirDate = date.format(now, 'MM MMMM YYYY');    // => '01 January 2019'

        await client.cd(`/FTP-Share/6-Preservice Quotes/${dirDate}`)

        let fileDate = date.format(now, "YY-MMDD") // => '19-0129
        let fileList = await client.list() // => [object][object]
        let remoteFileName = (await resolveFileName(fileList, fileDate)) // => 19-0116(5-13)Works-Faith 11.mp3
        let localFileLocation = path.join(os.homedir(), localDir)
        let localFile = path.join(localFileLocation, remoteFileName)
        
        process.chdir(localFileLocation) //Changes the download locaiton

        fs.emptyDir(localFileLocation)

        log(`Downloading the file ${remoteFileName}...\n`)
        
        log((await client.download(fs.createWriteStream(localFile), remoteFileName)))
    } catch (err) {
        log(err)
    } finally {
        client.close()
    }
}
// => 226-File successfully transferred
// => 226 13.821 seconds (measured here), 0.54 Mbytes per second

//Takes a list of files as an argument
function resolveFileName(files, fileDate) {
    for (let file of files) {
        if (file.name.slice(0, 7) == fileDate) {
            return file.name
        }
    }
}
// => 19-0122(5-13)Works-Faith 11.mp3 (SIMILAR)

//Does what is says...
function log(msg) {
    logger.info(msg)
}
// => 16:17:07.355 INFO  message here
