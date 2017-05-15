// variables for the oauth settings from the saved settings
var consumerKey;
var consumerSecret;
var token;
var tokenSecret;
var accountNum;
var skillList = null;
var agentList = null;

$(document).ready(function() {
    // check to see if the engagement agent id select menu item has changed
    $("#msgConAgentSelect").change(function() {
        if ($("#msgConAgentSelect").val() == 1 || $("#msgConAgentSelect").val() == 3) {
            // if they select all agents, disable the text area to input specific ids
            $("#msgConagentIDList").prop("disabled", true);
            $("#msgConagentIDList option:selected").prop("selected", false);
        } else {
            // if they select individual agents, enable the text area to input specific ids
            $("#msgConagentIDList").prop("disabled", false);
        }
    });
    $("#msgcsatAgentSelect").change(function() {
        if ($("#msgcsatAgentSelect").val() == 1 || $("#msgcsatAgentSelect").val() == 3) {
            // if they select all agents, disable the text area to input specific ids
            $("#msgcsatagentIDList").prop("disabled", true);
            $("#msgcsatagentIDList option:selected").prop("selected", false);
        } else {
            // if they select individual agents, enable the text area to input specific ids
            $("#msgcsatagentIDList").prop("disabled", false);
        }
    });
    // check to see if the engagement skill id select menu item has changed
    $("#msgConskillSelect").change(function() {
        if ($("#msgConskillSelect").val() == 1 || $("#msgConskillSelect").val() == 3) {
            // if they select all agents, disable the text area to input specific ids
            $("#msgConskillIDList").prop("disabled", true);
            $("#msgConskillIDList option:selected").prop("selected", false);
        } else {
            // if they select individual agents, enable the text area to input specific ids
            $("#msgConskillIDList").prop("disabled", false);
        }
    });
    $("#msgcsatskillSelect").change(function() {
        if ($("#msgcsatskillSelect").val() == 1 || $("#msgcsatskillSelect").val() == 3) {
            // if they select all agents, disable the text area to input specific ids
            $("#msgcsatskillIDList").prop("disabled", true);
            $("#msgcsatskillIDList option:selected").prop("selected", false);
        } else {
            // if they select individual agents, enable the text area to input specific ids
            $("#msgcsatskillIDList").prop("disabled", false);
        }
    });

    $.ajax({
        type: 'GET',
        url: '/skillList',
        success: function(data) {
            skillList = data;
            // Get all of the mutliple select options on the settings page for the skills
            var selectmsgCon = document.getElementById("msgConskillIDList");
            var selectmsgcsat = document.getElementById("msgcsatskillIDList");
            // loop through all of the select boxes and add in all of the available skills that can be selected
            for (var skill in skillList) {
                var optTxt = skillList[skill];
                var opt = skill;
                var el = document.createElement("option");
                el.textContent = optTxt;
                el.value = opt;
                selectmsgCon.appendChild(el);
            }
            for (var skill in skillList) {
                var optTxt = skillList[skill];
                var opt = skill;
                var el = document.createElement("option");
                el.textContent = optTxt;
                el.value = opt;
                selectmsgcsat.appendChild(el);
            }
                $.ajax({
                    type: 'GET',
                    url: '/agentList',
                    success: function(data) {
                        agentList = data;
                        // Get all of the mutliple select options on the settings page for the agents
                        var selectAgents = document.getElementById("msgConagentIDList");
                        var selectAgentsmsgcsat = document.getElementById("msgcsatagentIDList");
                        // loop through all of the select boxes and add in all of the available agents that can be selected
                        for (var agent in agentList) {
                            var optTxt = agentList[agent].fullName;
                            var opt = agent;
                            var el = document.createElement("option");
                            el.textContent = optTxt;
                            el.value = opt;
                            selectAgents.appendChild(el);
                        }
                        for (var agent in agentList) {
                            var optTxt = agentList[agent].fullName;
                            var opt = agent;
                            var el = document.createElement("option");
                            el.textContent = optTxt;
                            el.value = opt;
                            selectAgentsmsgcsat.appendChild(el);
                        }
                        // get the settings that are saved and update the settings on the page accordingly
                        $.post("/getOauthMsg", function(data) {
                            //console.log(data);
                            consumerKey = data.consumer_key;
                            consumerSecret = data.consumer_secret;
                            token = data.token;
                            tokenSecret = data.token_secret;
                            accountNum = data.accountNum;
                            var tmsgcsatRange = data.msgcsatRange;
                            var tmsgConRange = data.msgConRange;
                            var tmsgConskillSelect = data.msgConskillSelect;
                            var tmsgConskillIDList = data.msgConskillIDList;
                            var tmsgcsatskillSelect = data.msgcsatskillSelect;
                            var tmsgcsatskillIDList = data.msgcsatskillIDList;
                            var tmsgConAgentSelect = data.msgConAgentSelect;
                            var tmsgConagentIDList = data.msgConagentIDList;
                            var tmsgcsatAgentSelect = data.msgcsatAgentSelect;
                            var tmsgcsatagentIDList = data.msgcsatagentIDList;
                            $('#accountNum').val(accountNum);
                            $('#consumerKey').val(consumerKey);
                            $('#consumerSecret').val(consumerSecret);
                            $('#accessToken').val(token);
                            $('#accessTokenSecret').val(tokenSecret);
                            $('#msgConRange').val(tmsgConRange);
                            $('#msgcsatRange').val(tmsgcsatRange);
                            $("#msgConskillSelect").val(tmsgConskillSelect);
                            if (tmsgConskillSelect == 2) {
                                $("#msgConskillIDList").prop("disabled", false);
                                var msgConskillIDListArray = tmsgConskillIDList.split(",");
                                for (var i = 0; i < msgConskillIDListArray.length; i++) {
                                    $("#msgConskillIDList option[value='" + msgConskillIDListArray[i] + "']").attr('selected', true);
                                }
                            }
                            $("#msgcsatskillSelect").val(tmsgcsatskillSelect);
                            if (tmsgcsatskillSelect == 2) {
                                $("#msgcsatskillIDList").prop("disabled", false);
                                var msgcsatskillIDListArray = tmsgcsatskillIDList.split(",");
                                for (var i = 0; i < msgcsatskillIDListArray.length; i++) {
                                    $("#msgcsatskillIDList option[value='" + msgcsatskillIDListArray[i] + "']").attr('selected', true);
                                }
                            }
                            $("#msgConAgentSelect").val(tmsgConAgentSelect);
                            if (tmsgConAgentSelect == 2) {
                                $("#msgConagentIDList").prop("disabled", false);
                                var msgConagentIDListArray = tmsgConagentIDList.split(",");
                                for (var i = 0; i < msgConagentIDListArray.length; i++) {
                                    $("#msgConagentIDList option[value='" + msgConagentIDListArray[i] + "']").attr('selected', true);
                                }
                            }
                            $("#msgcsatAgentSelect").val(tmsgcsatAgentSelect);
                            if (tmsgcsatAgentSelect == 2) {
                                $("#msgcsatagentIDList").prop("disabled", false);
                                var msgcsatagentIDListArray = tmsgcsatagentIDList.split(",");
                                for (var i = 0; i < msgcsatagentIDListArray.length; i++) {
                                    $("#msgcsatagentIDList option[value='" + msgcsatagentIDListArray[i] + "']").attr('selected', true);
                                }
                            }
                        });
                    }
                });
        }
    });
});