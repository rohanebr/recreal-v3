'use strict';

angular.module('exams').controller('ExamResultController', ['$scope', '$stateParams', '$http',
	function($scope, $stateParams, $http) {
		// Controller Logic
		// ...
		// Find existing Exam
		$scope.findOne = function() {
			$http.get('/examResult/' + $stateParams.examTakenId).success(function(data){
				$scope.examTaken = data;
			});
		};
	}
]);