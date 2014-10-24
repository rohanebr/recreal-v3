angular.module('short-list').controller('CandidatesTestController', ['$scope', '$http', '$stateParams', '$modal','$rootScope', 'Exams',
	function($scope, $http, $stateParams, $modal,$rootScope, Exams) {




// console.log($rootScope.selectedCandidates[0]);



	// Find a list of Exams
		$scope.find = function() {
			$scope.tests = Exams.query();
		};


		$scope.sendTest = function(){
			var tests = [];
			angular.forEach($scope.tests, function(test){
				if(test.selected){
					tests.push(test._id);
				}
			});
			var candidates =$rootScope.selectedCandidates;
			$http.post('exams/sendTest', {candidates: candidates, tests: tests }).success(function(response){
				alert('test sent');
			}).error(function(err){

			});	
		};
	}]);