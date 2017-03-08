// variables for the agent and skill lists
var skillList = null;
var agentList = null;

$(document).ready(function() {
    setTimeout(function() {
        var sel = 'div[role="main"]';
        skillList = angular.element(sel).scope().listSkills();
        agentList = angular.element(sel).scope().listUsers();
        //console.log(skillList);
        //console.log(agentList);

        populateMutilpleSelectBoxes();
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
        // Check if keys or account number has changed
        var restart = checkForChangedKeys();
        // Store
        localStorage.setItem("consumerKeyM", document.getElementById("consumerKey").value.replace(/\s+/g, ''));
        localStorage.setItem("consumerSecretM", document.getElementById("consumerSecret").value.replace(/\s+/g, ''));
        localStorage.setItem("accessTokenM", document.getElementById("accessToken").value.replace(/\s+/g, ''));
        localStorage.setItem("accessTokenSecretM", document.getElementById("accessTokenSecret").value.replace(/\s+/g, ''));
        localStorage.setItem("accountNumM", document.getElementById("accountNum").value.replace(/\s+/g, ''));
        localStorage.setItem("msgConskillSelect", document.getElementById("msgConskillSelect").value);
        localStorage.setItem("msgConAgentSelect", document.getElementById("msgConAgentSelect").value);
        localStorage.setItem("msgConskillIDList", $('#msgConskillIDList').val());
        localStorage.setItem("msgConagentIDList", $('#msgConagentIDList').val());
        localStorage.setItem("msgcsatskillSelect", document.getElementById("msgcsatskillSelect").value);
        localStorage.setItem("msgcsatAgentSelect", document.getElementById("msgcsatAgentSelect").value);
        localStorage.setItem("msgcsatskillIDList", $('#msgcsatskillIDList').val());
        localStorage.setItem("msgcsatagentIDList", $('#msgcsatagentIDList').val());
        localStorage.setItem("msgConRange", document.getElementById("msgConRange").value.replace(/\s+/g, ''));
        localStorage.setItem("msgcsatRange", document.getElementById("msgcsatRange").value.replace(/\s+/g, ''));
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }
    if (restart) {
        window.location.href = "/";
    }
    else {
        $('#cancelButton').click();
    }
    return;
}

/**
 * @desc gets the api settings from the browser local storage and updates the settings on the page
 * @return undefined
 */
function getStorageVales() {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("consumerKeyM") != null) {
            $('#consumerKey').val(localStorage.getItem("consumerKeyM"));
        }
        if (localStorage.getItem("accountNumM") != null) {
            $('#accountNum').val(localStorage.getItem("accountNumM"));
        }
        if (localStorage.getItem("consumerSecretM") != null) {
            $('#consumerSecret').val(localStorage.getItem("consumerSecretM"));
        }
        if (localStorage.getItem("accessTokenM") != null) {
            $('#accessToken').val(localStorage.getItem("accessTokenM"));
        }
        if (localStorage.getItem("accessTokenSecretM") != null) {
            $('#accessTokenSecret').val(localStorage.getItem("accessTokenSecretM"));
        }
        if (localStorage.getItem("msgConRange") != null) {
            $("#msgConRange").val(localStorage.getItem("msgConRange"));
        }
        if (localStorage.getItem("msgConRange") != null) {
            $("#msgcsatRange").val(localStorage.getItem("msgcsatRange"));
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
    return;
}

/**
 * @desc updates the selected agents from the select input menu that where saved in the browser storage
 * @return undefined
 */
function updateFormAgentValues() {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("msgConAgentSelect") != null) {
            $('#msgConAgentSelect').val(localStorage.getItem("msgConAgentSelect"));
        }
        if (localStorage.getItem("msgConAgentSelect") == 2) {
            $("#msgConagentIDList").prop("disabled", false);
            var msgConagentIDListArray = localStorage.getItem("msgConagentIDList").split(",");
            for (var i = 0; i < msgConagentIDListArray.length; i++) {
                $("#msgConagentIDList option[value='" + msgConagentIDListArray[i] + "']").attr('selected', true);
            }
        }
        if (localStorage.getItem("msgcsatAgentSelect") != null) {
            $('#msgcsatAgentSelect').val(localStorage.getItem("msgcsatAgentSelect"));
        }
        if (localStorage.getItem("msgcsatAgentSelect") == 2) {
            $("#msgcsatagentIDList").prop("disabled", false);
            var msgcsatagentIDListArray = localStorage.getItem("msgcsatagentIDList").split(",");
            for (var i = 0; i < msgcsatagentIDListArray.length; i++) {
                $("#msgcsatagentIDList option[value='" + msgcsatagentIDListArray[i] + "']").attr('selected', true);
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
        if (localStorage.getItem("msgConskillSelect") != null) {
            $("#msgConskillSelect").val(localStorage.getItem("msgConskillSelect"));
        }
        if (localStorage.getItem("msgConskillSelect") == 2) {
            $("#msgConskillIDList").prop("disabled", false);
            var msgConskillIDListArray = localStorage.getItem("msgConskillIDList").split(",");
            for (var i = 0; i < msgConskillIDListArray.length; i++) {
                $("#msgConskillIDList option[value='" + msgConskillIDListArray[i] + "']").attr('selected', true);
            }
        }
        if (localStorage.getItem("msgcsatskillSelect") != null) {
            $("#msgcsatskillSelect").val(localStorage.getItem("msgcsatskillSelect"));
        }
        if (localStorage.getItem("msgcsatskillSelect") == 2) {
            $("#msgcsatskillIDList").prop("disabled", false);
            var msgcsatskillIDListArray = localStorage.getItem("msgcsatskillIDList").split(",");
            for (var i = 0; i < msgcsatskillIDListArray.length; i++) {
                $("#msgcsatskillIDList option[value='" + msgcsatskillIDListArray[i] + "']").attr('selected', true);
            }
        }
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }
    return;
}

/**
 * @desc populates all of the agent and skill select boxes with the agent and skill names from the skillList and agentList variables
 * @return undefined
 */
function populateMutilpleSelectBoxes() {
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
    return;
}

/**
 * @desc checks to see if the api keys have changed that way we know if we need to restart the app
 * @return bool
 */
function checkForChangedKeys() {
    var restart = false;
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("consumerKeyM") != document.getElementById("consumerKey").value) {
            restart = true;
        }
        if (localStorage.getItem("accountNumM") != document.getElementById("accountNum").value) {
            restart = true;
        }
        if (localStorage.getItem("consumerSecretM") != document.getElementById("consumerSecret").value) {
            restart = true;
        }
        if (localStorage.getItem("accessTokenM") != document.getElementById("accessToken").value) {
            restart = true;
        }
        if (localStorage.getItem("accessTokenSecretM") != document.getElementById("accessTokenSecret").value) {
            restart = true;
        }
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }
    return restart;
}
