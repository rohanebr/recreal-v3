'use strict';

angular.module('employer-signup-wizard').controller('EmpWizardTwoController', ['$scope','$interval',
	function($scope,$interval) {
			  $scope.autoRotate = function() {
      var map = $scope.map;
      if (map.getTilt() != 0) {
        $interval(function() {
          var heading = map.getHeading() || 0;
          map.setHeading(heading + 90);
        }, 3000);
      }
    }
	}
]);