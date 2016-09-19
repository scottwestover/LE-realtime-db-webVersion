var consumerKey = 0;
var accountNum = 0;
var consumerSecret = 0;
var accessToken = 0;
var accessTokenSecret = 0;
var msgConskillSelect = 1;
var msgConskillIDList = null;
var msgConagentIDList = null;
var msgConAgentSelect = 1;
var msgConRange = 1;
var msgcsatskillSelect = 1;
var msgcsatskillIDList = null;
var msgcsatagentIDList = null;
var msgcsatAgentSelect = 1;
var msgcsatRange = 1;
getLocalStorageVariables();
var showData = false;
var showData2 = false;
var ctx = document.getElementById("lineChart").getContext("2d");
var ctx2 = document.getElementById("lineChart24hr").getContext("2d");
var data = {
    labels: ["Answer 5", "Answer 4", "Answer 3", "Answer 2", "Answer 1"],
    datasets: [{
        label: "My First dataset",
        fillColor: "#03586A",
        strokeColor: "#03586A",
        highlightFill: "#4e8a96",
        highlightStroke: "#4e8a96",
        data: [65, 59, 80, 81, 56]
    }]
};
var data2 = {
    labels: ["CCP", "Consumer", "System"],
    datasets: [{
        label: "My First dataset",
        fillColor: "#03586A",
        strokeColor: "#03586A",
        highlightFill: "#4e8a96",
        highlightStroke: "#4e8a96",
        data: [65, 59, 80]
    }]
};
var myLineChart = new Chart(ctx).Bar(data, {
    responsive: true,
    animation: false
});
var myPieChart = new Chart(ctx2).Bar(data2, {
    responsive: true,
    animation: false
});

$(document).ready(function() {
    $('#lineChart').hide();
    $('#lineChart24hr').hide();
    //setup the agent status table
    $('#agentStatusTable').DataTable({
        "initComplete": function(settings) {
            /* Apply the tooltips */
            $('#agentStatusTable thead th[title]').tooltip({
                "container": 'body'
            });
        },
        aLengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ]
    });
    //setup the skill status table
    $('#skillStatusTable').DataTable({
        "initComplete": function(settings) {
            /* Apply the tooltips */
            $('#skillStatusTable thead th[title]').tooltip({
                "container": 'body'
            });
        },
        aLengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ]
    });
    setTimeout(function() {
        var sel = 'div[role="main"]';
        agentList = angular.element(sel).scope().listUsers();
        skillList = angular.element(sel).scope().listSkills();
        agentGroupList = angular.element(sel).scope().listGroups();
        getData();
    }, 100);
});



function getData() {
    $.ajax({
        type: 'GET',
        url: '/messagingConversation?cKey=' + consumerKey + '&accNum=' + accountNum + '&cSec=' + consumerSecret + '&tok=' + accessToken + '&tSec=' + accessTokenSecret + '&skill=' + msgConskillIDList + '&skS=' + msgConskillSelect + '&agent=' + msgConagentIDList + '&agS=' + msgConAgentSelect + '&range=' + msgConRange,
        success: function(data) {
            if (data.Fail != "undefined" && data.Fail != "404") {
                updateMessagingConData(data);
            } else {
                //window.location.href = "/error";
                $('#myModal2').modal('show');
                $('#errorDetails').html(JSON.stringify(data.Error));
            }
        }
    });
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

function getLocalStorageVariables() {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        consumerKey = localStorage.getItem("consumerKeyM");
        accountNum = localStorage.getItem("accountNumM");
        consumerSecret = localStorage.getItem("consumerSecretM");
        accessToken = localStorage.getItem("accessTokenM");
        accessTokenSecret = localStorage.getItem("accessTokenSecretM");
        msgConskillSelect = localStorage.getItem("msgConskillSelect");
        msgConskillIDList = localStorage.getItem("msgConskillIDList");
        msgConagentIDList = localStorage.getItem("msgConagentIDList");
        msgConAgentSelect = localStorage.getItem("msgConAgentSelect");
        msgConRange = localStorage.getItem("msgConRange");
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
 * @desc updates the data table and the current queue dashboard with the data from the messaging csat api
 * @param data - JSON Object that is returned from the messaging csat API
 * @return undefined
 */
function updateMessagingConData(data) {
    var skillId = "";
    var agentId = "";
    var avgTime_resolvedConversations = 0;
    var resolvedConversations_byCCP = 0;
    var resolvedConversations_byConsumer = 0;
    var totalResolvedConversations = 0;
    var resolvedConversations_bySystem = 0;
    if (data.hasOwnProperty("metricsTotals")) {
        avgTime_resolvedConversations = data.metricsTotals.avgTime_resolvedConversations;
        resolvedConversations_byCCP = data.metricsTotals.resolvedConversations_byCCP;
        resolvedConversations_byConsumer = data.metricsTotals.resolvedConversations_byConsumer;
        totalResolvedConversations = data.metricsTotals.totalResolvedConversations;
        resolvedConversations_bySystem = data.metricsTotals.resolvedConversations_bySystem;

        avgTime_resolvedConversations = secondsToHms(avgTime_resolvedConversations/1000);
    }
    if (data.hasOwnProperty("agentsMetrics")) {
        if (data.agentsMetrics.hasOwnProperty("metricsPerAgent")) {
            for (var agent in data.agentsMetrics.metricsPerAgent) {
                skillId = "All";
                if (agentList.hasOwnProperty(agent)) {
                    agentId = agentList[agent].nickname;
                } else {
                    agentId = agent;
                }
                avgTime_resolvedConversations = data.agentsMetrics.metricsPerAgent[agent].avgTime_resolvedConversations;
                resolvedConversations_byCCP = data.agentsMetrics.metricsPerAgent[agent].resolvedConversations_byCCP;
                resolvedConversations_byConsumer = data.agentsMetrics.metricsPerAgent[agent].resolvedConversations_byConsumer;
                totalResolvedConversations = data.agentsMetrics.metricsPerAgent[agent].totalResolvedConversations;
                resolvedConversations_bySystem = data.agentsMetrics.metricsPerAgent[agent].resolvedConversations_bySystem;

                avgTime_resolvedConversations = secondsToHms(avgTime_resolvedConversations/1000);
            }
        }
        if (data.agentsMetrics.hasOwnProperty("metricsTotals")) {
            avgTime_resolvedConversations = data.agentsMetrics.metricsTotals.avgTime_resolvedConversations;
            resolvedConversations_byCCP = data.agentsMetrics.metricsTotals.resolvedConversations_byCCP;
            resolvedConversations_byConsumer = data.agentsMetrics.metricsTotals.resolvedConversations_byConsumer;;
            totalResolvedConversations = data.agentsMetrics.metricsTotals.totalResolvedConversations;
            resolvedConversations_bySystem = data.agentsMetrics.metricsTotals.resolvedConversations_bySystem;

            avgTime_resolvedConversations = secondsToHms(avgTime_resolvedConversations/1000);
        }
    }
    if (data.hasOwnProperty("skillsMetricsPerAgent")) {
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
                        avgTime_resolvedConversations = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].avgTime_resolvedConversations;
                        resolvedConversations_byCCP = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].resolvedConversations_byCCP;
                        resolvedConversations_byConsumer = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].resolvedConversations_byConsumer;
                        totalResolvedConversations = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].totalResolvedConversations;
                        resolvedConversations_bySystem = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].resolvedConversations_bySystem;
                    
                        avgTime_resolvedConversations = secondsToHms(avgTime_resolvedConversations/1000);
                    }
                }
                if (data.skillsMetricsPerAgent.metricsPerSkill[skill].hasOwnProperty("metricsTotals")) {
                    agentId = "All";
                    avgTime_resolvedConversations = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.avgTime_resolvedConversations;
                    resolvedConversations_byCCP = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.resolvedConversations_byCCP;
                    resolvedConversations_byConsumer = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.resolvedConversations_byConsumer;
                    totalResolvedConversations = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.totalResolvedConversations;
                    resolvedConversations_bySystem = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.resolvedConversations_bySystem;
                
                    avgTime_resolvedConversations = secondsToHms(avgTime_resolvedConversations/1000);
                }
            }
        }
        if (data.skillsMetricsPerAgent.hasOwnProperty("metricsTotals")) {
            skillId = "All";
            agentId = "All";
            avgTime_resolvedConversations = data.skillsMetricsPerAgent.metricsTotals.avgTime_resolvedConversations;
            resolvedConversations_byCCP = data.skillsMetricsPerAgent.metricsTotals.resolvedConversations_byCCP;
            resolvedConversations_byConsumer = data.skillsMetricsPerAgent.metricsTotals.resolvedConversations_byConsumer;
            totalResolvedConversations = data.skillsMetricsPerAgent.metricsTotals.totalResolvedConversations;
            resolvedConversations_bySystem = data.skillsMetricsPerAgent.metricsTotals.resolvedConversations_bySystem;
        
            avgTime_resolvedConversations = secondsToHms(avgTime_resolvedConversations/1000);
        }
    }
    $('#conRes').html(totalResolvedConversations);
    $('#conCCP').html(resolvedConversations_byCCP);
    $('#conCon').html(resolvedConversations_byConsumer);
    $('#avgTime').html(avgTime_resolvedConversations);
    updateLineGraph2(resolvedConversations_bySystem, resolvedConversations_byCCP, resolvedConversations_byConsumer)
}

/**
 * @desc updates the data table and the current queue dashboard with the data from the messaging csat api
 * @param data - JSON Object that is returned from the messaging csat API
 * @return undefined
 */
function updateMessagingCSATData(data) {
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
        csatScore = (data.metricsTotals.csat_score * 100).toFixed(0) + "%";
        positiveAns = data.metricsTotals.positive_answers;
        totalAns = data.metricsTotals.total_answers;
        csat1 = data.metricsTotals.csat_score1_answers;
        csat2 = data.metricsTotals.csat_score2_answers;
        csat3 = data.metricsTotals.csat_score3_answers;
        csat4 = data.metricsTotals.csat_score4_answers;
        csat5 = data.metricsTotals.csat_score5_answers;
    }
    if (data.hasOwnProperty("agentsMetrics")) {
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
        }
    }
    if (data.hasOwnProperty("skillsMetricsPerAgent")) {
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
        }
    }
    $('#csatScore').html(csatScore);
    $('#totalAns').html(totalAns);
    $('#posAns').html(positiveAns);
    updateLineGraph(csat5, csat4, csat3, csat2, csat1);
}

function updateLineGraph(d1, d2, d3, d4, d5) {
    //destroy the graphs and populate them with the new data
    myLineChart.destroy();
    // data sets for the graphs
    data = {
        labels: ["Answer 5", "Answer 4", "Answer 3", "Answer 2", "Answer 1"],
        datasets: [{
            label: "My First dataset",
            fillColor: "#03586A",
            strokeColor: "#03586A",
            highlightFill: "#4e8a96",
            highlightStroke: "#4e8a96",
            data: [d1, d2, d3, d4, d5]
        }]
    };
    //if this is the first data pull, then show the graphs
    if (showData == false) {
        $('#lineChart').show();
        showData = true;
        myLineChart = new Chart(ctx).Bar(data, {
            responsive: true,
            animation: false
        });
        myLineChart.datasets[0].bars[0].fillColor = "#03586a"; //bar 1
        myLineChart.datasets[0].bars[1].fillColor = "#024351"; //bar 2
        myLineChart.datasets[0].bars[2].fillColor = "#6a4803"; //bar 3
        myLineChart.datasets[0].bars[3].fillColor = "#DAA520"; //bar 3
        myLineChart.datasets[0].bars[4].fillColor = "#6a1503"; //bar 3
        myLineChart.update();
    } else {
        myLineChart = new Chart(ctx).Bar(data, {
            responsive: true,
            animation: false
        });
        myLineChart.datasets[0].bars[0].fillColor = "#03586a"; //bar 1
        myLineChart.datasets[0].bars[1].fillColor = "#024351"; //bar 2
        myLineChart.datasets[0].bars[2].fillColor = "#6a4803"; //bar 3
        myLineChart.datasets[0].bars[3].fillColor = "#DAA520"; //bar 3
        myLineChart.datasets[0].bars[4].fillColor = "#6a1503"; //bar 3
        myLineChart.update();
    }
}

function updateLineGraph2(d1, d2, d3) {
    myPieChart.destroy();
    data2 = {
        labels: ["CCP", "Consumer", "System"],
        datasets: [{
            label: "My First dataset",
            fillColor: "#03586A",
            strokeColor: "#03586A",
            highlightFill: "#4e8a96",
            highlightStroke: "#4e8a96",
            data: [d2, d3, d1]
        }]
    };
    if (showData2 == false) {
        $('#lineChart24hr').show();
        showData2 = true;
        myPieChart = new Chart(ctx2).Bar(data2, {
            responsive: true,
            animation: false
        });
    } else {
        myPieChart = new Chart(ctx2).Bar(data2, {
            responsive: true,
            animation: false
        });
    }
}