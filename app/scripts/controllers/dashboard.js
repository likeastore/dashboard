'use strict';

angular.module('dashboardApp').controller('dashboard', function ($scope, analytics, filterEvents) {
	$scope.filtredEvents = [];
	analytics.events(function(events) {
		$scope.filtredEvents = filterEvents.filter(events);
	});

	$scope.apply = function() {
		filterEvents.setEvents($scope.filtredEvents);
		$scope.$broadcast('eventsUpdated');
	};

	$scope.checkAll = function() {
		angular.forEach($scope.filtredEvents, function(item) {
			item.value = true;
		});
	};
});