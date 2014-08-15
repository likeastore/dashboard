'use strict';

angular.module('dashboardApp').directive('report', function (analytics) {
	var dates = {
		today: moment(),
		yesterday: moment().subtract('days', 1),
		lastWeek: moment().startOf('week').subtract('weeks', 1),
		lastMonth: moment().startOf('month').subtract('month', 1)
	};

	return {
		restrict: 'E',
		templateUrl: 'views/report.html',
		scope: true,
		link: function ($scope, elem, attrs) {
			$scope.heading = attrs.periodHeading;
			$scope.datePeriod = dates[attrs.date].format('DD/MM/YYYY');
			$scope.events = [];

			analytics.eventnames(function(names) {
				for(var i = 0; i < names.length; i++) {
					var name = names[i];
					analytics.report(attrs.report, dates[attrs.date], name, function (data) {
						$scope.events.push({key: name, value: data});
					});
				}
			});
		}
	};
});
