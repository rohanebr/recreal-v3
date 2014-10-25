angular.module('short-list').controller('CandidatesTestController', ['$scope', '$http', '$stateParams', '$modal','$rootScope', 'Exams','Authentication',
	function($scope, $http, $stateParams, $modal,$rootScope, Exams,Authentication) {
$scope.user=Authentication.user;




// console.log($rootScope.selectedCandidates[0]);



	// Find a list of Exams
		$scope.find = function() {
			$scope.tests = Exams.query();
		};


		$scope.sendTest = function(){
			var tests = [];
			angular.forEach($scope.tests, function(test){
				console.log(test);
				if(test.selected){
					tests.push(test._id);
				}
			});
			var candidates =$rootScope.selectedCandidates;
			console.log(candidates);
			$http.put('/exams/sendTest/'+$scope.user._id, {candidates: candidates, tests: tests }).success(function(response){
				console.log(response);
				if(response.data=="none have given test")
				{
					alert("None have given the test ");

				}
				if(response.data=="already given test")
					{alert("well it looks like someone has given the test already");}
			}).error(function(err){

			});	
		};
	}]);