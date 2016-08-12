
    var consumerKey = 0;
    var accountNum = 0;
    var consumerSecret = 0;
    var accessToken = 0;
    var accessTokenSecret = 0;
    var queueHealthRange = 0;
    var skillIDList = null;
    var sla = null;
    getLocalStorageVariables();
    //variable for the list of skills
    var skillList = null;
    $(document).ready(function() {
        $('#lineChart').hide();
        $('#lineChart2').hide();
        $('#example').DataTable({
            "initComplete": function(settings) {
                /* Apply the tooltips */
                $('#example thead th[title]').tooltip({
                    "container": 'body'
                });
            },
            "aoColumnDefs": [{
                "sClass": "breakAll",
                "aTargets": [0]
                }
            ],
             dom: 'Blfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'print'
            ],
            aLengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
            ]
        });
        setTimeout(function() {
            var sel = 'div[role="main"]';
            skillList = angular.element(sel).scope().listSkills();
            getData();
        }, 100);
    });

    function getData() {
        var oTable = $('#example').DataTable();
        $.ajax({
            type: 'GET',
            url: '/queueHealth?cKey=' + consumerKey + '&accNum=' + accountNum + '&cSec=' + consumerSecret + '&tok=' + accessToken + '&tSec=' + accessTokenSecret + '&qaR='+queueHealthRange + '&skillList='+skillIDList,
            success: function(data) {
                //console.log(data);
                if(data.Fail != "undefined" && data.Fail != "404"){
                    oTable
                        .clear()
                        .draw();
                    // metric totals for all skills that were included in the call
                    var skillID = "All";
                    var avgTimeToAbandon = secondsToHms(data.metricsTotals.avgTimeToAbandon);
                    var totalTimeToAnswer = secondsToHms(data.metricsTotals.totalTimeToAnswer);
                    var totalTimeToAbandon = secondsToHms(data.metricsTotals.totalTimeToAbandon);
                    var enteredQEng = data.metricsTotals.enteredQEng;
                    var avgTimeToAnswer = data.metricsTotals.avgTimeToAnswer;
                    var slaCheck = "<font color='green'>Pass</font>";
                    if (avgTimeToAnswer > parseInt(sla)) {
                        slaCheck = "<font color='red'>Fail</font>";
                    }
                    avgTimeToAnswer = secondsToHms(avgTimeToAnswer);
                    var abandonmentRate = (data.metricsTotals.abandonmentRate * 100).toFixed(0)+"%";
                    var abandonedEng = data.metricsTotals.abandonedEng;
                    var connectedEng = data.metricsTotals.connectedEng;
                    // Update 7/8/16 - Added new queue size information
                    var maxQueueSize = data.metricsTotals.maxQueueSize;
                    var minQueueSize = data.metricsTotals.minQueueSize;
                    var averageQueueSize = (data.metricsTotals.averageQueueSize).toFixed(2);
                    var currentQueueSize = data.metricsTotals.currentQueueSize;
                    var queueSizeSum = data.metricsTotals.queueSizeSum;
                    var queueSizeCount = data.metricsTotals.queueSizeCount;
                    var currentAvailableSlots = data.metricsTotals.currentAvailableSlots;
                    var maxAvailableSlots = data.metricsTotals.maxAvailableSlots;
                    var minAvailableSlots = data.metricsTotals.minAvailableSlots;
                    var averageAvailableSlots = (data.metricsTotals.averageAvailableSlots).toFixed(2);
                    var availableSlotsSum = data.metricsTotals.availableSlotsSum;
                    var availableSlotsCount = data.metricsTotals.availableSlotsCount;
                    oTable.row.add([skillID, avgTimeToAnswer, slaCheck, totalTimeToAnswer, avgTimeToAbandon, totalTimeToAbandon, abandonmentRate, enteredQEng, abandonedEng, connectedEng, maxQueueSize, minQueueSize, averageQueueSize, currentQueueSize, queueSizeSum, queueSizeCount, currentAvailableSlots, maxAvailableSlots, minAvailableSlots, averageAvailableSlots, availableSlotsSum, availableSlotsCount]).draw();
                    // metric totals for each skill group
                    if (data.hasOwnProperty('skillsMetrics')) {
                        for (var skill in data.skillsMetrics) {
                            // data available for each skill
                            if (skillList.hasOwnProperty(skill)) {
                                skillID = skillList[skill];
                            } else {
                                if (skill == -1) {
                                    skillID = "Unassigned"
                                } else {
                                    skillID = skill;
                                }
                            }
                            avgTimeToAbandon = secondsToHms(data.skillsMetrics[skill].avgTimeToAbandon);
                            totalTimeToAnswer = secondsToHms(data.skillsMetrics[skill].totalTimeToAnswer);
                            totalTimeToAbandon = secondsToHms(data.skillsMetrics[skill].totalTimeToAbandon);
                            enteredQEng = data.skillsMetrics[skill].enteredQEng;
                            avgTimeToAnswer = data.skillsMetrics[skill].avgTimeToAnswer;
                            if (avgTimeToAnswer > parseInt(sla)) {
                                slaCheck = "<font color='red'>Fail</font>";
                            } else {
                                slaCheck = "<font color='green'>Pass</font>";
                            }
                            avgTimeToAnswer = secondsToHms(avgTimeToAnswer);
                            abandonmentRate = (data.skillsMetrics[skill].abandonmentRate*100).toFixed(0)+"%";
                            abandonedEng = data.skillsMetrics[skill].abandonedEng;
                            connectedEng = data.skillsMetrics[skill].connectedEng;
                            maxQueueSize = data.skillsMetrics[skill].maxQueueSize;
                            minQueueSize = data.skillsMetrics[skill].minQueueSize;
                            averageQueueSize = (data.skillsMetrics[skill].averageQueueSize).toFixed(2);
                            currentQueueSize = data.skillsMetrics[skill].currentQueueSize;
                            queueSizeSum = data.skillsMetrics[skill].queueSizeSum;
                            queueSizeCount = data.skillsMetrics[skill].queueSizeCount;
                            currentAvailableSlots = data.skillsMetrics[skill].currentAvailableSlots;
                            maxAvailableSlots = data.skillsMetrics[skill].maxAvailableSlots;
                            minAvailableSlots = data.skillsMetrics[skill].minAvailableSlots;
                            averageAvailableSlots = (data.skillsMetrics[skill].averageAvailableSlots).toFixed(2);
                            availableSlotsSum = data.skillsMetrics[skill].availableSlotsSum;
                            availableSlotsCount = data.skillsMetrics[skill].availableSlotsCount;
                            oTable.row.add([skillID, avgTimeToAnswer, slaCheck, totalTimeToAnswer, avgTimeToAbandon, totalTimeToAbandon, abandonmentRate, enteredQEng, abandonedEng, connectedEng, maxQueueSize, minQueueSize, averageQueueSize, currentQueueSize, queueSizeSum, queueSizeCount, currentAvailableSlots, maxAvailableSlots, minAvailableSlots, averageAvailableSlots, availableSlotsSum, availableSlotsCount]).draw();
                        }
                    }
                }
                 else {
                    window.location.href = "/error";
                }
            }
        });
    }
function getLocalStorageVariables() {
      // Check browser support
      if (typeof(Storage) !== "undefined") {
         consumerKey = localStorage.getItem("consumerKey");
         accountNum = localStorage.getItem("accountNum");
         consumerSecret = localStorage.getItem("consumerSecret");
         accessToken = localStorage.getItem("accessToken");
         accessTokenSecret = localStorage.getItem("accessTokenSecret");
         queueHealthRange = localStorage.getItem("queueHealthRange");
         skillIDList = localStorage.getItem("skillIDList");
         sla = localStorage.getItem("sla");
      } else {
         console.log("Sorry, your browser does not support Web Storage...");
      }
      return;
   }