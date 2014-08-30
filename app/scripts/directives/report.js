'use strict';

angular.module('dashboardApp').directive('report', function (analytics, filterEvents) {
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

			function updateEvents() {
				$scope.events = [];
				var neededEvents = filterEvents.getEvents();
				if(neededEvents) {
					getData(neededEvents);
				} else {
					analytics.events(function(events) {
						getData(events);
					});
				}
			}

			function getData(events) {
				for(var i = 0; i < events.length; i++) {
					var name = events[i];
					analytics.report(attrs.report, dates[attrs.date], name, function (data) {
						$scope.events.push({key: data.id, value: data});
					});
				}
			}

			updateEvents();
			$scope.$on('eventsUpdated', updateEvents);
		}
	};
});
