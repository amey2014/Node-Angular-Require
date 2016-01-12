define(['angular', 'static/scripts/language', 'static/scripts/booksLibrary', 'static/scripts/musicLibrary', 'static/scripts/admin'], function(){
	
	var module = angular.module('libraryApp', ['languageModule', 'booksLibraryApp', 'musicLibraryApp', 'libraryAdmin']);

	module.controller('ctrlShell', ['$scope', '$window', function($scope, $window){
		// here we should get locale value, default is set in main.js
		$scope.language = localStorage.getItem('locale'); 

		// function is invoked when user changes the language
		$scope.$watch('language', function(newValue, oldValue){
			if(oldValue !== newValue){
				localStorage.setItem('locale', newValue);
				$window.location.reload(true);
			}
		});
		
	}]);

	return module;
	
});
