import {app} from "./app";

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('list', {
        url: "/",
        views: {
          'main': {
            template: '<person-list></person-list>',
          },
          'search': {
            template: '<search></search>',
          }
        }
      })
      .state('edit', {
        url: "/edit/:email",
        views: {
          'main': {
            template: `<person-edit mode="'Edit'"></person-edit>`
          }
        }
      })
      .state('create', {
        url: "/create",
        views: {
          'main': {
            template: `<person-edit mode="'Create'"></person-edit>`
          }
        }
      });

  $urlRouterProvider.otherwise('/');
});