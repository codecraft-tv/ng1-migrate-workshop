import * as angular from 'angular';

angular
    .module('codecraft')
    .filter('defaultImage', function () {
      return function (input, param) {
        if (!input) {
          return param
        }
        return input;
      }
    });