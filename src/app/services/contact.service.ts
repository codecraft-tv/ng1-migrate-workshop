import * as angular from 'angular';


angular
    .module('codecraft')
    .factory('ContactService', function (Contact, $rootScope, $q, toaster) {

      var self = {
        'getPerson': function (email) {
          console.log(email);
          for (var i = 0; i < self.persons.length; i++) {
            var obj = self.persons[i];
            if (obj.email == email) {
              return obj;
            }

          }
        },
        'page': 1,
        'hasMore': true,
        'isLoading': false,
        'isSaving': false,
        'isDeleting': false,
        'selectedPerson': null,
        'persons': [],
        'search': null,
        'sorting': 'name',
        'ordering': 'ASC',
        'doSearch': function () {
          self.hasMore = true;
          self.page = 1;
          self.persons = [];
          self.loadContacts();
        },
        'doOrder': function () {
          self.hasMore = true;
          self.page = 1;
          self.persons = [];
          self.loadContacts();
        },
        'loadContacts': function () {
          if (self.hasMore && !self.isLoading) {
            self.isLoading = true;

            var params = {
              '_page': self.page,
              '_sort': self.sorting,
              "_order": self.ordering,
              'q': self.search
            };

            Contact.query(params).then(function (res) {
              console.log(res.data);
              angular.forEach(res.data, function (person) {
                self.persons.push(person);
              });
              if (!res.data) {
                self.hasMore = false;
              }
              self.isLoading = false;
            });
          }

        },
        'loadMore': function () {
          if (self.hasMore && !self.isLoading) {
            self.page += 1;
            self.loadContacts();
          }
        },
        'updateContact': function (person) {
          var d = $q.defer();
          self.isSaving = true;
          Contact.update(person).then(function () {
            self.isSaving = false;
            toaster.pop('success', 'Updated ' + person.name);
            d.resolve()
          });
          return d.promise;
        },
        'removeContact': function (person) {
          var d = $q.defer();
          self.isDeleting = true;
          Contact.remove(person).then(function () {
            self.isDeleting = false;
            var index = self.persons.indexOf(person);
            self.persons.splice(index, 1);
            self.selectedPerson = null;
            toaster.pop('success', 'Deleted ' + person.name);
            d.resolve()
          });
          return d.promise;
        },
        'createContact': function (person) {
          var d = $q.defer();
          self.isSaving = true;
          Contact.save(person).then(function () {
            self.isSaving = false;
            self.selectedPerson = null;
            self.hasMore = true;
            self.page = 1;
            self.persons = [];
            self.loadContacts();
            toaster.pop('success', 'Created ' + person.name);
            d.resolve()
          });
          return d.promise;
        },
        'watchFilters': function () {
          $rootScope.$watch(function () {
            return self.search;
          }, function (newVal) {
            if (angular.isDefined(newVal)) {
              self.doSearch();
            }
          });

          $rootScope.$watch(function () {
            return self.ordering + self.sorting;
          }, function (newVal) {
            if (angular.isDefined(newVal)) {
              self.doOrder();
            }
          });
        }

      };

      self.loadContacts();
      self.watchFilters();


      return self;

    });