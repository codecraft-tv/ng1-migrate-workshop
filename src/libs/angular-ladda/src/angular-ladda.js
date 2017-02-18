/**!
 * AngularJS Ladda directive
 * @author Chungsub Kim <subicura@subicura.com>
 */

/* global Ladda */
/* exported Ladda */
(function (root, factory)
{
  'use strict';
  var Ladda;
  if (typeof exports === 'object') {
    // CommonJS module
    // Load ladda
    try { Ladda = require('ladda'); } catch (e) {}
    module.exports = factory(Ladda);
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function (req)
    {
      // Load ladda as an optional dependency
      var id = 'ladda';
      try { Ladda = req(id); } catch (e) {}
      return factory(Ladda);
    });
  } else {
    root.Ladda = factory(root.Ladda);
  }
}(this, function (Ladda){
  'use strict';

  angular.module('angular-ladda', [])
    .provider('ladda', function () {
      var opts = {
        'style': 'zoom-in'
      };
      return {
        setOption: function (newOpts) {
          angular.extend(opts, newOpts);
        },
        $get: function () {
          return opts;
        }
      };
    })
    .directive('ladda', ['ladda', function (laddaOption) {
      return {
        restrict: 'A',
        priority: -1,
        link: function (scope, element, attrs) {
          element.addClass('ladda-button');
          if(angular.isUndefined(element.attr('data-style'))) {
            element.attr('data-style', laddaOption.style || 'zoom-in');
          }

          // ladda breaks childNode's event property.
          // because ladda use innerHTML instead of append node
          if(!element[0].querySelector('.ladda-label')) {
            var labelWrapper = document.createElement('span');
            labelWrapper.className = 'ladda-label';
            angular.element(labelWrapper).append(element.contents());
            element.append(labelWrapper);
          }

          // create ladda button
          var ladda = Ladda.create( element[0] );

          // add watch!
          scope.$watch(attrs.ladda, function(loading) {
            if(loading || angular.isNumber(loading)) {
              if(!ladda.isLoading()) {
                ladda.start();
              }
              if(angular.isNumber(loading)) {
                ladda.setProgress(loading);
              }
            } else {
              ladda.stop();
              // When the button also have the ng-disabled directive it needs to be 
              // re-evaluated since the disabled attribute is removed by the 'stop' method.
              if (attrs.ngDisabled) {
                element.attr('disabled', scope.$eval(attrs.ngDisabled));
              }
            }
          });
        }
      };
    }]);
}));
