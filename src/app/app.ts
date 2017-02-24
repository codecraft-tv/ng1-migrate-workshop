import * as angular from 'angular';

export let app = angular.module('codecraft', [
  'ngResource',
  'infinite-scroll',
  'angularSpinner',
  'jcs-autoValidate',
  'angular-ladda',
  'mgcrea.ngStrap',
  'toaster',
  'ngAnimate',
  'ui.router'
]);

app.config(function ($httpProvider, $resourceProvider, laddaProvider, $datepickerProvider) {
  laddaProvider.setOption({
    style: 'expand-right'
  });
  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'd/M/yyyy',
    autoclose: true
  });
});

