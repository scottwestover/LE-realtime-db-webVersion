# Real Time Dashboard

This is a sample Real Time Dashboard that can be built using the Real Time Operational APIs from LiveEngage. The app also uses the Skills, Users, and Agent Groups APIs to pull in relevant information. This was app was built using NodeJS and Angular.

## Instructions

In order to properly use the app, you will need to enable the Real Time Operational, Skills, Users, and Agent Groups APIs on your account. If the Users, SKills, and Agent Groups APIs are not enabled, then the tool will not pull data correctly.

You can navigate to the messaging dashboard by clicking on the icon on the navbar.

You can add/edit your api keys in LiveEngage by going to the campaigns tab, click on data sources at the bottom, and then click on the api tab. 

## Deploy On Heroku

To deploy the app to Heroku just click on this button here: [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## View Online

You can see an example of the dashboard here: https://le-realtime-manager.herokuapp.com

## Running Locally

In order to run the app locally, you will need to have Node.js installed. Once this is complete, just run npm install, and npm start to run the app.

Your app should be running on localhost:8080.

## Updates

* V1.0.0 - 17 September 2016
 * Fixed
   * Bug where the previously selected agents and skills would not populate on the settings page.
 * New
   * View Real Time Metrics for messaging.
    * Added new SLA api information to the main dashboard. You can also view the SLA information on the new SLA dashboard.
    * Moved all of the dashboard buttons on the navbar to a new menu drop down menu.
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

## Open Issues

Currently there is an issue with this version of the tool in regards to the engagement history api. The domain is currently hard coded, and will need to be udpated to work properly with any account.
