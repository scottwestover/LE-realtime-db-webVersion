/*********************
 * Module dependencies
 *********************/
var express = require('express');
var app = express();
var routes = require('./routes');
app.engine('html', require('ejs').renderFile);

/***************
 * Configuration
 ***************/
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

/********
 * Routes
 ********/
// serve index and view partials
app.get('/', routes.startupPage);
app.get('/partials/:name', routes.partials);
app.get('/agentActivity', routes.agentActivity);
app.get('/saveSettings', routes.saveSettings);
app.post('/getOauth', routes.getOauth);
app.get('/queueHealth', routes.queueHealth);
app.get('/queueHealth2', routes.queueHealth2);
app.get('/engagementActivity', routes.engagementActivity);
app.get('/engagementActivity2', routes.engagementActivity2);
app.get('/currentQueueState', routes.currentQueueState);
app.get('/skillList', routes.skillList);
app.get('/agentList', routes.agentList);
app.get('/agentGroupList', routes.agentGroupList);
app.get('/startup', routes.startup);
app.get('/startupStatus', routes.startupStatus);
app.get('/startupPage', routes.startupPage);
app.get('/mainPage', routes.index);
app.get('/error', routes.error);
app.get('/sla', routes.sla);
// serve messaging views
app.get('/messagingConversation', routes.messagingConversation);
app.get('/messagingCSAT', routes.messagingCSAT);
app.get('/saveSettingsMsg', routes.saveSettingsMsg);
app.post('/getOauthMsg', routes.getOauthMsg);
// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/*
app.use('/*', function(req, res){
  res.sendFile(__dirname + '/views/pages/main.html');
});*/

/**************
 * Start Server
 **************/
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
