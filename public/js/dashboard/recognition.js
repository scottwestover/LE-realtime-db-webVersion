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
    // variable for lowest handling time
    var fastTime = null;
    // variable for lowest handling time agent name
    var fastTimeName = "";
    // variable for lowest handling time agent pic
    var fastTimeAgentPic = "";
    // variable for most chats
    var mostChats = 0;
    // variable for agent name
    var mostChatsAgentName = "";
    // variable for agent pic
    var mostChatsAgentPic = "";
    //variable for the list of agents
    var agentList = null;
    //document ready
    $(document).ready(function() {
        //hide the data table
        $('#hiddenTablePanel1').hide();
        setTimeout(function() {
            var sel = 'div[role="main"]';
            agentList = angular.element(sel).scope().listUsers();
            getData();
        }, 100);
    });
    //populates the data table by calling the Real Time API
    function getData() {
        var oTable2 = $('#example2').DataTable();
        $.ajax({
            type: 'GET',
               url: '/engagementActivity?cKey=' + consumerKey + '&accNum=' + accountNum + '&cSec=' + consumerSecret + '&tok=' + accessToken + '&tSec=' + accessTokenSecret+'&skill='+easkillIDList+'&skS='+easkillSelect+'&agent='+eaagentIDList+'&agS'+eaAgentSelect+'&range='+engagementActivityRange,
            success: function(data) {
                if(data.Fail != "undefined" && data.Fail != "404"){
                    oTable2
                    .clear()
                    .draw();
                    // data that is available 
                    var agentId;
                    var agentPicId;
                    var totalInteractiveChats;
                    var totalNonInteractiveChats;
                    var totalHandlingTime;
                    var nonInteractiveTotalHandlingTime;
                    var connectedEngagements;
                    // agent metrics table
                    if (data.hasOwnProperty('agentsMetrics')) {
                        $('#table2').show();
                        for (var agent in data.agentsMetrics.metricsPerAgent) {
                            agentPicId = 'agentImages/'+agent+'.png';
                            if (agentList.hasOwnProperty(agent)) {
                             agentId = agentList[agent].nickname;
                         } else {
                            agentId = agent;
                        }
                        totalInteractiveChats = data.agentsMetrics.metricsPerAgent[agent].totalInteractiveChats;
                        totalNonInteractiveChats = data.agentsMetrics.metricsPerAgent[agent].totalNonInteractiveChats;
                        totalHandlingTime = data.agentsMetrics.metricsPerAgent[agent].totalHandlingTime;
                        nonInteractiveTotalHandlingTime = data.agentsMetrics.metricsPerAgent[agent].nonInteractiveTotalHandlingTime;
                        connectedEngagements = data.agentsMetrics.metricsPerAgent[agent].connectedEngagements;
                            // add to data table
                            oTable2.row.add([agentId, totalInteractiveChats, totalNonInteractiveChats, totalHandlingTime, nonInteractiveTotalHandlingTime, connectedEngagements]).draw();
                            if (totalInteractiveChats > mostChats) {
                                mostChats = totalInteractiveChats;
                                mostChatsAgentName = agentId;
                                mostChatsAgentPic = agentPicId;
                            }
                            if (fastTime == null) {
                                fastTime = totalHandlingTime / totalInteractiveChats;
                                if(isNaN(fastTime)){
                                    fastTime = null;
                                }
                                else {
                                    fastTimeName = agentId;
                                    fastTimeAgentPic = agentPicId;
                                }
                            } else {
                                if ((totalHandlingTime / totalInteractiveChats) < fastTime) {
                                    fastTime = totalHandlingTime / totalInteractiveChats;
                                    fastTimeName = agentId;
                                    fastTimeAgentPic = agentPicId;
                                }
                            }
                        }
                        // totals for all agents
                        agentId = "All";
                        totalInteractiveChats = data.agentsMetrics.metricsTotals.totalInteractiveChats;
                        totalNonInteractiveChats = data.agentsMetrics.metricsTotals.totalNonInteractiveChats;
                        totalHandlingTime = data.agentsMetrics.metricsTotals.totalHandlingTime;
                        nonInteractiveTotalHandlingTime = data.agentsMetrics.metricsTotals.nonInteractiveTotalHandlingTime;
                        connectedEngagements = data.agentsMetrics.metricsTotals.connectedEngagements;
                        // add to data table
                        oTable2.row.add([agentId, totalInteractiveChats, totalNonInteractiveChats, totalHandlingTime, nonInteractiveTotalHandlingTime, connectedEngagements]).draw();
                    }
                    $('#mostchatsname').html(mostChatsAgentName);
                    $('#mostchatstotal').html(mostChats);
                    $('#mostchatsname2').html(fastTimeName);
                    $('#mostchatstotal2').html(secondsToHms(Math.round(fastTime)));
                    $('#lowestPic').attr("src", fastTimeAgentPic);
                    $('#lowestPic').attr("onError", "this.onerror=null;this.src='images/user.png';");
                    $('#interactivePic').attr("src", mostChatsAgentPic);
                    $('#interactivePic').attr("onError", "this.onerror=null;this.src='images/user.png';");
               }
                else {
                    //window.location.href = "/error";
                    $('#myModal').modal('show');
                    $('#errorDetails').html(JSON.stringify(data.Error));
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