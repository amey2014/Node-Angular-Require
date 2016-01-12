define(['../module'], function(module){
	
	return module
		.factory('BooksManagerService', ['$http', function($http) {
			console.log('BooksManagerService initialized...');
			
			var service = {
				getBooks: getBooks,
				getBookDetails: getBookDetails
			}
			
			return service;
			
			// returns promise for getBooks
			function getBooks(){
				return $http.get('static/data/books.json');
			}
			
			// returns promise for getBookDetails
			function getBookDetails(){
				return $http.get('static/data/bookDetails.json');
			}
		}]);
	
});
