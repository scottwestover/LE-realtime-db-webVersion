// variables that are used for pulling the api information from the browser storage
var consumerKey = 0;
var accountNum = 0;
var consumerSecret = 0;
var accessToken = 0;
var accessTokenSecret = 0;
var agentActivityRange = null;
var skillIDListAA = null;
var workDayStart = null;
getLocalStorageVariables();

// variable for the list of agents
var agentList = null;

$(document).ready(function() {
    setupTables();
    setTimeout(function() {
        var sel = 'div[role="main"]';
        agentList = angular.element(sel).scope().listUsers();
        getData();
    }, 100);
});

/**
 * @desc calls the agent activity api
 * @return undefined
 */
function getData() {
    $.ajax({
        type: 'GET', //The param will get passed to server code index.js NOTE will have to do this for all pages in app
        url: '/agentActivity?cKey=' + consumerKey + '&accNum=' + accountNum + '&cSec=' + consumerSecret + '&tok=' + accessToken + '&tSec=' + accessTokenSecret + '&range=' + agentActivityRange + '&skill=' + skillIDListAA + '&dayStart=' + workDayStart,
        success: function(data) {
            if (data.Fail != "undefined" && data.Fail != "404") {
                updateAgentActivityData(data);
            } else {
                //window.location.href = "/error";
                $('#myModal').modal('show');
                $('#errorDetails').html(JSON.stringify(data.Error));
            }
        }
    });
}

/**
 * @desc gets the api settings from the browser local storage
 * @return undefined
 */
function getLocalStorageVariables() {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        consumerKey = localStorage.getItem("consumerKey");
        accountNum = localStorage.getItem("accountNum");
        consumerSecret = localStorage.getItem("consumerSecret");
        accessToken = localStorage.getItem("accessToken");
        accessTokenSecret = localStorage.getItem("accessTokenSecret");
        agentActivityRange = localStorage.getItem("agentActivityRange");
        skillIDListAA = localStorage.getItem("skillIDListAA");
        workDayStart = localStorage.getItem("workDayStart");
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }
    return;
}

/**
 * @desc updates the data table and the agent activity dashboard with the data from the agent activity api
 * @param data - JSON Object that is returned from the agent activity API
 * @return undefined
 */
function updateAgentActivityData(data) {
    var oTable = $('#example').DataTable();
    oTable
        .clear()
        .draw();
    for (var agent in data.agentsMetrics.metricsPerAgent) {
        // data available for each agent in the 
        var agentID = null;
        if (agentList.hasOwnProperty(agent)) {
            agentID = agentList[agent].nickname;
        } else {
            agentID = agent;
        }
        var onlineTotal = secondsToHms(data.agentsMetrics.metricsPerAgent[agent][0].value.total);
        var onlineChatting = secondsToHms(data.agentsMetrics.metricsPerAgent[agent][0].value.chatting);
        var onlineNotChatting = secondsToHms(data.agentsMetrics.metricsPerAgent[agent][0].value.notChatting);
        var onlineMaxConcurrency = secondsToHms(data.agentsMetrics.metricsPerAgent[agent][0].value.chattingInMaxConcurrency);
        var backSoonTotal = secondsToHms(data.agentsMetrics.metricsPerAgent[agent][1].value.total);
        var backSoonChatting = secondsToHms(data.agentsMetrics.metricsPerAgent[agent][1].value.chatting);
        var backSoonNotChatting = secondsToHms(data.agentsMetrics.metricsPerAgent[agent][1].value.notChatting);
        var backSoonMaxConcurrency = secondsToHms(data.agentsMetrics.metricsPerAgent[agent][1].value.chattingInMaxConcurrency);
        var awayTotal = secondsToHms(data.agentsMetrics.metricsPerAgent[agent][2].value.total);
        var awayChatting = secondsToHms(data.agentsMetrics.metricsPerAgent[agent][2].value.chatting);
        var awayNotChatting = secondsToHms(data.agentsMetrics.metricsPerAgent[agent][2].value.notChatting);
        var awayMaxConcurrency = secondsToHms(data.agentsMetrics.metricsPerAgent[agent][2].value.chattingInMaxConcurrency);
        var loggedInTotal = secondsToHms(data.agentsMetrics.metricsPerAgent[agent][3].value.total);
        var loggedInChatting = secondsToHms(data.agentsMetrics.metricsPerAgent[agent][3].value.chatting);
        var loggedInNotChatting = secondsToHms(data.agentsMetrics.metricsPerAgent[agent][2].value.notChatting);
        var loggedInMaxConcurrency = secondsToHms(data.agentsMetrics.metricsPerAgent[agent][2].value.chattingInMaxConcurrency);
        oTable.row.add([agentID, onlineTotal, onlineChatting, onlineNotChatting, onlineMaxConcurrency, backSoonTotal, backSoonChatting, backSoonNotChatting, backSoonMaxConcurrency, awayTotal, awayChatting, awayNotChatting, awayMaxConcurrency, loggedInTotal, loggedInChatting, loggedInNotChatting, loggedInMaxConcurrency]).draw();
    }
    return;
}

/**
 * @desc initializes the datatables
 * @return undefined
 */
function setupTables() {
    $('#example').DataTable({
        "initComplete": function(settings) {
            /* Apply the tooltips */
            $('#example thead th[title]').tooltip({
                "container": 'body'
            });
        },
        "aoColumnDefs": [{
            "sClass": "online",
            "aTargets": [1, 2, 3, 4]
        }, {
            "sClass": "away",
            "aTargets": [9, 10, 11, 12]
        }],
        dom: 'Bflrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ],
        aLengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ]
    });
    return;
}
