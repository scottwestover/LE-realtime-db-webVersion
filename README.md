# Real Time Dashboard

This is a sample Real Time Dashboard that can be built using the Real Time Operational APIs from LiveEngage. The app also uses the Skills, Users, and Agent Groups APIs to pull in relevant information. This was app was built using NodeJS, Angular, and Electron.

## Notified Of Updates

To be notified when there is a new version of the dashboard avialable, please fill out the following form: [Google Form]I(https://docs.google.com/a/liveperson.com/forms/d/e/1FAIpQLSdH-qUaWj89B5qYFe1wVZdABmpuhgq0L9uk0X8C0gHktxEVUg/viewform)

## Running Locally

In order to run the app locally, you will need to unzip the 'rtdb' folder that you download. Once you do this, you just need to click on the realtime-manager.exe file that is in the folder. You must run the exe from this folder, or the application will not work.

Once the dashboard boots up, you will be taken to an error page. From here, just click on the settings tab on the left hand side, and then you will be required to enter your API keys. After your enter your API keys and click save, the dashboard will reboot and start pulling in your account information.

## Firewall Settings

In order to use the dashboard, you might need to whitelist the URLs that are needed to query the APIs. To get the exact URLs, you will need to get the domain of your account and use the URLs listed below to run the dashboard.

In your browser, copy and paste this URL to get your domain for the URLs listed below. You will need to update {youraccountnumber} with your account number and {baseURI} with the domain of your account.

https://api.liveperson.net/api/account/{youraccountnumber}/service/leDataReporting/baseURI.json?version=1.0

You should see a response similar to this: {"service":"leDataReporting","account":"56072331","baseURI":"va-a.data.liveperson.net"}
The baseURI will be used below:

https://{baseURI}/operations/api/account/{youraccountnumber}/queuestate
https://{baseURI}/operations/api/account/{youraccountnumber}/agentactivity
https://{baseURI}/operations/api/account/{youraccountnumber}/queuehealth
https://{baseURI}/operations/api/account/{youraccountnumber}/engactivity

The following 2 endpoints  are for  messaging only:

https://{baseURI}/operations/api/account/{youraccountnumber}/msgcsatdistribution
https://{baseURI}/operations/api/account/{youraccountnumber}/msgconversation

In your browser, copy and paste this URL to get your domain for the URLs listed below. You will need to update {youraccountnumber} with your account number and {baseURI} with the domain of your account.

https://api.liveperson.net/api/account/{youraccountnumber}/service/accountConfigReadOnly/baseURI.json?version=1.0

You should see a response similar to this: {"service":"accountConfigReadOnly","account":"56072331","baseURI":"va-a.acr.liveperson.net"}
The baseURI will be used below:

https://{baseURI}/api/account/{youraccountnumber}/configuration/le-users/skills?v=1
https://{baseURI}/api/account/{youraccountnumber}/configuration/le-users/agentGroups?v=1
https://{baseURI}/api/account/{youraccountnumber}/configuration/le-users/users?v=1
https://{baseURI}/api/account/{youraccountnumber}/configuration/le-users/skills/
https://{baseURI}/api/account/{youraccountnumber}/configuration/le-users/agentGroups/
https://{baseURI}/api/account/{youraccountnumber}/configuration/le-users/users/

## Updates

* V0.9.3 BETA - 10 August 2016
 * Fixed
  * Current Queue Status - Abandonment Rate Bug
  * Current Queue Status - Incorrect Tool Tips
* V0.9.2 BETA - 28 July 2016
 * Fixed
  * Spelling Mistakes
* V0.9.1 BETA - 22 July 2016
 * New
  * Skill Names and Agent Names will automatically populate in the settings page. You no longer need to manually enter in the skill id or the agent id for the API.
 * Fixed
  * Average Agent Utilization Bug
* V0.9 BETA - 15 July 2016
 * View real time data on an account using the Real Time Operational, Skills, Users, and Agent Groups APIs.
 * Features:
  * Pull data using a custom time frame (past minute up to the past 24 hours).
  * Export raw data to CSV.
  * View agents states.
  * View current queue information.
