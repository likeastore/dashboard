"use strict";var app=angular.module("dashboardApp",["ngCookies","ngResource","ngSanitize"]);app.config(["$routeProvider","$locationProvider","$httpProvider",function(a,b,c){c.responseInterceptors.push("httpInterceptor"),a.when("/",{templateUrl:"views/dashboard.html",controller:"dashboard"}).when("/login",{templateUrl:"views/auth.html",controller:"auth"}).otherwise({redirectTo:"/"}),b.html5Mode(!0)}]),app.run(["api",function(a){a.init()}]);var config=config||{};config.development={app:"likeastore-development",analytics:{url:"http://localhost:3005"}};var config=config||{};config.staging={app:"likeastore-staging",analytics:{url:"http://analytics.stage.likeastore.com"}};var config=config||{};config.production={app:"likeastore-production",analytics:{url:"https://analytics.likeastore.com"}},angular.module("dashboardApp").factory("api",["$http","$cookies",function(a,b){return{init:function(c){a.defaults.headers.common["X-Access-Token"]=c||b.token}}}]),angular.module("dashboardApp").factory("analytics",["$http","config",function(a,b){var c=b.app,d=b.analytics.url;return{report:function(b,e,f,g){var h=d+"/api/reports/"+b+"/"+c+"?id="+f+"&date="+e.format("YYYY-MM-DD");return a({method:"GET",url:h}).success(g)}}}]),angular.module("dashboardApp").factory("authorization",["$http","config",function(a,b){var c=b.analytics.url;return{login:function(b){return a.post(c+"/auth",b)}}}]),angular.module("dashboardApp").factory("config",function(){var a=function(){var a=window.document.URL;return 0===a.indexOf("http://127.0.0.1")||0===a.indexOf("http://localhost")||0===a.indexOf("http://dashboard.dokku.me")?"development":0===a.indexOf("http://dashboard.stage")?"staging":0===a.indexOf("https://dashboard.likeastore")||0===a.indexOf("http://likeastore.github.io")?"production":void 0}();if(!a)throw new Error("failed to detect application env");return window.config[a]}),angular.module("dashboardApp").factory("httpInterceptor",["$q","$window","$location",function(a,b,c){return function(b){var d=function(a){return a},e=function(b){return 401===b.status&&c.url("/login"),a.reject(b)};return b.then(d,e)}}]),angular.module("dashboardApp").controller("auth",["$scope","$location","$cookieStore","authorization","api",function(a,b,c,d,e){a.title="Likeastore. Analytics",a.login=function(){var a={username:this.username,password:this.password},f=function(a){var d=a.token;e.init(d),c.put("token",d),b.path("/")},g=function(){};d.login(a).success(f).error(g)}}]),angular.module("dashboardApp").controller("dashboard",function(){});