sudo cp ~/Documents/'01 Workplace William'/'Quote Downloader'/ftpDownloader/com.local.ftp.downloader.plist /Library/LaunchAgents/com.local.ftp.downloader.plist

cd /Library/LaunchAgents/

sudo launchctl unload com.local.ftp.downloader.plist || echo "Service wasn't loaded before"
sudo launchctl load com.local.ftp.downloader.plist || echo "Service refused to register"