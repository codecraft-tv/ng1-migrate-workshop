import * as angular from 'angular';

angular
    .module('codecraft')
    .controller('PersonListController', function ($scope, $modal, ContactService) {
      $scope.contacts = ContactService;

      $scope.loadMore = function () {
        $scope.contacts.loadMore();
      };

    });