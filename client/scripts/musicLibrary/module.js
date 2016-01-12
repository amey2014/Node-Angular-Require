define(['angular', 'ngRoute'], function(angular, ngRoute){
	
	return angular.module('musicLibraryApp', ['ngRoute'])
		.config(['$routeProvider',
			function($routeProvider) {
				$routeProvider.
				  when('/labels', {
					templateUrl: 'static/scripts/musicLibrary/views/labels.html',
					controller: 'LabelsCtrl'
				  });
			}
	]);
	
});