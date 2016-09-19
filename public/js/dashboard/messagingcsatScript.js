// variables that are used for pulling the api information from the browser storage
var consumerKey = 0;
var accountNum = 0;
var consumerSecret = 0;
var accessToken = 0;
var accessTokenSecret = 0;
var msgcsatskillSelect = 1;
var msgcsatskillIDList = null;
var msgcsatagentIDList = null;
var msgcsatAgentSelect = 1;
var msgcsatRange = 1;
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
 * @desc calls the messaging csat api
 * @return undefined
 */
function getData() {
    var oTable = $('#example').DataTable();
    $.ajax({
        type: 'GET',
        url: '/messagingCSAT?cKey=' + consumerKey + '&accNum=' + accountNum + '&cSec=' + consumerSecret + '&tok=' + accessToken + '&tSec=' + accessTokenSecret + '&skill=' + msgcsatskillIDList + '&skS=' + msgcsatskillSelect + '&agent=' + msgcsatagentIDList + '&agS' + msgcsatAgentSelect + '&range=' + msgcsatRange,
        success: function(data) {
            if (data.Fail != "undefined" && data.Fail != "404") {
                updateMessagingCSATData(data);
            } else {
                //window.location.href = "/error";
                $('#myModal2').modal('show');
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
        msgcsatskillSelect = localStorage.getItem("msgcsatskillSelect");
        msgcsatskillIDList = localStorage.getItem("msgcsatskillIDList");
        msgcsatagentIDList = localStorage.getItem("msgcsatagentIDList");
        msgcsatAgentSelect = localStorage.getItem("msgcsatAgentSelect");
        msgcsatRange = localStorage.getItem("msgcsatRange");
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
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
        dom: 'Blfrtip',
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
        dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
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
        dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
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
}

/**
 * @desc updates the data table and the current queue dashboard with the data from the messaging csat api
 * @param data - JSON Object that is returned from the messaging csat API
 * @return undefined
 */
function updateMessagingCSATData(data) {
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
    var skillId = "";
    var agentId = "";
    var csatScore = 0;
    var positiveAns = 0;
    var totalAns = 0;
    var csat1 = 0;
    var csat2 = 0;
    var csat3 = 0;
    var csat4 = 0;
    var csat5 = 0;
    if (data.hasOwnProperty("metricsTotals")) {
        $('#table3').show();
        csatScore = (data.metricsTotals.csat_score * 100).toFixed(0) + "%";
        positiveAns = data.metricsTotals.positive_answers;
        totalAns = data.metricsTotals.total_answers;
        csat1 = data.metricsTotals.csat_score1_answers;
        csat2 = data.metricsTotals.csat_score2_answers;
        csat3 = data.metricsTotals.csat_score3_answers;
        csat4 = data.metricsTotals.csat_score4_answers;
        csat5 = data.metricsTotals.csat_score5_answers;
        oTable3.row.add([csatScore, positiveAns, totalAns, csat1, csat2, csat3, csat4, csat5]).draw();
    }
    if (data.hasOwnProperty("agentsMetrics")) {
        $('#table2').show();
        if (data.agentsMetrics.hasOwnProperty("metricsPerAgent")) {
            for (var agent in data.agentsMetrics.metricsPerAgent) {
                skillId = "All";
                if (agentList.hasOwnProperty(agent)) {
                    agentId = agentList[agent].nickname;
                } else {
                    agentId = agent;
                }
                csatScore = (data.agentsMetrics.metricsPerAgent[agent].csat_score * 100).toFixed(0) + "%";
                positiveAns = data.agentsMetrics.metricsPerAgent[agent].positive_answers;
                totalAns = data.agentsMetrics.metricsPerAgent[agent].total_answers;
                csat1 = data.agentsMetrics.metricsPerAgent[agent].csat_score1_answers;
                csat2 = data.agentsMetrics.metricsPerAgent[agent].csat_score2_answers;
                csat3 = data.agentsMetrics.metricsPerAgent[agent].csat_score3_answers;
                csat4 = data.agentsMetrics.metricsPerAgent[agent].csat_score4_answers;
                csat5 = data.agentsMetrics.metricsPerAgent[agent].csat_score5_answers;
                oTable2.row.add([agentId, csatScore, positiveAns, totalAns, csat1, csat2, csat3, csat4, csat5]).draw();
            }
        }
        if (data.agentsMetrics.hasOwnProperty("metricsTotals")) {
            agentId = "All";
            csatScore = (data.agentsMetrics.metricsTotals.csat_score * 100).toFixed(0) + "%";
            positiveAns = data.agentsMetrics.metricsTotals.positive_answers;
            totalAns = data.agentsMetrics.metricsTotals.total_answers;
            csat1 = data.agentsMetrics.metricsTotals.csat_score1_answers;
            csat2 = data.agentsMetrics.metricsTotals.csat_score2_answers;
            csat3 = data.agentsMetrics.metricsTotals.csat_score3_answers;
            csat4 = data.agentsMetrics.metricsTotals.csat_score4_answers;
            csat5 = data.agentsMetrics.metricsTotals.csat_score5_answers;
            oTable2.row.add([agentId, csatScore, positiveAns, totalAns, csat1, csat2, csat3, csat4, csat5]).draw();
        }
    }
    if (data.hasOwnProperty("skillsMetricsPerAgent")) {
        $('#table1').show();
        if (data.skillsMetricsPerAgent.hasOwnProperty("metricsPerSkill")) {
            for (var skill in data.skillsMetricsPerAgent.metricsPerSkill) {
                if (skillList.hasOwnProperty(skill)) {
                    skillId = skillList[skill];
                } else {
                    if (skill == -1) {
                        skillId = "Unassigned"
                    } else {
                        skillId = skill;
                    }
                }
                if (data.skillsMetricsPerAgent.metricsPerSkill[skill].hasOwnProperty("metricsPerAgent")) {
                    for (var agent in data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent) {
                        if (agentList.hasOwnProperty(agent)) {
                            agentId = agentList[agent].nickname;
                        } else {
                            agentId = agent;
                        }
                        csatScore = (data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].csat_score * 100).toFixed(0) + "%";
                        positiveAns = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].positive_answers;
                        totalAns = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].total_answers;
                        csat1 = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].csat_score1_answers;
                        csat2 = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].csat_score2_answers;
                        csat3 = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].csat_score3_answers;
                        csat4 = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].csat_score4_answers;
                        csat5 = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].csat_score5_answers;
                        oTable.row.add([skillId, agentId, csatScore, positiveAns, totalAns, csat1, csat2, csat3, csat4, csat5]).draw();
                    }
                }
                if (data.skillsMetricsPerAgent.metricsPerSkill[skill].hasOwnProperty("metricsTotals")) {
                    agentId = "All";
                    csatScore = (data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.csat_score * 100).toFixed(0) + "%";
                    positiveAns = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.positive_answers;
                    totalAns = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.total_answers;
                    csat1 = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.csat_score1_answers;
                    csat2 = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.csat_score2_answers;
                    csat3 = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.csat_score3_answers;
                    csat4 = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.csat_score4_answers;
                    csat5 = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.csat_score5_answers;
                    oTable.row.add([skillId, agentId, csatScore, positiveAns, totalAns, csat1, csat2, csat3, csat4, csat5]).draw();
                }
            }
        }
        if (data.skillsMetricsPerAgent.hasOwnProperty("metricsTotals")) {
            skillId = "All";
            agentId = "All";
            csatScore = (data.skillsMetricsPerAgent.metricsTotals.csat_score * 100).toFixed(0) + "%";
            positiveAns = data.skillsMetricsPerAgent.metricsTotals.positive_answers;
            totalAns = data.skillsMetricsPerAgent.metricsTotals.total_answers;
            csat1 = data.skillsMetricsPerAgent.metricsTotals.csat_score1_answers;
            csat2 = data.skillsMetricsPerAgent.metricsTotals.csat_score2_answers;
            csat3 = data.skillsMetricsPerAgent.metricsTotals.csat_score3_answers;
            csat4 = data.skillsMetricsPerAgent.metricsTotals.csat_score4_answers;
            csat5 = data.skillsMetricsPerAgent.metricsTotals.csat_score5_answers;
            oTable.row.add([skillId, agentId, csatScore, positiveAns, totalAns, csat1, csat2, csat3, csat4, csat5]).draw();
        }
    }
}