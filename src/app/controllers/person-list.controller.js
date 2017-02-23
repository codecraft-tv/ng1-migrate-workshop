app.controller('PersonListController', function ($scope, $modal, ContactService) {
  $scope.contacts = ContactService;

  $scope.loadMore = function () {
    $scope.contacts.loadMore();
  };

});