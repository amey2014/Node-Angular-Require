define(['angular', 'ngRoute', 'static/scripts/language'], function(angular, ngRoute){
	
	return angular.module('booksLibraryApp', ['ngRoute', 'languageModule'])
		.config(['$routeProvider',
			function($routeProvider) {
				$routeProvider.
				  when('/books', {
					templateUrl: 'static/scripts/booksLibrary/views/books.html',
					controller: 'BooksCtrl'
				  }).
				  when('/books/:bookID', {
					templateUrl: 'static/scripts/booksLibrary/views/bookDetails.html',
					controller: 'BookDetailsCtrl'
				  }).
				  otherwise({
					redirectTo: '/books'
				  });
			}
	]);
	
});