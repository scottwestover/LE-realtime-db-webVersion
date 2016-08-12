// variables for the oauth settings from the saved settings
var skillList = null;
var agentList = null;

$(document).ready(function() {
    setTimeout(function() {
        var sel = 'div[role="main"]';
        skillList = angular.element(sel).scope().listSkills();
        agentList = angular.element(sel).scope().listUsers();
        // Get all of the mutliple select options on the settings page for the skills
        var select = document.getElementById("skillIDListAA");
        var selectQueueHealth = document.getElementById("skillIDList");
        var selectEngagementActivity = document.getElementById("easkillIDList");
        var selectCurrentQueueState = document.getElementById("CQskillIDList");
        // loop through all of the select boxes and add in all of the available skills that can be selected
        for(var skill in skillList){
            var optTxt = skillList[skill];
            var opt = skill;
            var el = document.createElement("option");
            el.textContent = optTxt;
            el.value = opt;
            selectQueueHealth.appendChild(el);
        }
        for(var skill in skillList){
            var optTxt = skillList[skill];
            var opt = skill;
            var el = document.createElement("option");
            el.textContent = optTxt;
            el.value = opt;
            select.appendChild(el);
        }
        for(var skill in skillList){
            var optTxt = skillList[skill];
            var opt = skill;
            var el = document.createElement("option");
            el.textContent = optTxt;
            el.value = opt;
            selectEngagementActivity.appendChild(el);
        }
        for(var skill in skillList){
            var optTxt = skillList[skill];
            var opt = skill;
            var el = document.createElement("option");
            el.textContent = optTxt;
            el.value = opt;
            selectCurrentQueueState.appendChild(el);
        }
        var selectAgents = document.getElementById("eaagentIDList");
        // loop through all of the select boxes and add in all of the available agents that can be selected
        for(var agent in agentList){
            var optTxt = agentList[agent].fullName;
            var opt = agent;
            var el = document.createElement("option");
            el.textContent = optTxt;
            el.value = opt;
            selectAgents.appendChild(el);
        }
        updateFormAgentValues();
        updateFormSkillValues();
    }, 100);

    updateFormValues();
    getStorageVales();
});

/**
  * @desc saves the api settings to the browser local storage
  * @return undefined
*/
function storeValues() {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        // Store
        localStorage.setItem("consumerKey", document.getElementById("consumerKey").value);
        localStorage.setItem("consumerSecret", document.getElementById("consumerSecret").value);
        localStorage.setItem("accessToken", document.getElementById("accessToken").value);
        localStorage.setItem("accessTokenSecret", document.getElementById("accessTokenSecret").value);
        localStorage.setItem("accountNum", document.getElementById("accountNum").value);
        localStorage.setItem("skillSelect", document.getElementById("skillSelect").value);
        localStorage.setItem("skillIDList", $('#skillIDList').val());
        localStorage.setItem("easkillSelect", document.getElementById("easkillSelect").value);
        localStorage.setItem("eaAgentSelect", document.getElementById("eaAgentSelect").value);
        localStorage.setItem("easkillIDList", $('#easkillIDList').val());
        localStorage.setItem("eaagentIDList", $('#eaagentIDList').val());
        localStorage.setItem("sla", document.getElementById("sla").value);
        localStorage.setItem("skillSelectAA", document.getElementById("skillSelectAA").value);
        localStorage.setItem("skillIDListAA", $('#skillIDListAA').val());
        localStorage.setItem("CQskillSelect", document.getElementById("CQskillSelect").value);
        localStorage.setItem("CQskillIDList", $('#CQskillIDList').val());
        localStorage.setItem("agentActivityRange", document.getElementById("agentActivityRange").value);
        localStorage.setItem("queueHealthRange", document.getElementById("queueHealthRange").value);
        localStorage.setItem("engagementActivityRange", document.getElementById("engagementActivityRange").value);
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }
    window.location.href = "/";
    return;
}

/**
  * @desc gets the api settings from the browser local storage and updates the settings on the page
  * @return undefined
*/
function getStorageVales() {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        if(localStorage.getItem("consumerKey") != null){
            $('#consumerKey').val(localStorage.getItem("consumerKey"));
        }
        if(localStorage.getItem("accountNum") != null){
            $('#accountNum').val(localStorage.getItem("accountNum"));
        }
        if(localStorage.getItem("consumerSecret") != null){
            $('#consumerSecret').val(localStorage.getItem("consumerSecret"));
        }
        if(localStorage.getItem("accessToken") != null){
            $('#accessToken').val(localStorage.getItem("accessToken"));
        }
        if(localStorage.getItem("accessTokenSecret") != null){
            $('#accessTokenSecret').val(localStorage.getItem("accessTokenSecret"));
        }
        if(localStorage.getItem("sla") != null){
            $('#sla').val(localStorage.getItem("sla"));
        }
        if(localStorage.getItem("agentActivityRange") != null){
            $("#agentActivityRange").val(localStorage.getItem("agentActivityRange"));
        }
        if(localStorage.getItem("queueHealthRange") != null){
            $("#queueHealthRange").val(localStorage.getItem("queueHealthRange"));
        }
        if(localStorage.getItem("engagementActivityRange") != null){
            $("#engagementActivityRange").val(localStorage.getItem("engagementActivityRange"));
        }
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }
    return;
}

/**
  * @desc detects any changes drop down menus and then enables/disables the corresponding skill id and agent select menus
  * @return undefined
*/
function updateFormValues() {
    // check to see if the engagement agent id select menu item has changed
    $("#eaAgentSelect").change(function() {
        if ($("#eaAgentSelect").val() == 1 || $("#eaAgentSelect").val() == 3) {
            // if they select all agents, disable the text area to input specific ids
            $("#eaagentIDList").prop("disabled", true);
            $("#eaagentIDList option:selected").prop("selected", false);
        } else {
            // if they select individual agents, enable the text area to input specific ids
            $("#eaagentIDList").prop("disabled", false);
        }
    });
    // check to see if the engagement skill id select menu item has changed
    $("#easkillSelect").change(function() {
        if ($("#easkillSelect").val() == 1 || $("#easkillSelect").val() == 3) {
            // if they select all agents, disable the text area to input specific ids
            $("#easkillIDList").prop("disabled", true);
            $("#easkillIDList option:selected").prop("selected", false);
        } else {
            // if they select individual agents, enable the text area to input specific ids
            $("#easkillIDList").prop("disabled", false);
        }
    });
    // check to see if the skill id select menu item has changed
    $("#CQskillSelect").change(function() {
        if ($("#CQskillSelect").val() == 1) {
            // if they select all skills, disable the text area to input specific ids
            $("#CQskillIDList").prop("disabled", true);
            $("#CQskillIDList option:selected").prop("selected", false);
        } else {
            // if they select individual agents, enable the text area to input specific ids
            $("#CQskillIDList").prop("disabled", false);
        }
    });
    // check to see if the skill id select menu item has changed
    $("#skillSelect").change(function() {
        if ($("#skillSelect").val() == 1) {
            // if they select all skills, disable the text area to input specific ids
            $("#skillIDList").prop("disabled", true);
            $("#skillIDList option:selected").prop("selected", false);
        } else {
            // if they select individual agents, enable the text area to input specific ids
            $("#skillIDList").prop("disabled", false);
        }
    });
    // check to see if the skill id select menu item has changed for agent activity
    $("#skillSelectAA").change(function() {
        if ($("#skillSelectAA").val() == 1) {
            // if they select all skills, disable the text area to input specific ids
            $("#skillIDListAA").prop("disabled", true);
            $("#skillIDListAA option:selected").prop("selected", false);
        } else {
            // if they select individual agents, enable the text area to input specific ids
            $("#skillIDListAA").prop("disabled", false);
        }
    });
    return;
}

/**
  * @desc updates the selected agents from the select input menu that where saved in the browser storage
  * @return undefined
*/
function updateFormAgentValues() {
    if (typeof(Storage) !== "undefined") {
        if(localStorage.getItem("eaAgentSelect") != null){
            $('#eaAgentSelect').val(localStorage.getItem("eaAgentSelect"));
        }
        if (localStorage.getItem("eaAgentSelect") == 2) {
            $("#eaagentIDList").prop("disabled", false);
            var eaagentIDListArray = localStorage.getItem("eaagentIDList").split(",");
            for(var i = 0; i < eaagentIDListArray.length; i++){
                $("#eaagentIDList option[value='" + eaagentIDListArray[i]+ "']").attr('selected', true);
            }
        }
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }
    return;
}

/**
  * @desc updates the selected skills from the select input menu that where saved in the browser storage
  * @return undefined
*/
function updateFormSkillValues() {
    if (typeof(Storage) !== "undefined") {
        if(localStorage.getItem("skillSelect") != null){
            $("#skillSelect").val(localStorage.getItem("skillSelect"));
        }
        if (localStorage.getItem("skillSelect") == 2) {
            $("#skillIDList").prop("disabled", false);
            var skillIDListArray = localStorage.getItem("skillIDList").split(",");
            for(var i = 0; i < skillIDListArray.length; i++){
                $("#skillIDList option[value='" + skillIDListArray[i]+ "']").attr('selected', true);
            }
        }
        if(localStorage.getItem("CQskillSelect") != null){
            $("#CQskillSelect").val(localStorage.getItem("CQskillSelect"));
        }
        if (localStorage.getItem("CQskillSelect") == 2) {
            $("#CQskillIDList").prop("disabled", false);
            var CQskillIDListArray = localStorage.getItem("CQskillIDList").split(",");
            for(var i = 0; i < CQskillIDListArray.length; i++){
                $("#CQskillIDList option[value='" + CQskillIDListArray[i]+ "']").attr('selected', true);
            }
        }
        if(localStorage.getItem("skillSelectAA") != null){
            $("#skillSelectAA").val(localStorage.getItem("skillSelectAA"));
        }
        if (localStorage.getItem("skillSelectAA") == 2) {
            $("#skillIDListAA").prop("disabled", false);
            var skillIDListAAArray = localStorage.getItem("skillIDListAA").split(",");
            for(var i = 0; i < skillIDListAAArray.length; i++){
                $("#skillIDListAA option[value='" + skillIDListAAArray[i]+ "']").attr('selected', true);
            }
        }
        if(localStorage.getItem("easkillSelect") != null){
            $("#easkillSelect").val(localStorage.getItem("easkillSelect"));
        }
        if (localStorage.getItem("easkillSelect") == 2) {
            $("#easkillIDList").prop("disabled", false);
            var easkillIDListArray = localStorage.getItem("easkillIDList").split(",");
            for(var i = 0; i < easkillIDListArray.length; i++){
                $("#easkillIDList option[value='" + easkillIDListArray[i]+ "']").attr('selected', true);
            }
        }
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }
    return;
}