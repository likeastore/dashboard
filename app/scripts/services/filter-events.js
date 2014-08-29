'use strict';

angular.module('dashboardApp').service('filterEvents', function() {
	this.getEvents = function() {
		return localStorage.neededEvents && JSON.parse(localStorage.neededEvents);
	};

	this.filter = function(events) {
		var result = [],
			neededEvents = localStorage.neededEvents && JSON.parse(localStorage.neededEvents);
		if(!neededEvents) {
			result = events.map(function(event) {
				return {
					key: event,
					value: true
				}
			});
		} else {
			for(var i = 0; i < events.length; i++) {
				var value = neededEvents.indexOf(events[i]) != -1 || false;
				result.push({key: events[i], value: value});
			}
		}
		this.setEvents(result);
		return result;
	};

	this.setEvents = function(events) {
		var result = events
			.filter(function(item) { 
				return item.value; 
			}).map(function(item) { 
				return item.key; 
			});
		localStorage.neededEvents = JSON.stringify(result);
	};
});