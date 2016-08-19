// variables that are used for pulling the api information from the browser storage
var consumerKey = 0;
var accountNum = 0;
var consumerSecret = 0;
var accessToken = 0;
var accessTokenSecret = 0;
var CQskillIDList = null;
getLocalStorageVariables();

//variable for the list of skills
var skillList = null;

$(document).ready(function() {
    setupTables();
    setTimeout(function() {
        var sel = 'div[role="main"]';
        skillList = angular.element(sel).scope().listSkills();
        getData();
    }, 100);
});

/**
 * @desc calls the current queue state api
 * @return undefined
 */
function getData() {
    var oTable = $('#example').DataTable();
    $.ajax({
        type: 'GET',
        url: '/currentQueueState?cKey=' + consumerKey + '&accNum=' + accountNum + '&cSec=' + consumerSecret + '&tok=' + accessToken + '&tSec=' + accessTokenSecret + '&skill=' + CQskillIDList,
        success: function(data) {
            if (data.Fail != "undefined" && data.Fail != "404") {
                updateCurrentQueueData(data);
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
        CQskillIDList = localStorage.getItem("CQskillIDList");
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
}

/**
 * @desc updates the data table and the current queue dashboard with the data from the current queue api
 * @param data - JSON Object that is returned from the current queue API
 * @return undefined
 */
function updateCurrentQueueData(data) {
    var oTable = $('#example').DataTable();
    oTable
        .clear()
        .draw();
    var skillId = "";
    var currentQueueSize = 0;
    var currentAvailableSlots = 0;
    if (data.hasOwnProperty("skills")) {
        for (var skill in data.skills) {
            // data available for each skill
            if (skillList.hasOwnProperty(skill)) {
                skillId = skillList[skill];
            } else {
                if (skill == -1) {
                    skillId = "Unassigned"
                } else {
                    skillId = skill;
                }
            }
            currentQueueSize = data.skills[skill].currentQueueSize;
            currentAvailableSlots = data.skills[skill].currentAvailableSlots;
            if (currentQueueSize == -1) {
                currentQueueSize = "No Data";
                currentAvailableSlots = "No Data";
            }
            oTable.row.add([skillId, currentAvailableSlots, currentQueueSize]).draw();
        }
    }
    if (data.hasOwnProperty("totals")) {
        skillId = "All";
        currentQueueSize = data.totals.currentQueueSize;
        currentAvailableSlots = data.totals.currentAvailableSlots;
        if (currentQueueSize == -1) {
            currentQueueSize = "No Data";
            currentAvailableSlots = "No Data";
        }
        oTable.row.add([skillId, currentAvailableSlots, currentQueueSize]).draw();
    }
}