// get the locale from localStorgae. If no locale is set, then use English as default
var locale = localStorage.getItem('locale') || 'en-en';
localStorage.setItem('locale', locale);

require.config({
	packages: [ 'static/scripts/language', 'static/scripts/booksLibrary', 'static/scripts/musicLibrary', 'static/scripts/admin' ],
	
	paths: {
		angular: "static/lib/angular.min",
        ngRoute: "static/lib/angular-route.min",
		app: 'static/scripts/app'
	},
	
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular']
	},
	
	priority: [
		"angular"
	],

	config: {
        i18n: {
            locale: locale
        }
    }
})

require([
	'angular',
	'app'
	], function(angular, app) {
		var $html = angular.element(document.getElementsByTagName('html')[0]);
		angular.element().ready(function() {
			// bootstrap the app manually
			angular.bootstrap(document, ['libraryApp']);
		});
	}
);
