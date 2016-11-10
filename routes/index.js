/*********************
 * Module dependencies
 *********************/
var request = require('request');
var async = require('async');
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

//renders the error.html page for the dashboard
exports.error = function (req, res) {
    res.render('pages/error');
};

//routes to the correct pages by using the angular routing defined in the angularScript.js file
exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};

exports.startupPage = function (req, res) {
    res.redirect('/startups');
};

// pulls the agent activity data
exports.agentActivity = function (req, res) {
    var oauth = {
        consumer_key: req.query.cKey,
        consumer_secret: req.query.cSec,
        token: req.query.tok,
        token_secret: req.query.tSec
    };
    // url for agent activity
    var url = 'https://' + rtBaseURL + '/operations/api/account/' + req.query.accNum + '/agentactivity?timeframe=' + req.query.range + '&agentIds=all&v=1';
    request.get({
        url: url,
        oauth: oauth,
        json: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }, function (e, r, b) {
        if (!e && r.statusCode == 200) {
            b["settingsTime"] = req.query.range;
            b["skillChoice"] = req.query.skill;
            res.json(b);
        } else {
            res.json({
                "Error": b,
                "Fail": "404"
            });
        }
    });
};

//returns the current queue size by calling the current queue state api
exports.currentQueueState = function (req, res) {
    var oauth = {
        consumer_key: req.query.cKey,
        consumer_secret: req.query.cSec,
        token: req.query.tok,
        token_secret: req.query.tSec
    };
    var skillList = req.query.skill;
    if (skillList === 'null') {
        skillList = "all";
    }
    // url for current queue health
    var url = 'https://' + rtBaseURL + '/operations/api/account/' + req.query.accNum + '/queuestate?skillIds=' + skillList + '&v=1';
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
};

// pulls the queue health data
exports.queueHealth = function (req, res) {
    var oauth = {
        consumer_key: req.query.cKey,
        consumer_secret: req.query.cSec,
        token: req.query.tok,
        token_secret: req.query.tSec
    };
    var skillList = req.query.skillList;
    if (skillList === 'null') {
        skillList = "all";
    }
    // url for queue health
    var url = 'https://' + rtBaseURL + '/operations/api/account/' + req.query.accNum + '/queuehealth?timeframe=' + req.query.qaR + '&v=1&skillIds=' + skillList;
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

};

// pulls the queue health data for the past 24 hours
exports.queueHealth2 = function (req, res) {
    var oauth = {
        consumer_key: req.query.cKey,
        consumer_secret: req.query.cSec,
        token: req.query.tok,
        token_secret: req.query.tSec
    };
    var skillList = req.query.skillList;
    if (skillList === 'null') {
        skillList = "all";
    }
    // url for queue health
    var url = 'https://' + rtBaseURL + '/operations/api/account/' + req.query.accNum + '/queuehealth?timeframe=1440&interval=60&v=1&skillIds=' + skillList;
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
};

// pulls the engagment activity data
exports.engagementActivity = function (req, res) {
    var oauth = {
        consumer_key: req.query.cKey,
        consumer_secret: req.query.cSec,
        token: req.query.tok,
        token_secret: req.query.tSec
    };
    var skillList = req.query.skill;
    if (skillList === 'null') {
        skillList = "all";
    }
    var agentList = req.query.agent;
    if (agentList === 'null') {
        agentList = "all";
    }
    var params = "";
    //if none dont add to url
    if (req.query.skS !== "3") {
        params += "&skillIds=" + skillList;
    }
    if (req.query.agS !== "3") {
        params += "&agentIds=" + agentList;
    }

    // url for queue health
    var url = 'https://' + rtBaseURL + '/operations/api/account/' + req.query.accNum + '/engactivity?timeframe=' + req.query.range + '&v=1' + params;
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
};

// pulls the engagment activity data for the past 24 hours
exports.engagementActivity2 = function (req, res) {
    var oauth = {
        consumer_key: req.query.cKey,
        consumer_secret: req.query.cSec,
        token: req.query.tok,
        token_secret: req.query.tSec
    };

    // url for queue health
    var url = 'https://' + rtBaseURL + '/operations/api/account/' + req.query.accNum + '/engactivity?timeframe=1440&interval=60&v=1&agentIds=all';
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
};

//route used to query the apis to pull in the data. If the app is not able to connect to the apis, then it routes to the settings page.
exports.startup = function (req, res) {
    skillData = {};
    agentData = {};
    agentGroupData = {};
    var oauth = {
        consumer_key: req.query.cKey,
        consumer_secret: req.query.cSec,
        token: req.query.tok,
        token_secret: req.query.tSec
    };

    // get the baseURI for the RT API
    var url = 'https://api.liveperson.net/api/account/' + req.query.accNum + '/service/leDataReporting/baseURI.json?version=1.0';
    request.get({
        url: url,
        json: true,
    }, function (e, r, b) {
        if (!e && r.statusCode == 200) {
            rtBaseURL = b.baseURI;
            statusUpdate = null;
            //query the users api to get the users information
            //get the base domain url for the apis
            var url = 'https://api.liveperson.net/api/account/' + req.query.accNum + '/service/accountConfigReadOnly/baseURI.json?version=1.0';
            request.get({
                url: url,
                json: true,
            }, function (e, r, b) {
                if (!e && r.statusCode == 200) {
                    statusUpdate = {
                        'Status': "Base URI determined"
                    };
                    tempBaseURI = b.baseURI;
                    skillsURL = 'https://' + tempBaseURI + '/api/account/' + req.query.accNum + '/configuration/le-users/skills?v=1';
                    agentGroupsURL = 'https://' + tempBaseURI + '/api/account/' + req.query.accNum + '/configuration/le-users/agentGroups?v=1';
                    usersURL = 'https://' + tempBaseURI + '/api/account/' + req.query.accNum + '/configuration/le-users/users?v=1';
                    //get agent groups
                    var temp = req.query.accNum;
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

// pulls the sla data using the sla api endpoint
exports.sla = function (req, res) {
    var oauth = {
        consumer_key: req.query.cKey,
        consumer_secret: req.query.cSec,
        token: req.query.tok,
        token_secret: req.query.tSec
    };

    var skillList = req.query.skill;
    if (skillList === 'null') {
        skillList = "all";
    }

    //        console.log("sla: " + skillList);
    // url for queue health
    var url = 'https://' + rtBaseURL + '/operations/api/account/' + req.query.accNum + '/sla?timeframe=' + req.query.range + '&v=1&skillIds=' + skillList;
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
};

// pulls the conversations API
exports.conversations = function (req, res) {
    var oauth = {
        consumer_key: req.query.cKey,
        consumer_secret: req.query.cSec,
        token: req.query.tok,
        token_secret: req.query.tSec
    };
    var convCount = 1;
    var convOffset = 0;
    var offset = req.query.offset;
    if (offset === 'null') {
        offset = "1";
    }
    var limit = req.query.limit;
    if (limit === 'null') {
        limit = "100";
    }
    var skillList = req.query.skill;
    //       console.log("req.query.skill: " + req.query.skill);
    if (skillList === 'null') {
        skillList = "";
    }

    var params = "";
    //if none dont add to url
    //        console.log("req.query.skS: " + req.query.skS);
    if (req.query.skS !== "3") {
        //        if (skillList !== "") {
        params += ",\"skillIds\": [" + skillList + "]";
    }

    //        console.log("params= " + params);

    var to_ms = (new Date).getTime();
    var from_ms = to_ms - (offset * 60 * 1000);
    var bodyStr = "{\"start\": {\"from\":" + from_ms + ", \"to\":" + to_ms + "}";
    if (params !== "") {
        //           bodyStr += params;
    }
    bodyStr += "}";

    var completeConv = "{\"conversationHistoryRecords\": [";

    //        console.log(bodyStr);

    async.whilst(
        // test condition, true or false...
        function () {
            return (convOffset <= convCount);
        },

        // Do the work here...  
        function (callback) {
            var url = 'https://va.msghist.liveperson.net/messaging_history/api/account/' + req.query.accNum + '/conversations/search?offset=' + convOffset + '&limit=' + limit;
            request.post({
                url: url,
                oauth: oauth,
                body: bodyStr,
                headers: {
                    'Content-Type': 'application/json'
                }
            }, function (e, r, b) {
                if (!e && r.statusCode == 200) {
                    var jsonb = JSON.parse(b);
                    if (jsonb.hasOwnProperty("_metadata")) {
                        if (jsonb._metadata.hasOwnProperty("count")) {
                            convCount = jsonb._metadata.count;
                            convOffset += 100;
                        }
                    }
                    if (jsonb.hasOwnProperty("conversationHistoryRecords")) {
                        completeConv += ((JSON.stringify(jsonb.conversationHistoryRecords)).slice(1, JSON.stringify(jsonb.conversationHistoryRecords).length).slice(0, -1));
                    }
                    if (convOffset < convCount) {
                        completeConv += ",";
                    }

                    callback();
                } else {
                    //completeConv += b;
                    callback(e);
                }
            });
        },

        // Error and/or complete...
        function callback(err) {
            if (err) {
                console.log(err);
                res.json({
                    "Error": completeConv,
                    "Fail": "404"
                });
            }
            //                console.log("Finished getting conversations...");
            completeConv += "]}";
            //                console.log("conversations: " + (completeConv));
            res.json(completeConv);
        }
    );
};

// pulls the messaging conversation api
exports.messagingConversation = function (req, res) {
    var oauth = {
        consumer_key: req.query.cKey,
        consumer_secret: req.query.cSec,
        token: req.query.tok,
        token_secret: req.query.tSec
    };
    var skillList = req.query.skill;
    if (skillList === 'null') {
        skillList = "all";
    }
    var agentList = req.query.agent;
    if (agentList === 'null') {
        agentList = "all";
    }
    var params = "";
    //if none dont add to url
    if (req.query.skS !== "3") {
        params += "&skillIds=" + skillList;
    }
    if (req.query.agS !== "3") {
        params += "&agentIds=" + agentList;
    }

    //        console.log("messagingConversation: " + params);

    // url for queue health
    var url = 'https://' + rtBaseURL + '/operations/api/account/' + req.query.accNum + '/msgconversation?timeframe=' + req.query.range + '&v=1' + params;
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
};

// pulls the messaging csat api
exports.messagingCSAT = function (req, res) {
    var oauth = {
        consumer_key: req.query.cKey,
        consumer_secret: req.query.cSec,
        token: req.query.tok,
        token_secret: req.query.tSec
    };
    var skillList = req.query.skill;
    if (skillList === 'null') {
        skillList = "all";
    }
    var agentList = req.query.agent;
    if (agentList === 'null') {
        agentList = "all";
    }
    var params = "";
    //if none dont add to url
    if (req.query.skS !== "3") {
        params += "&skillIds=" + skillList;
    }
    if (req.query.agS !== "3") {
        params += "&agentIds=" + agentList;
    }

    // url for messaging csat distribution
    var url = 'https://' + rtBaseURL + '/operations/api/account/' + req.query.accNum + '/msgcsatdistribution?timeframe=' + req.query.range + '&v=1' + params;
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
                                'Stats': 'Completed',
                                'users': agentData,
                                'skills': skillData,
                                'groups': agentGroupData

                            });
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
            for (var i = 0; i < b.length; i++) {
                agentGroupData[b[i].id] = b[i].name;
            }
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