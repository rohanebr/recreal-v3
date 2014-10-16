'use strict';

angular.module('exams').controller('TakeExamController', ['$scope', '$stateParams', 'Exams', '$http', '$location',
	function($scope, $stateParams, Exams, $http, $location) {
		// Controller Logic
		// ...
		// Find existing Exam

		$scope.totalScore = 0;
		$scope.currentScore = 0;



		$scope.findOne = function() {
			Exams.get({ 
				examId: $stateParams.examId
				}).$promise.then(function(data) {
					$scope.exam = data;
				    $scope.currentQuestion = data.questions[0];
					$scope.questionIndex = 0;
					$scope.timeLimit = $scope.exam.timeLimit * 60;
					$scope.$broadcast('timer-add-cd-seconds', $scope.timeLimit-1); 
					
					angular.forEach($scope.exam.questions, function(question){
						angular.forEach(question.answers, function(answer){
							$scope.totalScore += answer.weight;
						});
					});
			}, function(error) {
			    // error handler
			});
		};
		$scope.nextQuestion = function(){
			$scope.questionIndex++;
			$scope.currentQuestion = $scope.exam.questions[$scope.questionIndex];
		};
		$scope.prevQuestion = function(){
			$scope.questionIndex--;
			$scope.currentQuestion = $scope.exam.questions[$scope.questionIndex];
		};
		$scope.submitExam = function(){
			$scope.currentScore = 0;
			angular.forEach($scope.exam.questions, function(question){
				angular.forEach(question.answers, function(answer){
					if(answer.body === question.selectedAnswer)
						$scope.currentScore += answer.weight;
				});
			});
			$scope.percentage = ($scope.currentScore / $scope.totalScore) * 100;

			$scope.isPass = $scope.percentage > $scope.exam.passScore ? true : false;

			var examsTaken = {
				score: $scope.percentage,
				exam: $scope.exam._id,
				isPass: $scope.isPass
			};

			$http.put('/exams/saveExam/'+$scope.exam._id, examsTaken).success(function(response) {
				$location.path('exam-result/' + response._id);
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.$on('timer-stopped', function (event, data){
            console.log('Timer Stopped - data = ', data);
            $scope.submitExam();
        });


	}
]);