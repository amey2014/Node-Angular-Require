define(['../module'], function(module){
	
	return module
	.controller('BooksCtrl', ['$scope', 'BooksManagerService', 'my.i18n', function($scope, booksManagerService, i18n) {
		console.log('Books controller initialized...');
		$scope.i18n = i18n;
		$scope.books = [];
		
		booksManagerService.getBooks().then(
			// success
			function(data) {
				// console.log(data);
				$scope.books = data.data;
			},
			// error
			function(error) {
				console.log('Error occurred while getting list of books: ', error.statusText, error);
				$scope.books = [];
			}
		);

	}]);
	
});
