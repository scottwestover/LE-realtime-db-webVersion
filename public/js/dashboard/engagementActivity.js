// variables that are used for pulling the api information from the browser storage
var consumerKey = 0;
var accountNum = 0;
var consumerSecret = 0;
var accessToken = 0;
var accessTokenSecret = 0;
var easkillSelect = 1;
var easkillIDList = null;
var eaagentIDList = null;
var eaAgentSelect = 1;
var engagementActivityRange = 1;
getLocalStorageVariables();

//variable for the list of agents
var agentList = null;
//variable for the list of skills
var skillList = null;

$(document).ready(function() {
    setupTables();
    setTimeout(function() {
        var sel = 'div[role="main"]';
        agentList = angular.element(sel).scope().listUsers();
        skillList = angular.element(sel).scope().listSkills();
        getData();
    }, 100);
});

/**
 * @desc calls the engagement activity api
 * @return undefined
 */
function getData() {
    $.ajax({
        type: 'GET',
        url: '/engagementActivity?cKey=' + consumerKey + '&accNum=' + accountNum + '&cSec=' + consumerSecret + '&tok=' + accessToken + '&tSec=' + accessTokenSecret + '&skill=' + easkillIDList + '&skS=' + easkillSelect + '&agent=' + eaagentIDList + '&agS' + eaAgentSelect + '&range=' + engagementActivityRange,
        success: function(data) {
            if (data.Fail != "undefined" && data.Fail != "404") {
                updateEngagementActivityData(data);
            } else {
                $('#myModal').modal('show');
                $('#errorDetails').html(JSON.stringify(data.Error));
                //window.location.href = "/error";
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
        easkillSelect = localStorage.getItem("easkillSelect");
        easkillIDList = localStorage.getItem("easkillIDList");
        eaagentIDList = localStorage.getItem("eaagentIDList");
        eaAgentSelect = localStorage.getItem("eaAgentSelect");
        engagementActivityRange = localStorage.getItem("engagementActivityRange");
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }
    return;
}

/**
 * @desc updates the data table and the engagement activity dashboard with the data from the engagement activity api
 * @param data - JSON Object that is returned from the engagement activity API
 * @return undefined
 */
function updateEngagementActivityData(data) {
    var oTable = $('#example').DataTable();
    var oTable2 = $('#example2').DataTable();
    var oTable3 = $('#example3').DataTable();

    oTable
        .clear()
        .draw();
    oTable2
        .clear()
        .draw();
    oTable3
        .clear()
        .draw();

    // data that is available 
    var skillId;
    var agentId;
    var totalInteractiveChats;
    var totalNonInteractiveChats;
    var totalHandlingTime;
    var nonInteractiveTotalHandlingTime;
    var connectedEngagements;

    // updates the 1st table with the skill metrics per agent
    if (data.hasOwnProperty('skillsMetricsPerAgent')) {
        $('#table1').show();
        for (var skill in data.skillsMetricsPerAgent.metricsPerSkill) {
            //skillId = skill;
            if (skillList.hasOwnProperty(skill)) {
                skillId = skillList[skill];
            } else {
                if (skill == -1) {
                    skillId = "Unassigned"
                } else {
                    skillId = skill;
                }
            }
            for (var agent in data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent) {
                //agentId = agent;
                if (agentList.hasOwnProperty(agent)) {
                    agentId = agentList[agent].nickname;
                } else {
                    agentId = agent;
                }
                totalInteractiveChats = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].totalInteractiveChats;
                totalNonInteractiveChats = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].totalNonInteractiveChats;
                totalHandlingTime = secondsToHms(data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].totalHandlingTime);
                nonInteractiveTotalHandlingTime = secondsToHms(data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].nonInteractiveTotalHandlingTime);
                connectedEngagements = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].connectedEngagements;
                // add to data table
                oTable.row.add([skillId, agentId, totalInteractiveChats, totalNonInteractiveChats, totalHandlingTime, nonInteractiveTotalHandlingTime, connectedEngagements]).draw();
            }
            // total for skill
            agentId = "All";
            totalInteractiveChats = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.totalInteractiveChats;
            totalNonInteractiveChats = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.totalNonInteractiveChats;
            totalHandlingTime = secondsToHms(data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.totalHandlingTime);
            nonInteractiveTotalHandlingTime = secondsToHms(data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.nonInteractiveTotalHandlingTime);
            connectedEngagements = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.connectedEngagements;
            // add to data table
            oTable.row.add([skillId, agentId, totalInteractiveChats, totalNonInteractiveChats, totalHandlingTime, nonInteractiveTotalHandlingTime, connectedEngagements]).draw();
        }
        // totals for all skills
        skillId = "All";
        agentId = "All";
        totalInteractiveChats = data.skillsMetricsPerAgent.metricsTotals.totalInteractiveChats;
        totalNonInteractiveChats = data.skillsMetricsPerAgent.metricsTotals.totalNonInteractiveChats;
        totalHandlingTime = secondsToHms(data.skillsMetricsPerAgent.metricsTotals.totalHandlingTime);
        nonInteractiveTotalHandlingTime = secondsToHms(data.skillsMetricsPerAgent.metricsTotals.nonInteractiveTotalHandlingTime);
        connectedEngagements = data.skillsMetricsPerAgent.metricsTotals.connectedEngagements;
        // add to data table
        oTable.row.add([skillId, agentId, totalInteractiveChats, totalNonInteractiveChats, totalHandlingTime, nonInteractiveTotalHandlingTime, connectedEngagements]).draw();
    }

    // updates the 2nd table with the agent metrics
    if (data.hasOwnProperty('agentsMetrics')) {
        $('#table2').show();
        for (var agent in data.agentsMetrics.metricsPerAgent) {
            if (agentList.hasOwnProperty(agent)) {
                agentId = agentList[agent].nickname;
            } else {
                agentId = agent;
            }
            totalInteractiveChats = data.agentsMetrics.metricsPerAgent[agent].totalInteractiveChats;
            totalNonInteractiveChats = data.agentsMetrics.metricsPerAgent[agent].totalNonInteractiveChats;
            totalHandlingTime = secondsToHms(data.agentsMetrics.metricsPerAgent[agent].totalHandlingTime);
            nonInteractiveTotalHandlingTime = secondsToHms(data.agentsMetrics.metricsPerAgent[agent].nonInteractiveTotalHandlingTime);
            connectedEngagements = data.agentsMetrics.metricsPerAgent[agent].connectedEngagements;
            // add to data table
            oTable2.row.add([agentId, totalInteractiveChats, totalNonInteractiveChats, totalHandlingTime, nonInteractiveTotalHandlingTime, connectedEngagements]).draw();
        }
        // totals for all agents
        agentId = "All";
        totalInteractiveChats = data.agentsMetrics.metricsTotals.totalInteractiveChats;
        totalNonInteractiveChats = data.agentsMetrics.metricsTotals.totalNonInteractiveChats;
        totalHandlingTime = secondsToHms(data.agentsMetrics.metricsTotals.totalHandlingTime);
        nonInteractiveTotalHandlingTime = secondsToHms(data.agentsMetrics.metricsTotals.nonInteractiveTotalHandlingTime);
        connectedEngagements = data.agentsMetrics.metricsTotals.connectedEngagements;
        // add to data table
        oTable2.row.add([agentId, totalInteractiveChats, totalNonInteractiveChats, totalHandlingTime, nonInteractiveTotalHandlingTime, connectedEngagements]).draw();
    }

    // updates the 3rd table with the totals for all skills and agents
    if (data.hasOwnProperty('metricsTotals')) {
        $('#table3').show();
        totalInteractiveChats = data.metricsTotals.totalInteractiveChats;
        totalNonInteractiveChats = data.metricsTotals.totalNonInteractiveChats;
        totalHandlingTime = secondsToHms(data.metricsTotals.totalHandlingTime);
        nonInteractiveTotalHandlingTime = secondsToHms(data.metricsTotals.nonInteractiveTotalHandlingTime);
        connectedEngagements = data.metricsTotals.connectedEngagements;
        oTable3.row.add([totalInteractiveChats, totalNonInteractiveChats, totalHandlingTime, nonInteractiveTotalHandlingTime, connectedEngagements]).draw();
    }
    return;
}

/**
 * @desc initializes the 3 datatables and then hides them on the dashboard until the api is called
 * @return undefined
 */
function setupTables(){
    $('#example').DataTable({
        "initComplete": function(settings) {
            /* Apply the tooltips */
            $('#example thead th[title]').tooltip({
                "container": 'body'
            });
        },
        dom: 'Bflrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ],
        aLengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ]
    });
    $('#example2').DataTable({
        "initComplete": function(settings) {
            /* Apply the tooltips */
            $('#example2 thead th[title]').tooltip({
                "container": 'body'
            });
        },
        dom: 'Bflrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        aLengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ]
    });
    $('#example3').DataTable({
        "initComplete": function(settings) {
            /* Apply the tooltips */
            $('#example3 thead th[title]').tooltip({
                "container": 'body'
            });
        },
        dom: 'Bflrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        aLengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ]
    });
    // hide the tables 
    $('#table1').hide();
    $('#table2').hide();
    $('#table3').hide();
    return;
}