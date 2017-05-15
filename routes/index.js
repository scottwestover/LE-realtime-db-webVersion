/*********************
 * Module dependencies
 *********************/
var request = require('request');
// file system to save data
var fs = require('fs');
var csv = require('csv');
var json2csv = require('json2csv');
var skillData = {};
var agentData = {};
var agentGroupData = {};
var rtBaseURL = null;
//variables for the URLS we need for API calls
var tempBaseURI = null;
var skillsURL = null;
var agentGroupsURL = null;
var usersURL = null;
var statusUpdate = null;
/********
 * Routes
 ********/

//renders the main.html page for the dashboard
exports.index = function (req, res) {
    res.render('pages/main');
};

//returns the current queue size by calling the current queue state api
exports.currentQueueState = function (req, res) {
 var readFilePass = true;
    // pull oauth settings from oauthSettings.js file
    try {
        var oauthSettings = JSON.parse(fs.readFileSync('./public/oauthSettings.js', 'utf8'));
    } catch (e) {
        //error occurred parsing file
        readFilePass = false;
        res.json({
            "Error": "Unable to parse file",
            "Fail": "404"
        });
    }
    if (readFilePass == true) {
        var oauth = {
            consumer_key: oauthSettings.consumer_key,
            consumer_secret: oauthSettings.consumer_secret,
            token: oauthSettings.token,
            token_secret: oauthSettings.token_secret
        };
        var skillList = oauthSettings.CQskillIDList;
        if (oauthSettings.CQskillIDList === 'undefined') {
            skillList = "all";
        }
        // url for current queue health
        var url = 'https://' + rtBaseURL + '/operations/api/account/' + oauthSettings.accountNum + '/queuestate?skillIds='+skillList+'&v=1';
        request.get({
            url: url,
            oauth: oauth,
            json: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }, function (e, r, b) {
            if (!e && r.statusCode == 200) {
                console.log(b);
                res.json(b);
            } else {
                res.json({
                    "Error": b,
                    "Fail": "404"
                });
            }
        });
    }
};

//renders the error.html page for the dashboard
exports.error = function (req, res) {
    res.render('pages/error');
};

//returns a list of the skills from the skill csv file
exports.skillList = function (req, res) {
    res.json(skillData);
};

//returns a list of the agents from the agent csv file
exports.agentList = function (req, res) {
    res.json(agentData);
};

//returns a list of the agent groups from the agentsGroups csv file
exports.agentGroupList = function (req, res) {
    res.json(agentGroupData);
}

//routes to the correct pages by using the angular routing defined in the angularScript.js file
exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};

//saves all of the settings from the settings page into the oauthSettings.js file
exports.saveSettings = function (req, res) {
    //check to see if any of the api info has changed. If it has, we need to run the startup function again, if not, then save the settings and display the dashboard.
    var readFilePass = true;
    var tempconsumerkey = req.query.consumerKey;
    var tempconsumersecret = req.query.consumerSecret;
    var temptoken = req.query.accessToken;
    var temptokenSecret = req.query.accessTokenSecret;
    var tempaccountNum = req.query.accountNum;
    var temprange = req.query.agentActivityRange;
    var tempintervalCheck = req.query.intervalCheck;
    var tempqarange = req.query.queueHealthRange;
    var tempagentSelect = req.query.agentSelect;
    var tempskillSelect = req.query.skillSelect;
    var tempskillIDList = req.query.skillIDList;
    var tempearange = req.query.engagementActivityRange;
    var tempeaskillSelect = req.query.easkillSelect;
    var tempeaAgentSelect = req.query.eaAgentSelect;
    var tempeaskillIDList = req.query.easkillIDList;
    var tempeaagentIDList = req.query.eaagentIDList;
    var tempslatime = req.query.sla;
    var tempSkillSelectAA = req.query.skillSelectAA;
    var tempskillIDListAA = req.query.skillIDListAA;
    var tempCQskillSelect = req.query.CQskillSelect;
    var tempCQskillIDList = req.query.CQskillIDList;
    var tempslaRange = req.query.slaRange;
    var tempslaskillSelect = req.query.slaskillSelect;
    var tempslaskillIDList = req.query.slaskillIDList;
    console.log(tempCQskillSelect);
    console.log(tempCQskillIDList);
    try {
        // pull oauth settings from oauthSettings.js file
        var oauthSettings = JSON.parse(fs.readFileSync('./public/oauthSettings.js', 'utf8'));
    } catch (e) {
        //error occurred parsing file
        readFilePass = false;
    }
    var needToRestart = false;
    if (readFilePass == true) {
        if(tempconsumerkey != oauthSettings.consumer_key || tempconsumersecret != oauthSettings.consumer_secret || temptoken != oauthSettings.token || temptokenSecret != oauthSettings.token_secret || tempaccountNum != oauthSettings.accountNum){
            needToRestart = true;
        }
    }
    else {
        needToRestart = true;
    } 
    if (needToRestart == true){
        fs.writeFile("./public/oauthSettings.js", '{"consumer_key": "' + tempconsumerkey + '","consumer_secret": "' + tempconsumersecret + '","token": "' + temptoken + '","token_secret": "' + temptokenSecret + '","accountNum": "' + tempaccountNum + '","aarange": "' + temprange + '","intervalCheck": "' + tempintervalCheck + '","qarange":"' + tempqarange + '","agentSelect":"' + tempagentSelect + '","skillSelect":"' + tempskillSelect + '","skillIDList":"' + tempskillIDList + '","earange":"' + tempearange + '","easkillSelect":"' + tempeaskillSelect + '","eaAgentSelect":"' + tempeaAgentSelect + '","eaagentIDList":"' + tempeaagentIDList + '","easkillIDList":"' + tempeaskillIDList + '", "sla":"' + tempslatime + '", "skillSelectAA":"'+ tempSkillSelectAA +'", "CQskillIDList":"'+tempCQskillIDList+'", "CQskillSelect":"'+tempCQskillSelect+'","skillIDListAA":"'+ tempskillIDListAA + '","slaRange":"'+tempslaRange+'","slaskillIDList":"'+tempslaskillIDList+'","slaskillSelect":"'+tempslaskillSelect+'"}', function (err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/');
        });

    }
    else { 
        fs.writeFile("./public/oauthSettings.js", '{"consumer_key": "' + tempconsumerkey + '","consumer_secret": "' + tempconsumersecret + '","token": "' + temptoken + '","token_secret": "' + temptokenSecret + '","accountNum": "' + tempaccountNum + '","aarange": "' + temprange + '","intervalCheck": "' + tempintervalCheck + '","qarange":"' + tempqarange + '","agentSelect":"' + tempagentSelect + '","skillSelect":"' + tempskillSelect + '","skillIDList":"' + tempskillIDList + '","earange":"' + tempearange + '","easkillSelect":"' + tempeaskillSelect + '","eaAgentSelect":"' + tempeaAgentSelect + '","eaagentIDList":"' + tempeaagentIDList + '","easkillIDList":"' + tempeaskillIDList + '", "sla":"' + tempslatime + '", "skillSelectAA":"'+ tempSkillSelectAA +'", "CQskillIDList":"'+tempCQskillIDList+'", "CQskillSelect":"'+tempCQskillSelect+'","skillIDListAA":"'+ tempskillIDListAA + '","slaRange":"'+tempslaRange+'","slaskillIDList":"'+tempslaskillIDList+'","slaskillSelect":"'+tempslaskillSelect+'"}', function (err) {    
        if (err) {
                console.log(err);
            }
            res.render('pages/main');
        });
    }
};

//saves all of the settings from the messaging settings page into the oauthSettings2.js file
exports.saveSettingsMsg = function (req, res) {
    //check to see if any of the api info has changed. If it has, we need to run the startup function again, if not, then save the settings and display the dashboard.
    var readFilePass = true;
    var tempconsumerkey = req.query.consumerKey;
    var tempconsumersecret = req.query.consumerSecret;
    var temptoken = req.query.accessToken;
    var temptokenSecret = req.query.accessTokenSecret;
    var tempaccountNum = req.query.accountNum;
    var tempmsgcsatRange = req.query.msgcsatRange;
    var tempmsgConRange = req.query.msgConRange;
    var tempmsgConskillSelect = req.query.msgConskillSelect;
    var tempmsgConskillIDList = req.query.msgConskillIDList;
    var tempmsgcsatskillSelect = req.query.msgcsatskillSelect;
    var tempmsgcsatskillIDList = req.query.msgcsatskillIDList;
    var tempmsgConAgentSelect = req.query.msgConAgentSelect;
    var tempmsgConagentIDList = req.query.msgConagentIDList;
    var tempmsgcsatAgentSelect = req.query.msgcsatAgentSelect;
    var tempmsgcsatagentIDList = req.query.msgcsatagentIDList;

    try {
        // pull oauth settings from oauthSettings.js file
        var oauthSettings = JSON.parse(fs.readFileSync('./public/oauthSettings2.js', 'utf8'));
    } catch (e) {
        //error occurred parsing file
        readFilePass = false;
    }
    var needToRestart = false;
    if (readFilePass == true) {
        if(tempconsumerkey != oauthSettings.consumer_key || tempconsumersecret != oauthSettings.consumer_secret || temptoken != oauthSettings.token || temptokenSecret != oauthSettings.token_secret || tempaccountNum != oauthSettings.accountNum){
            needToRestart = true;
        }
    }
    else {
        needToRestart = true;
    } 
    if (needToRestart == true){
        fs.writeFile("./public/oauthSettings2.js", '{"consumer_key": "' + tempconsumerkey + '","consumer_secret": "' + tempconsumersecret + '","token": "' + temptoken + '","token_secret": "' + temptokenSecret + '","accountNum": "' + tempaccountNum + '","msgConRange": "' + tempmsgConRange + '","msgcsatRange": "' + tempmsgcsatRange + '","msgConskillSelect": "' + tempmsgConskillSelect + '","msgConskillIDList": "' + tempmsgConskillIDList + '","msgcsatskillSelect": "' + tempmsgcsatskillSelect + '","msgcsatskillIDList": "' + tempmsgcsatskillIDList + '","msgConAgentSelect": "' + tempmsgConAgentSelect + '","msgConagentIDList": "' + tempmsgConagentIDList + '","msgcsatAgentSelect": "' + tempmsgcsatAgentSelect + '","msgcsatagentIDList": "' + tempmsgcsatagentIDList + '"}', function (err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/');
        });

    }
    else { 
        fs.writeFile("./public/oauthSettings2.js", '{"consumer_key": "' + tempconsumerkey + '","consumer_secret": "' + tempconsumersecret + '","token": "' + temptoken + '","token_secret": "' + temptokenSecret + '","accountNum": "' + tempaccountNum + '","msgConRange": "' + tempmsgConRange + '","msgcsatRange": "' + tempmsgcsatRange + '","msgConskillSelect": "' + tempmsgConskillSelect + '","msgConskillIDList": "' + tempmsgConskillIDList + '","msgcsatskillSelect": "' + tempmsgcsatskillSelect + '","msgcsatskillIDList": "' + tempmsgcsatskillIDList + '","msgConAgentSelect": "' + tempmsgConAgentSelect + '","msgConagentIDList": "' + tempmsgConagentIDList + '","msgcsatAgentSelect": "' + tempmsgcsatAgentSelect + '","msgcsatagentIDList": "' + tempmsgcsatagentIDList + '"}', function (err) {
            if (err) {
                console.log(err);
            }
            res.redirect('/msgconDashboard?click=true');
        });
    }
};

//returns all of the settings that are saved for the settings page
exports.getOauth = function (req, res) {
    var readFilePass = true;
    // pull oauth settings from oauthSettings.js file
    try {
        var oauthSettings = JSON.parse(fs.readFileSync('./public/oauthSettings.js', 'utf8'));
    } catch (e) {
        //error occurred parsing file
        readFilePass = false;
        res.json({
            "Error": "Unable to parse file",
            "Fail": "404"
        });
    }
    if (readFilePass == true) {
        res.send(oauthSettings);
    }
};

//returns all of the message settings that are saved for the message settings page
exports.getOauthMsg = function (req, res) {
    var readFilePass = true;
    // pull oauth settings from oauthSettings.js file
    try {
        var oauthSettings = JSON.parse(fs.readFileSync('./public/oauthSettings2.js', 'utf8'));
    } catch (e) {
        //error occurred parsing file
        readFilePass = false;
        res.json({
            "Error": "Unable to parse file",
            "Fail": "404"
        });
    }
    if (readFilePass == true) {
        res.send(oauthSettings);
    }
};

// pulls the agent activity data
exports.agentActivity = function (req, res) {
    var readFilePass = true;
    // pull oauth settings from oauthSettings.js file
    try {
        var oauthSettings = JSON.parse(fs.readFileSync('./public/oauthSettings.js', 'utf8'));
    } catch (e) {
        //error occurred parsing file
        readFilePass = false;
        res.json({
            "Error": "Unable to parse file",
            "Fail": "404"
        });
    }
    if (readFilePass == true) {
        var oauth = {
            consumer_key: oauthSettings.consumer_key,
            consumer_secret: oauthSettings.consumer_secret,
            token: oauthSettings.token,
            token_secret: oauthSettings.token_secret
        };
        // url for agent activity
        var url = 'https://' + rtBaseURL + '/operations/api/account/' + oauthSettings.accountNum + '/agentactivity?timeframe=' + oauthSettings.aarange + '&agentIds=all&v=1';
        request.get({
            url: url,
            oauth: oauth,
            json: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }, function (e, r, b) {
            if (!e && r.statusCode == 200) {
                //console.log(b);
                b["settingsTime"] = oauthSettings.aarange;
                b["skillChoice"] = oauthSettings.skillIDListAA;
                res.json(b);
            } else {
                res.json({
                    "Error": b,
                    "Fail": "404"
                });
            }
        });
    }
};

// pulls the queue health data
exports.queueHealth = function (req, res) {
    var readFilePass = true;
    // pull oauth settings from oauthSettings.js file
    try {
        var oauthSettings = JSON.parse(fs.readFileSync('./public/oauthSettings.js', 'utf8'));
    } catch (e) {
        //error occurred parsing file
        readFilePass = false;
        res.json({
            "Error": "Unable to parse file",
            "Fail": "404"
        });
    }
    if (readFilePass == true) {
        var oauth = {
            consumer_key: oauthSettings.consumer_key,
            consumer_secret: oauthSettings.consumer_secret,
            token: oauthSettings.token,
            token_secret: oauthSettings.token_secret
        };
        var skillList = oauthSettings.skillIDList;
        if (oauthSettings.skillIDList === 'undefined') {
            skillList = "all";
        }
        // url for queue health
        var url = 'https://' + rtBaseURL + '/operations/api/account/' + oauthSettings.accountNum + '/queuehealth?timeframe=' + oauthSettings.qarange + '&v=1&skillIds=' + skillList;
        request.get({
            url: url,
            oauth: oauth,
            json: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }, function (e, r, b) {
            if (!e && r.statusCode == 200) {
                //console.log(b);
                res.json(b);
            } else {
                res.json({
                    "Error": b,
                    "Fail": "404"
                });
            }
        });
    }
};

// pulls the queue health data for the past 24 hours
exports.queueHealth2 = function (req, res) {
    var readFilePass = true;
    // pull oauth settings from oauthSettings.js file
    try {
        var oauthSettings = JSON.parse(fs.readFileSync('./public/oauthSettings.js', 'utf8'));
    } catch (e) {
        //error occurred parsing file
        readFilePass = false;
        res.json({
            "Error": "Unable to parse file",
            "Fail": "404"
        });
    }
    if (readFilePass == true) {
        var oauth = {
            consumer_key: oauthSettings.consumer_key,
            consumer_secret: oauthSettings.consumer_secret,
            token: oauthSettings.token,
            token_secret: oauthSettings.token_secret
        };
        var skillList = oauthSettings.skillIDList;
        if (oauthSettings.skillIDList === 'undefined') {
            skillList = "all";
        }
        // url for queue health
        var url = 'https://' + rtBaseURL + '/operations/api/account/' + oauthSettings.accountNum + '/queuehealth?timeframe=1440&interval=60&v=1&skillIds=' + skillList;
        request.get({
            url: url,
            oauth: oauth,
            json: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }, function (e, r, b) {
            if (!e && r.statusCode == 200) {
                //console.log(b);
                res.json(b);
            } else {
                res.json({
                    "Error": b,
                    "Fail": "404"
                });
            }
        });
    }
};

// pulls the engagment activity data
exports.engagementActivity = function (req, res) {
    var readFilePass = true;
    // pull oauth settings from oauthSettings.js file
    try {
        var oauthSettings = JSON.parse(fs.readFileSync('./public/oauthSettings.js', 'utf8'));
    } catch (e) {
        //error occurred parsing file
        readFilePass = false;
        res.json({
            "Error": "Unable to parse file",
            "Fail": "404"
        });
    }
    if (readFilePass == true) {
        // pull oauth settings from oauthSettings.js file
        var oauth = {
            consumer_key: oauthSettings.consumer_key,
            consumer_secret: oauthSettings.consumer_secret,
            token: oauthSettings.token,
            token_secret: oauthSettings.token_secret
        };
        var skillList = oauthSettings.easkillIDList;
        if (oauthSettings.easkillIDList === 'undefined') {
            skillList = "all";
        }
        var agentList = oauthSettings.eaagentIDList;
        if (oauthSettings.eaagentIDList === 'undefined') {
            agentList = "all";
        }
        var params = "";
        //if none dont add to url
        if (oauthSettings.easkillSelect !== "3") {
            params += "&skillIds=" + skillList;
        }
        if (oauthSettings.eaAgentSelect !== "3") {
            params += "&agentIds=" + agentList;
        }

        // url for queue health
        var url = 'https://' + rtBaseURL + '/operations/api/account/' + oauthSettings.accountNum + '/engactivity?timeframe=' + oauthSettings.earange + '&v=1' + params;
        request.get({
            url: url,
            oauth: oauth,
            json: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }, function (e, r, b) {
            if (!e && r.statusCode == 200) {
                //console.log(b);
                res.json(b);
            } else {
                res.json({
                    "Error": b,
                    "Fail": "404"
                });
            }
        });
    }
};

// pulls the engagment activity data for the past 24 hours
exports.engagementActivity2 = function (req, res) {
    var readFilePass = true;
    // pull oauth settings from oauthSettings.js file
    try {
        var oauthSettings = JSON.parse(fs.readFileSync('./public/oauthSettings.js', 'utf8'));
    } catch (e) {
        //error occurred parsing file
        readFilePass = false;
        res.json({
            "Error": "Unable to parse file",
            "Fail": "404"
        });
    }
    if (readFilePass == true) {
        // pull oauth settings from oauthSettings.js file
        var oauth = {
            consumer_key: oauthSettings.consumer_key,
            consumer_secret: oauthSettings.consumer_secret,
            token: oauthSettings.token,
            token_secret: oauthSettings.token_secret
        };

        // url for queue health
        var url = 'https://' + rtBaseURL + '/operations/api/account/' + oauthSettings.accountNum + '/engactivity?timeframe=1440&interval=60&v=1&agentIds=all';
        request.get({
            url: url,
            oauth: oauth,
            json: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }, function (e, r, b) {
            if (!e && r.statusCode == 200) {
                //console.log(b);
                res.json(b);
            } else {
                res.json({
                    "Error": b,
                    "Fail": "404"
                });
            }
        });
    }
};

//route used to query the apis to pull in the data. If the app is not able to connect to the apis, then it routes to the settings page.
exports.startup = function (req, res) {
    var readFilePass = true;
    // pull oauth settings from oauthSettings.js file
    try {
        var oauthSettings = JSON.parse(fs.readFileSync('./public/oauthSettings.js', 'utf8'));
    } catch (e) {
        //error occurred parsing file
        readFilePass = false;
        res.json({
            "Error": "Unable to parse file",
            "Fail": "404"
        });
    }
    if (readFilePass == true) {
        var oauth = {
            consumer_key: oauthSettings.consumer_key,
            consumer_secret: oauthSettings.consumer_secret,
            token: oauthSettings.token,
            token_secret: oauthSettings.token_secret
        };

        // get the baseURI for the RT API
        var url = 'https://api.liveperson.net/api/account/' + oauthSettings.accountNum + '/service/leDataReporting/baseURI.json?version=1.0';
        request.get({
            url: url,
            json: true,
        }, function (e, r, b) {
            if (!e && r.statusCode == 200) {
                rtBaseURL = b.baseURI;
                statusUpdate = null;
                //query the users api to get the users information
                //get the base domain url for the apis
                var url = 'https://api.liveperson.net/api/account/' + oauthSettings.accountNum + '/service/accountConfigReadOnly/baseURI.json?version=1.0';
                var fields = [];
                request.get({
                    url: url,
                    json: true,
                }, function (e, r, b) {
                    if (!e && r.statusCode == 200) {
                        statusUpdate = {
                            'Status': "Base URI determined"
                        };
                        tempBaseURI = b.baseURI;
                        skillsURL = 'https://' + tempBaseURI + '/api/account/' + oauthSettings.accountNum + '/configuration/le-users/skills?v=1';
                        agentGroupsURL = 'https://' + tempBaseURI + '/api/account/' + oauthSettings.accountNum + '/configuration/le-users/agentGroups?v=1';
                        usersURL = 'https://' + tempBaseURI + '/api/account/' + oauthSettings.accountNum + '/configuration/le-users/users?v=1';
                        //get agent groups
                        var temp = oauthSettings.accountNum;
                        getAgentGroups(oauth, res, temp);
                    } else {
                        statusUpdate = {
                            'Status': "Unable to get the base uri for the Account Config APIs."
                        };
                        res.json({
                            "Error": b,
                            "Fail": "404"
                        });
                    }
                });
            } else {
                res.json({
                    "Error": b,
                    "Fail": "404"
                });
            }
        });
    }
};

//exports the status of the dashboard pulling in the different apis.
exports.startupStatus = function (req, res) {
    if (statusUpdate == null) {
        res.json({
            "Status": "In Progress"
        });
    } else {
        res.json(statusUpdate);
    }
};

exports.startupPage = function (req, res) {
    res.render('pages/startup');
};

// pulls the sla data using the sla api endpoint
exports.sla = function (req, res) {
    var readFilePass = true;
    // pull oauth settings from oauthSettings.js file
    try {
        var oauthSettings = JSON.parse(fs.readFileSync('./public/oauthSettings.js', 'utf8'));
    } catch (e) {
        //error occurred parsing file
        readFilePass = false;
        res.json({
            "Error": "Unable to parse file",
            "Fail": "404"
        });
    }
    if (readFilePass == true) {
        var oauth = {
            consumer_key: oauthSettings.consumer_key,
            consumer_secret: oauthSettings.consumer_secret,
            token: oauthSettings.token,
            token_secret: oauthSettings.token_secret
        };

        var skillList = oauthSettings.slaskillIDList;
        if (oauthSettings.slaskillIDList === 'undefined') {
            skillList = "all";
        }

        // url for queue health
        var url = 'https://' + rtBaseURL + '/operations/api/account/' + oauthSettings.accountNum + '/sla?timeframe=' + oauthSettings.slaRange + '&v=1&skillIds=' + skillList;
        request.get({
            url: url,
            oauth: oauth,
            json: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }, function (e, r, b) {
            if (!e && r.statusCode == 200) {
                res.json(b);
            } else {
                res.json({
                    "Error": b,
                    "Fail": "404"
                });
            }
        });
    }
};

// pulls the messaging conversation api
exports.messagingConversation = function (req, res) {
    var readFilePass = true;
    // pull oauth settings from oauthSettings.js file
    try {
        var oauthSettings = JSON.parse(fs.readFileSync('./public/oauthSettings2.js', 'utf8'));
    } catch (e) {
        //error occurred parsing file
        readFilePass = false;
        res.json({
            "Error": "Unable to parse file",
            "Fail": "404"
        });
    }
    if (readFilePass == true) {
        var oauth = {
            consumer_key: oauthSettings.consumer_key,
            consumer_secret: oauthSettings.consumer_secret,
            token: oauthSettings.token,
            token_secret: oauthSettings.token_secret
        };
        var skillList = oauthSettings.msgConskillIDList;
        if (oauthSettings.msgConskillIDList === 'undefined') {
            skillList = "all";
        }
        var agentList = oauthSettings.msgConagentIDList;
        if (oauthSettings.msgConagentIDList === 'undefined') {
            agentList = "all";
        }
        var params = "";
        //if none dont add to url
        if (oauthSettings.msgConskillSelect !== "3") {
            params += "&skillIds=" + skillList;
        }
        if (oauthSettings.msgConAgentSelect !== "3") {
            params += "&agentIds=" + agentList;
        }

        // url for queue health
        var url = 'https://' + rtBaseURL + '/operations/api/account/' + oauthSettings.accountNum + '/msgconversation?timeframe=' + oauthSettings.msgConRange + '&v=1'+ params;
        request.get({
            url: url,
            oauth: oauth,
            json: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }, function (e, r, b) {
            if (!e && r.statusCode == 200) {
                res.json(b);
            } else {
                res.json({
                    "Error": b,
                    "Fail": "404"
                });
            }
        });
    }
};

// pulls the messaging csat api
exports.messagingCSAT = function (req, res) {
    var readFilePass = true;
    // pull oauth settings from oauthSettings.js file
    try {
        var oauthSettings = JSON.parse(fs.readFileSync('./public/oauthSettings2.js', 'utf8'));
    } catch (e) {
        //error occurred parsing file
        readFilePass = false;
        res.json({
            "Error": "Unable to parse file",
            "Fail": "404"
        });
    }
    if (readFilePass == true) {
        var oauth = {
            consumer_key: oauthSettings.consumer_key,
            consumer_secret: oauthSettings.consumer_secret,
            token: oauthSettings.token,
            token_secret: oauthSettings.token_secret
        };
        var skillList = oauthSettings.msgcsatskillIDList;
        if (oauthSettings.msgcsatskillIDList === 'undefined') {
            skillList = "all";
        }
        var agentList = oauthSettings.msgcsatagentIDList;
        if (oauthSettings.msgcsatagentIDList === 'undefined') {
            agentList = "all";
        }
        var params = "";
        //if none dont add to url
        if (oauthSettings.msgcsatskillSelect !== "3") {
            params += "&skillIds=" + skillList;
        }
        if (oauthSettings.msgcsatAgentSelect !== "3") {
            params += "&agentIds=" + agentList;
        }

        // url for messaging csat distribution
        var url = 'https://' + rtBaseURL + '/operations/api/account/' + oauthSettings.accountNum + '/msgcsatdistribution?timeframe=' + oauthSettings.msgcsatRange + '&v=1'+ params;
        request.get({
            url: url,
            oauth: oauth,
            json: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }, function (e, r, b) {
            if (!e && r.statusCode == 200) {
                res.json(b);
            } else {
                res.json({
                    "Error": b,
                    "Fail": "404"
                });
            }
        });
    }
};

//function to get the agent information by using the apis
function getAgentInfo(oauth, res, temp) {
    //get a list of the users
    request.get({
        url: usersURL,
        oauth: oauth,
        json: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }, function (e, r, b) {
        if (!e && r.statusCode == 200) {
            var users = [];
            var numOfUsers = b.length;
            var counter = 0;
            //loop through and get the data for each individual agent
            for (var i = 0; i < b.length; i++) {
                var userURL = 'https://' + tempBaseURI + '/api/account/' + temp + '/configuration/le-users/users/' + b[i].id + '?v=1';
                request.get({
                    url: userURL,
                    oauth: oauth,
                    json: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }, function (e, r, b2) {
                    if (!e && r.statusCode == 200) {
                        var individualUser = b2;
                        var skillNames = [];
                        for (var z = 0; z < b2.skillIds.length; z++) {
                            skillNames.push(skillData[b2.skillIds[z]]);
                        }
                        if (b2.skillIds.length == 0) {
                            skillNames.push("None");
                        }
                        b2.skillNames = skillNames;
                        agentData[b2.id] = b2;
                        users.push(individualUser);
                        counter++;
                        if (counter == numOfUsers) {
                            res.json({
                                'Stats': 'Completed'
                            });
                            fields = ['nickname', 'skillIds', 'memberOf', 'id', 'maxChats'];
                            //writeDataToCSV(users, fields, "users");
                        } else {
                            statusUpdate = {
                                'Status': counter + " of " + numOfUsers + " completed"
                            };
                        }
                    } else {
                        statusUpdate = {
                                'Status': "Unable to get agent data."
                            };
                    }
                });
            }
        } else {
            statusUpdate = {
                                'Status': "Unable to get agent data.",
                            };
           res.json({
                'Stats': 'Unable to get agent data'
            });
        }
    });
}

//function to get the skills information by using the api
function getSkillInfo(oauth, res, temp) {
    //get the skills data set
    request.get({
        url: skillsURL,
        oauth: oauth,
        json: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }, function (e, r, b) {
        if (!e && r.statusCode == 200) {
            statusUpdate = {
                'Status': "Skill Groups Collected"
            };
            fields = ['id', 'name'];
            //skillData = b;
            for (var i = 0; i < b.length; i++) {
                skillData[b[i].id] = b[i].name;
            }
            //need to get users
            getAgentInfo(oauth, res, temp);
        } else {
            statusUpdate = {
                'Status': "Unable to get skill groups data."
            };
            getAgentInfo(oauth, res, temp);
        }
    });
}
//function to get the agentGroups API
function getAgentGroups(oauth, res, temp) {
    //get the agentGroups data set
    request.get({
        url: agentGroupsURL,
        oauth: oauth,
        json: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }, function (e, r, b) {
        if (!e && r.statusCode == 200) {
            statusUpdate = {
                'Status': "Agent Groups Collected"
            };
            fields = ['id', 'name'];
            //writeDataToCSV(b, fields, "agentGroups");
            //agentGroupData = b;
            for (var i = 0; i < b.length; i++) {
                agentGroupData[b[i].id] = b[i].name;
            }
            //console.log(agentGroupData);
            //call skills api
            getSkillInfo(oauth, res, temp);
        } else {
            statusUpdate = {
                'Status': "Unable to get agent groups data."
            };
            //call skills api
            getSkillInfo(oauth, res, temp);
        }
    });
}