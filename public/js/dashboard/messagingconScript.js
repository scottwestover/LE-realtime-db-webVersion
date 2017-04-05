// variables that are used for pulling the api information from the browser storage
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
}

/**
 * @desc gets the api settings from the browser local storage
 * @return undefined
 */
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
function updateMessagingConData(data) {
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
    var avgTime_resolvedConversations = 0;
    var avgTime_resolvedConversations_byCCP = 0;
    var avgTime_resolvedConversations_byConsumer = 0;
    var avgTime_resolvedConversations_bySystem = 0;
    var resolvedConversations_byCCP = 0;
    var resolvedConversations_byConsumer = 0;
    var resolvedConversations_bySystem = 0;
    var totalHandlingTime_resolvedConversations = 0;
    var totalHandlingTime_resolvedConversations_byCCP = 0;
    var totalHandlingTime_resolvedConversations_byConsumer = 0;
    var totalHandlingTime_resolvedConversations_bySystem = 0;
    var totalResolvedConversations = 0;

    if (data.hasOwnProperty("metricsTotals")) {
        $('#table3').show();
        avgTime_resolvedConversations = data.metricsTotals.avgTime_resolvedConversations;
        avgTime_resolvedConversations_byCCP = data.metricsTotals.avgTime_resolvedConversations_byCCP;
        avgTime_resolvedConversations_byConsumer = data.metricsTotals.avgTime_resolvedConversations_byConsumer;
        avgTime_resolvedConversations_bySystem = data.metricsTotals.avgTime_resolvedConversations_bySystem;
        resolvedConversations_byCCP = data.metricsTotals.resolvedConversations_byCCP;
        resolvedConversations_byConsumer = data.metricsTotals.resolvedConversations_byConsumer;
        resolvedConversations_bySystem = data.metricsTotals.resolvedConversations_bySystem;
        totalHandlingTime_resolvedConversations = data.metricsTotals.totalHandlingTime_resolvedConversations;
        totalHandlingTime_resolvedConversations_byCCP = data.metricsTotals.totalHandlingTime_resolvedConversations_byCCP;
        totalHandlingTime_resolvedConversations_byConsumer = data.metricsTotals.totalHandlingTime_resolvedConversations_byConsumer;
        totalHandlingTime_resolvedConversations_bySystem = data.metricsTotals.totalHandlingTime_resolvedConversations_bySystem;
        totalResolvedConversations = data.metricsTotals.totalResolvedConversations;

        avgTime_resolvedConversations = secondsToHms(avgTime_resolvedConversations/1000);
        avgTime_resolvedConversations_byCCP = secondsToHms(avgTime_resolvedConversations_byCCP/1000);
        avgTime_resolvedConversations_byConsumer = secondsToHms(avgTime_resolvedConversations_byConsumer/1000);
        avgTime_resolvedConversations_bySystem = secondsToHms(avgTime_resolvedConversations_bySystem/1000);
        totalHandlingTime_resolvedConversations = secondsToHms(totalHandlingTime_resolvedConversations/1000);
        totalHandlingTime_resolvedConversations_byCCP = secondsToHms(totalHandlingTime_resolvedConversations_byCCP/1000);
        totalHandlingTime_resolvedConversations_byConsumer = secondsToHms(totalHandlingTime_resolvedConversations_byConsumer/1000);
        totalHandlingTime_resolvedConversations_bySystem = secondsToHms(totalHandlingTime_resolvedConversations_bySystem/1000);

        oTable3.row.add([totalResolvedConversations, resolvedConversations_byCCP, resolvedConversations_byConsumer, resolvedConversations_bySystem, avgTime_resolvedConversations, avgTime_resolvedConversations_byCCP, avgTime_resolvedConversations_byConsumer, avgTime_resolvedConversations_bySystem,totalHandlingTime_resolvedConversations, totalHandlingTime_resolvedConversations_byCCP, totalHandlingTime_resolvedConversations_byConsumer, totalHandlingTime_resolvedConversations_bySystem]).draw();
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
                avgTime_resolvedConversations = data.agentsMetrics.metricsPerAgent[agent].avgTime_resolvedConversations;
                avgTime_resolvedConversations_byCCP = data.agentsMetrics.metricsPerAgent[agent].avgTime_resolvedConversations_byCCP;
                avgTime_resolvedConversations_byConsumer = data.agentsMetrics.metricsPerAgent[agent].avgTime_resolvedConversations_byConsumer;
                avgTime_resolvedConversations_bySystem = data.agentsMetrics.metricsPerAgent[agent].avgTime_resolvedConversations_bySystem;
                resolvedConversations_byCCP = data.agentsMetrics.metricsPerAgent[agent].resolvedConversations_byCCP;
                resolvedConversations_byConsumer = data.agentsMetrics.metricsPerAgent[agent].resolvedConversations_byConsumer;
                resolvedConversations_bySystem = data.agentsMetrics.metricsPerAgent[agent].resolvedConversations_bySystem;
                totalHandlingTime_resolvedConversations = data.agentsMetrics.metricsPerAgent[agent].totalHandlingTime_resolvedConversations;
                totalHandlingTime_resolvedConversations_byCCP = data.agentsMetrics.metricsPerAgent[agent].totalHandlingTime_resolvedConversations_byCCP;
                totalHandlingTime_resolvedConversations_byConsumer = data.agentsMetrics.metricsPerAgent[agent].totalHandlingTime_resolvedConversations_byConsumer;
                totalHandlingTime_resolvedConversations_bySystem = data.agentsMetrics.metricsPerAgent[agent].totalHandlingTime_resolvedConversations_bySystem;
                totalResolvedConversations = data.agentsMetrics.metricsPerAgent[agent].totalResolvedConversations;

                avgTime_resolvedConversations = secondsToHms(avgTime_resolvedConversations/1000);
                avgTime_resolvedConversations_byCCP = secondsToHms(avgTime_resolvedConversations_byCCP/1000);
                avgTime_resolvedConversations_byConsumer = secondsToHms(avgTime_resolvedConversations_byConsumer/1000);
                avgTime_resolvedConversations_bySystem = secondsToHms(avgTime_resolvedConversations_bySystem/1000);
                totalHandlingTime_resolvedConversations = secondsToHms(totalHandlingTime_resolvedConversations/1000);
                totalHandlingTime_resolvedConversations_byCCP = secondsToHms(totalHandlingTime_resolvedConversations_byCCP/1000);
                totalHandlingTime_resolvedConversations_byConsumer = secondsToHms(totalHandlingTime_resolvedConversations_byConsumer/1000);
                totalHandlingTime_resolvedConversations_bySystem = secondsToHms(totalHandlingTime_resolvedConversations_bySystem/1000);

                oTable2.row.add([agentId, totalResolvedConversations, resolvedConversations_byCCP, resolvedConversations_byConsumer, resolvedConversations_bySystem, avgTime_resolvedConversations, avgTime_resolvedConversations_byCCP, avgTime_resolvedConversations_byConsumer, avgTime_resolvedConversations_bySystem,totalHandlingTime_resolvedConversations, totalHandlingTime_resolvedConversations_byCCP, totalHandlingTime_resolvedConversations_byConsumer, totalHandlingTime_resolvedConversations_bySystem]).draw();
            }
        }
        if (data.agentsMetrics.hasOwnProperty("metricsTotals")) {
            agentId = "All";
            avgTime_resolvedConversations = data.agentsMetrics.metricsTotals.avgTime_resolvedConversations;
            avgTime_resolvedConversations_byCCP = data.agentsMetrics.metricsTotals.avgTime_resolvedConversations_byCCP;
            avgTime_resolvedConversations_byConsumer = data.agentsMetrics.metricsTotals.avgTime_resolvedConversations_byConsumer;
            avgTime_resolvedConversations_bySystem = data.agentsMetrics.metricsTotals.avgTime_resolvedConversations_bySystem;
            resolvedConversations_byCCP = data.agentsMetrics.metricsTotals.resolvedConversations_byCCP;
            resolvedConversations_byConsumer = data.agentsMetrics.metricsTotals.resolvedConversations_byConsumer;
            resolvedConversations_bySystem = data.agentsMetrics.metricsTotals.resolvedConversations_bySystem;
            totalHandlingTime_resolvedConversations = data.agentsMetrics.metricsTotals.totalHandlingTime_resolvedConversations;
            totalHandlingTime_resolvedConversations_byCCP = data.agentsMetrics.metricsTotals.totalHandlingTime_resolvedConversations_byCCP;
            totalHandlingTime_resolvedConversations_byConsumer = data.agentsMetrics.metricsTotals.totalHandlingTime_resolvedConversations_byConsumer;
            totalHandlingTime_resolvedConversations_bySystem = data.agentsMetrics.metricsTotals.totalHandlingTime_resolvedConversations_bySystem;
            totalResolvedConversations = data.agentsMetrics.metricsTotals.totalResolvedConversations;

            avgTime_resolvedConversations = secondsToHms(avgTime_resolvedConversations/1000);
            avgTime_resolvedConversations_byCCP = secondsToHms(avgTime_resolvedConversations_byCCP/1000);
            avgTime_resolvedConversations_byConsumer = secondsToHms(avgTime_resolvedConversations_byConsumer/1000);
            avgTime_resolvedConversations_bySystem = secondsToHms(avgTime_resolvedConversations_bySystem/1000);
            totalHandlingTime_resolvedConversations = secondsToHms(totalHandlingTime_resolvedConversations/1000);
            totalHandlingTime_resolvedConversations_byCCP = secondsToHms(totalHandlingTime_resolvedConversations_byCCP/1000);
            totalHandlingTime_resolvedConversations_byConsumer = secondsToHms(totalHandlingTime_resolvedConversations_byConsumer/1000);
            totalHandlingTime_resolvedConversations_bySystem = secondsToHms(totalHandlingTime_resolvedConversations_bySystem/1000);

            oTable2.row.add([agentId, totalResolvedConversations, resolvedConversations_byCCP, resolvedConversations_byConsumer, resolvedConversations_bySystem, avgTime_resolvedConversations, avgTime_resolvedConversations_byCCP, avgTime_resolvedConversations_byConsumer, avgTime_resolvedConversations_bySystem,totalHandlingTime_resolvedConversations, totalHandlingTime_resolvedConversations_byCCP, totalHandlingTime_resolvedConversations_byConsumer, totalHandlingTime_resolvedConversations_bySystem]).draw();
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
                        avgTime_resolvedConversations = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].avgTime_resolvedConversations;
                        avgTime_resolvedConversations_byCCP = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].avgTime_resolvedConversations_byCCP;
                        avgTime_resolvedConversations_byConsumer = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].avgTime_resolvedConversations_byConsumer;
                        avgTime_resolvedConversations_bySystem = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].avgTime_resolvedConversations_bySystem;
                        resolvedConversations_byCCP = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].resolvedConversations_byCCP;
                        resolvedConversations_byConsumer = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].resolvedConversations_byConsumer;
                        resolvedConversations_bySystem = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].resolvedConversations_bySystem;
                        totalHandlingTime_resolvedConversations = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].totalHandlingTime_resolvedConversations;
                        totalHandlingTime_resolvedConversations_byCCP = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].totalHandlingTime_resolvedConversations_byCCP;
                        totalHandlingTime_resolvedConversations_byConsumer = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].totalHandlingTime_resolvedConversations_byConsumer;
                        totalHandlingTime_resolvedConversations_bySystem = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].totalHandlingTime_resolvedConversations_bySystem;
                        totalResolvedConversations = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsPerAgent[agent].totalResolvedConversations;

                        avgTime_resolvedConversations = secondsToHms(avgTime_resolvedConversations/1000);
                        avgTime_resolvedConversations_byCCP = secondsToHms(avgTime_resolvedConversations_byCCP/1000);
                        avgTime_resolvedConversations_byConsumer = secondsToHms(avgTime_resolvedConversations_byConsumer/1000);
                        avgTime_resolvedConversations_bySystem = secondsToHms(avgTime_resolvedConversations_bySystem/1000);
                        totalHandlingTime_resolvedConversations = secondsToHms(totalHandlingTime_resolvedConversations/1000);
                        totalHandlingTime_resolvedConversations_byCCP = secondsToHms(totalHandlingTime_resolvedConversations_byCCP/1000);
                        totalHandlingTime_resolvedConversations_byConsumer = secondsToHms(totalHandlingTime_resolvedConversations_byConsumer/1000);
                        totalHandlingTime_resolvedConversations_bySystem = secondsToHms(totalHandlingTime_resolvedConversations_bySystem/1000);

                        oTable.row.add([skillId, agentId, totalResolvedConversations, resolvedConversations_byCCP, resolvedConversations_byConsumer, resolvedConversations_bySystem, avgTime_resolvedConversations, avgTime_resolvedConversations_byCCP, avgTime_resolvedConversations_byConsumer, avgTime_resolvedConversations_bySystem,totalHandlingTime_resolvedConversations, totalHandlingTime_resolvedConversations_byCCP, totalHandlingTime_resolvedConversations_byConsumer, totalHandlingTime_resolvedConversations_bySystem]).draw();
                    }
                }
                if (data.skillsMetricsPerAgent.metricsPerSkill[skill].hasOwnProperty("metricsTotals")) {
                    agentId = "All";
                    avgTime_resolvedConversations = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.avgTime_resolvedConversations;
                    avgTime_resolvedConversations_byCCP = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.avgTime_resolvedConversations_byCCP;
                    avgTime_resolvedConversations_byConsumer = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.avgTime_resolvedConversations_byConsumer;
                    avgTime_resolvedConversations_bySystem = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.avgTime_resolvedConversations_bySystem;
                    resolvedConversations_byCCP = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.resolvedConversations_byCCP;
                    resolvedConversations_byConsumer = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.resolvedConversations_byConsumer;
                    resolvedConversations_bySystem = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.resolvedConversations_bySystem;
                    totalHandlingTime_resolvedConversations = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.totalHandlingTime_resolvedConversations;
                    totalHandlingTime_resolvedConversations_byCCP = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.totalHandlingTime_resolvedConversations_byCCP;
                    totalHandlingTime_resolvedConversations_byConsumer = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.totalHandlingTime_resolvedConversations_byConsumer;
                    totalHandlingTime_resolvedConversations_bySystem = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.totalHandlingTime_resolvedConversations_bySystem;
                    totalResolvedConversations = data.skillsMetricsPerAgent.metricsPerSkill[skill].metricsTotals.totalResolvedConversations;
                    
                    avgTime_resolvedConversations = secondsToHms(avgTime_resolvedConversations/1000);
                    avgTime_resolvedConversations_byCCP = secondsToHms(avgTime_resolvedConversations_byCCP/1000);
                    avgTime_resolvedConversations_byConsumer = secondsToHms(avgTime_resolvedConversations_byConsumer/1000);
                    avgTime_resolvedConversations_bySystem = secondsToHms(avgTime_resolvedConversations_bySystem/1000);
                    totalHandlingTime_resolvedConversations = secondsToHms(totalHandlingTime_resolvedConversations/1000);
                    totalHandlingTime_resolvedConversations_byCCP = secondsToHms(totalHandlingTime_resolvedConversations_byCCP/1000);
                    totalHandlingTime_resolvedConversations_byConsumer = secondsToHms(totalHandlingTime_resolvedConversations_byConsumer/1000);
                    totalHandlingTime_resolvedConversations_bySystem = secondsToHms(totalHandlingTime_resolvedConversations_bySystem/1000);

                    oTable.row.add([skillId, agentId, totalResolvedConversations, resolvedConversations_byCCP, resolvedConversations_byConsumer, resolvedConversations_bySystem, avgTime_resolvedConversations, avgTime_resolvedConversations_byCCP, avgTime_resolvedConversations_byConsumer, avgTime_resolvedConversations_bySystem,totalHandlingTime_resolvedConversations, totalHandlingTime_resolvedConversations_byCCP, totalHandlingTime_resolvedConversations_byConsumer, totalHandlingTime_resolvedConversations_bySystem]).draw();
                }
            }
        }
        if (data.skillsMetricsPerAgent.hasOwnProperty("metricsTotals")) {
            skillId = "All";
            agentId = "All";
            avgTime_resolvedConversations = data.skillsMetricsPerAgent.metricsTotals.avgTime_resolvedConversations;
            avgTime_resolvedConversations_byCCP = data.skillsMetricsPerAgent.metricsTotals.avgTime_resolvedConversations_byCCP;
            avgTime_resolvedConversations_byConsumer = data.skillsMetricsPerAgent.metricsTotals.avgTime_resolvedConversations_byConsumer;
            avgTime_resolvedConversations_bySystem = data.skillsMetricsPerAgent.metricsTotals.avgTime_resolvedConversations_bySystem;
            resolvedConversations_byCCP = data.skillsMetricsPerAgent.metricsTotals.resolvedConversations_byCCP;
            resolvedConversations_byConsumer = data.skillsMetricsPerAgent.metricsTotals.resolvedConversations_byConsumer;
            resolvedConversations_bySystem = data.skillsMetricsPerAgent.metricsTotals.resolvedConversations_bySystem;
            totalHandlingTime_resolvedConversations = data.skillsMetricsPerAgent.metricsTotals.totalHandlingTime_resolvedConversations;
            totalHandlingTime_resolvedConversations_byCCP = data.skillsMetricsPerAgent.metricsTotals.totalHandlingTime_resolvedConversations_byCCP;
            totalHandlingTime_resolvedConversations_byConsumer = data.skillsMetricsPerAgent.metricsTotals.totalHandlingTime_resolvedConversations_byConsumer;
            totalHandlingTime_resolvedConversations_bySystem = data.skillsMetricsPerAgent.metricsTotals.totalHandlingTime_resolvedConversations_bySystem;
            totalResolvedConversations = data.skillsMetricsPerAgent.metricsTotals.totalResolvedConversations;
            
            avgTime_resolvedConversations = secondsToHms(avgTime_resolvedConversations/1000);
            avgTime_resolvedConversations_byCCP = secondsToHms(avgTime_resolvedConversations_byCCP/1000);
            avgTime_resolvedConversations_byConsumer = secondsToHms(avgTime_resolvedConversations_byConsumer/1000);
            avgTime_resolvedConversations_bySystem = secondsToHms(avgTime_resolvedConversations_bySystem/1000);
            totalHandlingTime_resolvedConversations = secondsToHms(totalHandlingTime_resolvedConversations/1000);
            totalHandlingTime_resolvedConversations_byCCP = secondsToHms(totalHandlingTime_resolvedConversations_byCCP/1000);
            totalHandlingTime_resolvedConversations_byConsumer = secondsToHms(totalHandlingTime_resolvedConversations_byConsumer/1000);
            totalHandlingTime_resolvedConversations_bySystem = secondsToHms(totalHandlingTime_resolvedConversations_bySystem/1000);

            oTable.row.add([skillId, agentId, totalResolvedConversations, resolvedConversations_byCCP, resolvedConversations_byConsumer, resolvedConversations_bySystem, avgTime_resolvedConversations, avgTime_resolvedConversations_byCCP, avgTime_resolvedConversations_byConsumer, avgTime_resolvedConversations_bySystem,totalHandlingTime_resolvedConversations, totalHandlingTime_resolvedConversations_byCCP, totalHandlingTime_resolvedConversations_byConsumer, totalHandlingTime_resolvedConversations_bySystem]).draw();         
        }
    }
}