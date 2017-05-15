// variables for the oauth settings from the saved settings
var consumerKey;
var consumerSecret;
var token;
var tokenSecret;
var accountNum;
var skillList = null;
var agentList = null;
var groupList = null;
var agentGroups = {};

$(document).ready(function() {
    // check to see fi the agent group select menu has changed
    $("#agentGroupSelect").change(function() {
        $('#eaAgentSelect').val(2);
        $('#slaskillSelect').val(2);
        $('#CQskillSelect').val(2);
        $('#easkillSelect').val(2);
        $('#skillSelect').val(2);
        $('#skillSelectAA').val(2);

        $("#eaagentIDList").prop("disabled", false);
        $("#eaagentIDList option:selected").prop("selected", false);
        for(var i = 0; i < agentGroups[$("#agentGroupSelect").val()].agents.length; i++){
            $("#eaagentIDList option[value='" + agentGroups[$("#agentGroupSelect").val()].agents[i]+ "']").attr('selected', true);
        }
        $("#slaskillIDList").prop("disabled", false);
        $("#slaskillIDList option:selected").prop("selected", false);
        for(var i = 0; i < agentGroups[$("#agentGroupSelect").val()].skills.length; i++){
            $("#slaskillIDList option[value='" + agentGroups[$("#agentGroupSelect").val()].skills[i]+ "']").attr('selected', true);
        }
        $("#CQskillIDList").prop("disabled", false);
        $("#CQskillIDList option:selected").prop("selected", false);
        for(var i = 0; i < agentGroups[$("#agentGroupSelect").val()].skills.length; i++){
            $("#CQskillIDList option[value='" + agentGroups[$("#agentGroupSelect").val()].skills[i]+ "']").attr('selected', true);
        }
        $("#easkillIDList").prop("disabled", false);
        $("#easkillIDList option:selected").prop("selected", false);
        for(var i = 0; i < agentGroups[$("#agentGroupSelect").val()].skills.length; i++){
            $("#easkillIDList option[value='" + agentGroups[$("#agentGroupSelect").val()].skills[i]+ "']").attr('selected', true);
        }
        $("#skillIDList").prop("disabled", false);
        $("#skillIDList option:selected").prop("selected", false);
        for(var i = 0; i < agentGroups[$("#agentGroupSelect").val()].skills.length; i++){
            $("#skillIDList option[value='" + agentGroups[$("#agentGroupSelect").val()].skills[i]+ "']").attr('selected', true);
        }
        $("#skillIDListAA").prop("disabled", false);
        $("#skillIDListAA option:selected").prop("selected", false);
        for(var i = 0; i < agentGroups[$("#agentGroupSelect").val()].skills.length; i++){
            $("#skillIDListAA option[value='" + agentGroups[$("#agentGroupSelect").val()].skills[i]+ "']").attr('selected', true);
        }

    });
    // check to see if the engagement agent id select menu item has changed
    $("#eaAgentSelect").change(function() {
        if ($("#eaAgentSelect").val() == 1 || $("#eaAgentSelect").val() == 3) {
            // if they select all agents, disable the text area to input specific ids
            $("#eaagentIDList").prop("disabled", true);
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
        } else {
            // if they select individual agents, enable the text area to input specific ids
            $("#easkillIDList").prop("disabled", false);
        }
    });
    // check to see if the agent id select menu item has changed
    $("#agentSelect").change(function() {
        if ($("#agentSelect").val() == 1) {
            // if they select all agents, disable the text area to input specific ids
            $("#agentIDList").prop("disabled", true);
        } else {
            // if they select individual agents, enable the text area to input specific ids
            $("#agentIDList").prop("disabled", false);
        }
    });
    // check to see if the skill id select menu item has changed
    $("#CQskillSelect").change(function() {
        if ($("#CQskillSelect").val() == 1) {
            // if they select all skills, disable the text area to input specific ids
            $("#CQskillIDList").prop("disabled", true);
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
        } else {
            // if they select individual agents, enable the text area to input specific ids
            $("#skillIDListAA").prop("disabled", false);
        }
    });
    $("#slaskillSelect").change(function() {
        if ($("#slaskillSelect").val() == 1) {
            // if they select all skills, disable the text area to input specific ids
            $("#slaskillIDList").prop("disabled", true);
            $("#slaskillIDList option:selected").prop("selected", false);
        } else {
            // if they select individual agents, enable the text area to input specific ids
            $("#slaskillIDList").prop("disabled", false);
        }
    });

    $.ajax({
        type: 'GET',
        url: '/agentGroupList',
        success: function(data) {
            groupList = data;
            // Get all of the mutliple select options on the settings page for the skills
            var select = document.getElementById("agentGroupSelect");
            // loop through all of the select boxes and add in all of the available skills that can be selected
            for(var group in groupList){
                var optTxt = groupList[group];
                var opt = group;
                var el = document.createElement("option");
                el.textContent = optTxt;
                el.value = opt;
                select.appendChild(el);
            }
        }
    });

    $.ajax({
        type: 'GET',
        url: '/skillList',
        success: function(data) {
            skillList = data;
            // Get all of the mutliple select options on the settings page for the skills
            var select = document.getElementById("skillIDListAA");
            var selectQueueHealth = document.getElementById("skillIDList");
            var selectEngagementActivity = document.getElementById("easkillIDList");
            var selectCurrentQueueState = document.getElementById("CQskillIDList");
            var selectSLA = document.getElementById("slaskillIDList");
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
            for (var skill in skillList) {
                var optTxt = skillList[skill];
                var opt = skill;
                var el = document.createElement("option");
                el.textContent = optTxt;
                el.value = opt;
                selectSLA.appendChild(el);
            }
                $.ajax({
                    type: 'GET',
                    url: '/agentList',
                    success: function(data) {
                        agentList = data;
                        loopData();
                        // Get all of the mutliple select options on the settings page for the agents
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
                        // get the settings that are saved and update the settings on the page accordingly
                        $.post("/getOauth", function(data) {
                            //console.log(data);
                            consumerKey = data.consumer_key;
                            consumerSecret = data.consumer_secret;
                            token = data.token;
                            tokenSecret = data.token_secret;
                            accountNum = data.accountNum;
                            var intervalCheck = data.intervalCheck;
                            var agentSelect = data.agentSelect;
                            var skillSelect = data.skillSelect;
                            var CQskillSelect = data.CQskillSelect;
                            var skillSelectAA = data.skillSelectAA;
                            var skillIDListAA = data.skillIDListAA;
                            var skillIDList = data.skillIDList;
                            var eaAgentSelect = data.eaAgentSelect;
                            var easkillSelect = data.easkillSelect;
                            var easkillIDList = data.easkillIDList;
                            var eaagentIDList = data.eaagentIDList;
                            var CQskillIDList = data.CQskillIDList;
                            var agentActivityRange = data.aarange;
                            var queueHealthRange = data.qarange;
                            var engagementActivityRange = data.earange;
                            var slaRange = data.slaRange;
                            var slaskillSelect = data.slaskillSelect;
                            var slaskillIDList = data.slaskillIDList;
                            var slatime = data.sla;
                            $("#slaRange").val(slaRange);
                            $("#engagementActivityRange").val(engagementActivityRange);
                            $("#queueHealthRange").val(queueHealthRange);
                            $("#agentActivityRange").val(agentActivityRange);
                            $('#easkillSelect').val(easkillSelect);
                            if (easkillSelect == 2) {
                                $("#easkillIDList").prop("disabled", false);
                                var easkillIDListArray = easkillIDList.split(",");
                                for(var i = 0; i < easkillIDListArray.length; i++){
                                    $("#easkillIDList option[value='" + easkillIDListArray[i]+ "']").attr('selected', true);
                                }
                            }
                            $('#eaAgentSelect').val(eaAgentSelect);
                            if (eaAgentSelect == 2) {
                                $("#eaagentIDList").prop("disabled", false);
                                var eaagentIDListArray = eaagentIDList.split(",");
                                for(var i = 0; i < eaagentIDListArray.length; i++){
                                    $("#eaagentIDList option[value='" + eaagentIDListArray[i]+ "']").attr('selected', true);
                                }
                            }
                            $('#accountNum').val(accountNum);
                            $('#consumerKey').val(consumerKey);
                            $('#consumerSecret').val(consumerSecret);
                            $('#accessToken').val(token);
                            $('#accessTokenSecret').val(tokenSecret);
                            $('#sla').val(slatime);
                            $("#skillSelect").val(skillSelect);
                            if (skillSelect == 2) {
                                $("#skillIDList").prop("disabled", false);
                                var skillIDListArray = skillIDList.split(",");
                                for(var i = 0; i < skillIDListArray.length; i++){
                                    $("#skillIDList option[value='" + skillIDListArray[i]+ "']").attr('selected', true);
                                }
                            }
                            $("#CQskillSelect").val(CQskillSelect);
                            if (CQskillSelect == 2) {
                                $("#CQskillIDList").prop("disabled", false);
                                var CQskillIDListArray = CQskillIDList.split(",");
                                for(var i = 0; i < CQskillIDListArray.length; i++){
                                    $("#CQskillIDList option[value='" + CQskillIDListArray[i]+ "']").attr('selected', true);
                                }
                            }
                            $("#skillSelectAA").val(skillSelectAA);
                            if (skillSelectAA == 2) {
                                $("#skillIDListAA").prop("disabled", false);
                                var skillIDListAAArray = skillIDListAA.split(",");
                                for(var i = 0; i < skillIDListAAArray.length; i++){
                                    $("#skillIDListAA option[value='" + skillIDListAAArray[i]+ "']").attr('selected', true);
                                }
                            }
                            $("#agentSelect").val(agentSelect);
                            if (agentSelect == 2) {
                                $("#agentIDList").prop("disabled", false);
                                $("#agentIDList").val(agentIDList);
                            }
                            $("#slaskillSelect").val(slaskillSelect);
                            if (slaskillSelect == 2) {
                                $("#slaskillIDList").prop("disabled", false);
                                var slaskillIDListArray = slaskillIDList.split(",");
                                for (var i = 0; i < slaskillIDListArray.length; i++) {
                                    $("#slaskillIDList option[value='" + slaskillIDListArray[i] + "']").attr('selected', true);
                                }
                            }
                        });
                    }
                });
        }
    });
});

function loopData() {
    for (group in groupList) {
        agentGroups[group] = {
            "id": group,
            "name": groupList[group],
            "agents": [],
            "skills": []
        }
    }
    for (agent in agentList) {
        if (agentList[agent].hasOwnProperty('memberOf')) {
            if (agentGroups.hasOwnProperty(agentList[agent].memberOf.agentGroupId)) {
                agentGroups[agentList[agent].memberOf.agentGroupId].agents.push(agent);
                for (var i = 0; i < agentList[agent].skillIds.length; i++) {
                    if (agentGroups[agentList[agent].memberOf.agentGroupId].skills.indexOf(agentList[agent].skillIds[i]) === -1) {
                        agentGroups[agentList[agent].memberOf.agentGroupId].skills.push(agentList[agent].skillIds[i]);
                    }
                }
            }
        }
    }
    //console.log(agentGroups);
}