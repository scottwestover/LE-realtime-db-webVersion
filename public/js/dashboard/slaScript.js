$(document).ready(function() {
    setupTables();
    getData();
});

/**
 * @desc calls the current queue state api
 * @return undefined
 */
function getData() {
    var oTable = $('#example').DataTable();
    $.ajax({
        type: 'GET',
        url: '/sla',
        success: function(data) {
            if (data.Fail != "undefined" && data.Fail != "404") {
                updateSLAData(data);
            } else {
                window.location.href = "/error";
            }
        }
    });
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