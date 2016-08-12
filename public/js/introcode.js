function startIntro() {
                var currentURL = window.location.href;
                console.log(currentURL);
                //route help according to the page the visitor is on
                var intro = introJs();
                intro.setOption('tooltipPosition', 'auto');
                intro.setOption('positionPrecedence', ['left', 'right', 'bottom', 'top']);
                if(currentURL == "http://localhost:5000/settings"){
                    intro.setOptions({
                        steps: [
                        {
                            intro: "The settings page allows for you to control what data is shown in the dashboard."
                        },{
                            element: document.querySelector('#step1'),
                            intro: "In order to use the dashboard, you will need to enable the Real Time Operational Data, Users, Skills, and Agent Groups APIs on your LiveEngage account. You can do this through the API tab on the data sources page of LiveEngage."
                        }, {
                            element: document.querySelector('#step2'),
                            intro: "The Agent Activity API Settings tab allows for you to specify the time range that you would like to pull data for. These settings will affect the data that is displayed in the Dashboard and Agent Activity pages. Currently, selecting specific agents is not supported."
                        }, {
                            element: document.querySelector('#step3'),
                            intro: "The Queue Health API Settings tab allows for you to specify the time range that you would like to pull data for, and to choose which skills you would like to pull data for based on their ids. These settings will affect the data that is displayed in the Dashboard and Queue Health pages."
                        }, {
                            element: document.querySelector('#step4'),
                            intro: "The Engagement Activity API Settings tab allows for you to specify the time range that you would like to pull data for, and to choose which skills and agents you would like to pull data for based on their ids. These settings will affect the data that is displayed in the Dashboard, Agent Recognition, and Engagement Activity pages."
                        }, {
                            element: document.querySelector('#step5'),
                            intro: 'The Additional Settings tab allows for you to specify an SLA time for AVG time to answer. This setting will affect the table on the Queue Health page.'
                        }, {
                            element: document.querySelector('#step6'),
                            intro: "The time frame slider allows for you to choose the time frame that you want to pull data for. You can select anywhere between the past minute up to the past 24 hours. The slider is in minutes."
                        }, {
                            element: document.querySelector('#step7'),
                            intro: 'The select skill option allows for you to choose which skills you would like to pull data for. You can choose between All, None, and Specific Skills. If you choose Specific Skills, you will need to select the skill ids in the area below.'
                        }, {
                            element: document.querySelector('#step8'),
                            intro: 'This is where you will select the skill ids that you would like to pull data for. This text area will be disabled if you have choosen All or None in the dropdown above.'
                        }, {
                            element: document.querySelector('#step9'),
                            intro: 'The select agent option allows for you to choose which agents you would like to pull data for. You can choose between All, None, and Specific Agents. If you choose Specific Agents, you will need to select the agent ids in the area below.'
                        }, {
                            element: document.querySelector('#step10'),
                            intro: 'This is where you will select the agent ids that you would like to pull data for. This text area will be disabled if you have choosen All or None in the dropdown above.'
                        }, {
                            element: document.querySelector('#step11'),
                            intro: 'Once you click the save button, you changes will take effect immidetialy, and the dashboard will update with that data. If you click cancel all of your changes will be discarded.'
                        }]
                    });
                }
                else if (currentURL == "http://localhost:5000/recognitionDashboard") {
                    intro.setOptions({
                        steps: [
                        {
                            intro: "The recognition page shows which agents have the most interactive chats and the lowest average handling time for the time frame you selected."
                        },{
                            intro: "In Engagement Activity API Settings will affect which data is displayed on this page."
                        }, {
                            element: document.querySelector('#mostchatsname'),
                            intro: "If the agents name is not showing up, and instead the agent id is appearing, please make sure that you enabled the Agent API for your currnet set of API keys."
                        }, {
                            element: document.querySelector('#lowestPic'),
                            intro: "To display the agents image, you will need to upload your agents images to the agentImages folder under the settings folder. The images should be named using the following format: agentId.png. If no agent images are found, then a default image will display."
                        }]
                    });
                }
                else if (currentURL == "http://localhost:5000/glossary") {
                    intro.setOptions({
                        steps: [
                        {
                            intro: "The glossary page shows what data is available for each API, and it gives a description of what each metric is."
                        }, {
                            element: document.querySelector('#myTab'),
                            intro: "You can click on the different tabs to see which data is avaialble for each API."
                        }]
                    });
                }
                else if (currentURL == "http://localhost:5000/agentActivityDashboard") {
                    intro.setOptions({
                        steps: [
                        {
                            intro: "The agent activity page shows how much time an agent spent in each state, and how much of that time was spent chatting, not chatting, chatting at max concurrency, and the total amount of time logged in."
                        },  {
                            intro: "The Agent Activity API Settings will affect which data is displayed on this page."
                        }, {
                            element: document.querySelector('#headings'),
                            intro: "You can hover over the different table headers to get more information on that metric."
                        }, {
                            element: document.querySelector('#example_filter'),
                            intro: "You can use the search bar to filter the table."
                        }, {
                            element: document.querySelector('#example_length'),
                            intro: "You can select how many records you would like displayed in the table from the dropdown here."
                        }]
                    });
                }
                else if (currentURL == "http://localhost:5000/queueHealthDashboard") {
                    intro.setOptions({
                        steps: [
                        {
                            intro: "The queue health page shows metrics that are related to the queue for the skills you selected. Exmample metrics: average time to answer, average tim to abandon, how people entered queue, how many chats were connteced, etc."
                        },  {
                            intro: "The Queue Health API Settings will affect which data is displayed on this page."
                        }, {
                            element: document.querySelector('#slaheader'),
                            intro: "You can set the SLA setting in the Additonal Settings tab on the settings page. This metric will determin whether the average time to answer is Pass or Fail."
                        },{
                            element: document.querySelector('#headings'),
                            intro: "You can hover over the different table headers to get more information on that metric."
                        }, {
                            element: document.querySelector('#example_filter'),
                            intro: "You can use the search bar to filter the table."
                        }, {
                            element: document.querySelector('#example_length'),
                            intro: "You can select how many records you would like displayed in the table from the dropdown here."
                        }]
                    });
                }
                else if (currentURL == "http://localhost:5000/engagementActivityDashboard") {
                    intro.setOptions({
                        steps: [
                        {
                            intro: "The engagement activity page shows metrics that are related to the engagment activity for the skills and agents that you selected. Exmample metrics: total interactive chats, total handling time, connected engagements, etc."
                        },  {
                            intro: "The Engagement Activity API Settings will affect which data is displayed on this page."
                        }, {
                            element: document.querySelector('#eaSkill'),
                            intro: "This table will will show the relevant metrics for the skills that you selected for this API."
                        },{
                            element: document.querySelector('#eaAgent'),
                            intro: "This table will will show the relevant metrics for the agents that you selected for this API."
                        },{
                            element: document.querySelector('#headings'),
                            intro: "You can hover over the different table headers to get more information on that metric."
                        }, {
                            element: document.querySelector('#example_filter'),
                            intro: "You can use the search bar to filter the table."
                        }, {
                            element: document.querySelector('#example_length'),
                            intro: "You can select how many records you would like displayed in the table from the dropdown here."
                        }]
                    });
                }
                else if (currentURL == "http://localhost:5000/currentQueue") {
                    intro.setOptions({
                        steps: [
                        {
                            intro: "The current queue state page shows metrics that are related to the current state of your queue."
                        },  {
                            intro: "The Current Queue State API Settings will affect which data is displayed on this page."
                        }, {
                            element: document.querySelector('#headings'),
                            intro: "You can hover over the different table headers to get more information on that metric."
                        }, {
                            element: document.querySelector('#example_filter'),
                            intro: "You can use the search bar to filter the table."
                        }, {
                            element: document.querySelector('#example_length'),
                            intro: "You can select how many records you would like displayed in the table from the dropdown here."
                        }]
                    });
                }
                else {
                    intro.setOptions({
                        steps: [
                        {
                            intro: "The dashboard page shows key metrics from the APIs that make up the Real Time Operational API."
                        },  {
                            intro: "All of the API settings will affect which data is displayed on this page."
                        }, {
                            element: document.querySelector('#tiles'),
                            intro: "You can hover any of these metrics to get more information on them."
                        },{
                            element: document.querySelector('#infoTip'),
                            intro: "You can hover over the 'i' icon to get more information on these widgets."
                        },{
                            element: document.querySelector('#agentStats'),
                            intro: "This table will show key metrics for the agents for the time frame you selected in the Agent Activity API."
                        },{
                            element: document.querySelector('#avg24hr'),
                            intro: "This table shows the average time to answer for the past 24 hours for the skills you selected for the Queue Health API."
                        },{
                            element: document.querySelector('#headings'),
                            intro: "You can hover over the different table headers to get more information on that metric."
                        }, {
                            element: document.querySelector('#operator_filter'),
                            intro: "You can use the search bar to filter the table."
                        }, {
                            element: document.querySelector('#operator_length'),
                            intro: "You can select how many records you would like displayed in the table from the dropdown here."
                        }]
                    });
                }
                intro.start();
            }