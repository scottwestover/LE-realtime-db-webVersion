var dashboardApp = angular.module('dashboardApp', ['ngRoute']);
var interval = null;
var activityInterval = null;
var queueInterval = null;
var eaInterval = null;
var graphInterval = null;
var recInterval = null;
var curQueInterval = null;

dashboardApp.factory('users', function() {
    var users = {};
    var skills = {};
    var agentGroups = {};
    var usersService = {};

    usersService.add = function(user,skill,group) {
        users = user;
        skills = skill;
        agentGroups = group;
    };
    usersService.listUsers = function() {
        return users;
    };
    usersService.listSkills = function() {
        return skills;
    };
    usersService.listGroups = function() {
        return agentGroups;
    };

    return usersService;
});

// configure our routes
dashboardApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
    // route for the home page
        .when('/', {
            templateUrl: 'partials/graphs.html',
            controller: 'graphsController'
        })
        // route for the agentactivity dashboard page
        .when('/agentActivityDashboard', {
            templateUrl: 'partials/agentActivityDashboard.html',
            controller: 'activityController'
        })
        // route for the settings dashboard page
        .when('/settings', {
            templateUrl: 'partials/settingsUpdate.html',
            controller: 'mainController'
        })
        // route for the queue health dashboard page
        .when('/queueHealthDashboard', {
            templateUrl: 'partials/queueHealthDashboard.html',
            controller: 'queuehealthController'
        })
        // route for the engagement activity dashboard page
        .when('/engagementActivityDashboard', {
            templateUrl: 'partials/engagementActivityDashboard.html',
            controller: 'engagementActivityController'
        })
        // route for the glossary dashboard page
        .when('/glossary', {
            templateUrl: 'partials/glossary.html',
            controller: 'glossaryController'
        })
    // route for the glossary dashboard page
        .when('/graphsDashboard', {
            templateUrl: 'partials/graphs.html',
            controller: 'graphsController'
        })
    // route for the recognition dashboard page
        .when('/recognitionDashboard', {
            templateUrl: 'partials/recognition.html',
            controller: 'recController'
        })
        // route for the current queue size dashboard page
        .when('/currentQueue', {
            templateUrl: 'partials/currentQueue.html',
            controller: 'curQueController'
        })
        .when('/startups',{
            templateUrl: 'partials/startup.html',
            controller: 'startupController'
        })
        //route to main page
        .otherwise({
            redirectTo: '/graphsDashboard'
        });

    $locationProvider.html5Mode(true);
    }]);
    
// controller for the startup dashboard
dashboardApp.controller('startupController', function ($scope, users, $location) {
    $scope.add = users.add;
    $scope.changeURL = function(){
            $location.url('/').replace(); 
            $scope.$apply();
    };
});

// controller for the settings dashboard
dashboardApp.controller('mainController', function ($scope, users) {
    $scope.listUsers = users.listUsers;
    $scope.listSkills = users.listSkills;
});

// controller for agent activity dashboard
dashboardApp.controller('activityController', function ($scope, $interval, users) {
    $scope.listUsers = users.listUsers;
    activityInterval = $interval(function () {
        console.log("Agent Activity is running...");
        getData();
    }, 10000);
}).run(['$rootScope', '$interval', function ($rootScope, $interval) {
    $rootScope.$on('$routeChangeStart', function () {
        $interval.cancel(activityInterval);
    });
}]);
// controller for queue health dashboard
dashboardApp.controller('queuehealthController', function ($scope, $interval,users) {
    $scope.listSkills = users.listSkills;
    queueInterval = $interval(function () {
        console.log("Queue Health is running...");
        getData();
    }, 10000);
}).run(['$rootScope', '$interval', function ($rootScope, $interval) {
    $rootScope.$on('$routeChangeStart', function () {
        $interval.cancel(queueInterval);
    });
}]);
// controller for engagement activity dashboard
dashboardApp.controller('engagementActivityController', function ($scope, $interval, users) {
    $scope.listUsers = users.listUsers;
    $scope.listSkills = users.listSkills;
    eaInterval = $interval(function () {
        console.log("Engagement Activity is running...");
        getData();
    }, 10000);
}).run(['$rootScope', '$interval', function ($rootScope, $interval) {
    $rootScope.$on('$routeChangeStart', function () {
        $interval.cancel(eaInterval);
    });
}]);
// controller for the glossary dashboard
dashboardApp.controller('glossaryController', function ($scope) {});
// controller for the graphs dashboard
dashboardApp.controller('graphsController', function ($scope, $interval, users) {
    $scope.listUsers = users.listUsers;
    $scope.listSkills = users.listSkills;
    $scope.listGroups = users.listGroups;
    graphInterval = $interval(function () {
        console.log("Graphs is running...");
        getData();
    }, 10000);
}).run(['$rootScope', '$interval', function ($rootScope, $interval) {
    $rootScope.$on('$routeChangeStart', function () {
        $interval.cancel(graphInterval);
    });
}]);
// controller for the recognition dashboard
dashboardApp.controller('recController', function ($scope, $interval, users) {
   recInterval = $interval(function () {
        console.log("Recognition is running...");
        getData();
    }, 10000);
       $scope.listUsers = users.listUsers;
}).run(['$rootScope', '$interval', function ($rootScope, $interval, users) {
    $rootScope.$on('$routeChangeStart', function () {
        $interval.cancel(recInterval);
    });
}]);
// controller for the current queue dashboard
dashboardApp.controller('curQueController', function ($scope, $interval,users) {
    $scope.listSkills = users.listSkills;
   curQueInterval = $interval(function () {
        console.log("Current Queue is running...");
        getData();
    }, 10000);
}).run(['$rootScope', '$interval', function ($rootScope, $interval) {
    $rootScope.$on('$routeChangeStart', function () {
        $interval.cancel(curQueInterval);
    });
}]);
// timer for dasboards
var myVar = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    var currentURL = window.location.href;
    if(currentURL != "http://localhost:5000/startups"){
        document.getElementById("time").innerHTML = d.toLocaleTimeString();
    }
}
