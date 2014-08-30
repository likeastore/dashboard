'use strict';

angular.module('dashboardApp').factory('analytics', function ($http, config) {
	var app = config.app;
	var url = config.analytics.url;

	return {
		report: function (report, date, id, callback) {
			var query = url + '/api/reports/' + report + '/' + app + '?id=' + id + '&date=' + date.format('YYYY-MM-DD');
			return $http({method: 'GET', url: query}).success(callback);
		},
		events: function (callback) {
			var query = url + '/api/events/events/' + app;
			return $http({method: 'GET', url: query}).success(callback);
		},
		ids: function (callback) {
			var query = url + '/api/events/ids/' + app;
			return $http({method: 'GET', url: query}).success(callback);
		}
	};
});
