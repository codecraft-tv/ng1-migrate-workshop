app.controller('PersonCreateController', function ($scope, $state, ContactService) {
  $scope.mode = "Create";
  $scope.contacts = ContactService;
  $scope.contacts.selectedPerson = {};

  $scope.save = function () {
    console.log("createContact");
    $scope.contacts.createContact($scope.contacts.selectedPerson)
        .then(function () {
          $state.go("list");
        })
  };
});