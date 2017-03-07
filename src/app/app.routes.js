app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('list', {
        url  : "/",
        views: {
          'main'  : {
            templateUrl: 'templates/list.html',
            controller : 'PersonListController'
          },
          'search': {
            templateUrl: 'templates/searchform.html',
            controller : 'PersonListController'
          }
        }
      })
      .state('edit', {
        url  : "/edit/:email",
        views: {
          'main': {
            templateUrl: 'templates/edit.html',
            controller : 'PersonDetailController'
          }
        }
      })
      .state('create', {
        url  : "/create",
        views: {
          'main': {
            templateUrl: 'templates/edit.html',
            controller : 'PersonCreateController'
          }
        }
      });

  $urlRouterProvider.otherwise('/');
});