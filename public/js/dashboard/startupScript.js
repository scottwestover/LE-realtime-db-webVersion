$(function() {
    var completed = false;
    var consumerKey = 0;
    var accountNum = 0;
    var accessToken = 0;
    var consumerSecret = 0;
    var accessTokenSecret = 0;
    getLocalStorageVariablesKeys();

    // Gets the current status of the dashboard starting up and updates the html on the page with the status
    var refreshIntervalId = setInterval(function() {
        $.ajax({
            type: 'GET',
            url: '/startupStatus',
            success: function(data) {
                $('#statusDiv').html(JSON.stringify(data));
            }
        });
    }, 3000);

    // calls the LiveEngage APIs with the api keys from the browser storage and redirects to the main dashboard if it is successful
    $.ajax({
        type: 'GET',
        url: '/startup?cKey=' + consumerKey + '&accNum=' + accountNum + '&cSec=' + consumerSecret + '&tok=' + accessToken + '&tSec=' + accessTokenSecret,
        success: function(data) {
            $('#statusDiv').html("Completed");
            completed = true;
            clearInterval(refreshIntervalId);
            if (data.Fail != "undefined" && data.Fail != "404") {
                //console.log(data);
                setTimeout(function() {
                    var sel = 'div[role="main"]';
                    angular.element(sel).scope().add(data.users, data.skills, data.groups);
                    angular.element(sel).scope().changeURL();
                }, 100);
            } else {
                //window.location.href = "/error";
                $('#myModal').modal('show');
                $('#errorDetails').html(JSON.stringify(data.Error));
            }
        }
    });

    /**
     * @desc gets the api settings from the browser local storage
     * @return undefined
     */
    function getLocalStorageVariablesKeys() {
        // Check browser support
        if (typeof(Storage) !== "undefined") {
            consumerKey = localStorage.getItem("consumerKey");
            accountNum = localStorage.getItem("accountNum");
            consumerSecret = localStorage.getItem("consumerSecret");
            accessToken = localStorage.getItem("accessToken");
            accessTokenSecret = localStorage.getItem("accessTokenSecret");
        } else {
            console.log("Sorry, your browser does not support Web Storage...");
        }
        return;
    }
});