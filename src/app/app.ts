import * as angular from 'angular';
import 'angular-resource';
import 'angular-animate';
import 'ng-infinite-scroll';
import 'angular-spinner';
import 'angular-auto-validate/dist/jcs-auto-validate';
import 'angular-ladda';
import 'angular-strap';
import 'angularjs-toaster';
import 'angular-ui-router';

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
  // 'ui.router.upgrade'
app.config(function ($httpProvider, $resourceProvider, laddaProvider, $datepickerProvider) {
  laddaProvider.setOption({
    style: 'expand-right'
  });
  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'd/M/yyyy',
    autoclose: true
  });
});

