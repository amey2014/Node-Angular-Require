define(['angular', 'ngRoute'], function(){
	
	return angular.module('libraryAdmin', ['ngRoute'])
		.config(['$routeProvider',
			function($routeProvider) {
				$routeProvider.
				  when('/admin', {
					templateUrl: 'static/scripts/admin/views/admin.html',
					//template: '<h2>static</h2>',
					controller: 'AdminCtrl'
				  });
			}
	]);
	
});