// variables that are used for pulling the api information from the browser storage
var consumerKey = 0;
var accountNum = 0;
var consumerSecret = 0;
var accessToken = 0;
var accessTokenSecret = 0;
var slaskillIDList = null;
var slaRange = null;
var workDayStart = null;
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
        url: '/sla?cKey=' + consumerKey + '&accNum=' + accountNum + '&cSec=' + consumerSecret + '&tok=' + accessToken + '&tSec=' + accessTokenSecret + '&skill=' + slaskillIDList + '&range=' + slaRange + '&dayStart=' + workDayStart,
        success: function(data) {
            if (data.Fail != "undefined" && data.Fail != "404") {
                updateSLAData(data);
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
        slaskillIDList = localStorage.getItem("slaskillIDList");
        slaRange = localStorage.getItem("slaRange");
        workDayStart = localStorage.getItem("workDayStart");
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
 * @desc updates the data table and the sla dashboard with the data from the sla api
 * @param data - JSON Object that is returned from the sla API
 * @return undefined
 */
function updateSLAData(data) {
    var oTable = $('#example').DataTable();
    oTable
        .clear()
        .draw();
    var secondsBucket = 0;
    var accumulated = 0;
    var chats = 0;
    var percentageFromTotal = 0;
    if (data.hasOwnProperty("slaDataRange")) {
        for (var bucket in data.slaDataRange) {
            secondsBucket = bucket;
            accumulated = (data.slaDataRange[bucket].accumulated * 100).toFixed(0) + "%";
            chats = data.slaDataRange[bucket].chats;
            percentageFromTotal = (data.slaDataRange[bucket].percentageFromTotal* 100).toFixed(0) + "%";
            oTable.row.add([secondsBucket, chats, percentageFromTotal, accumulated]).draw();
        }
    }
}