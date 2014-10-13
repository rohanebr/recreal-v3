'use strict';

angular.module('exams').controller('TakeExamController', ['$scope', '$stateParams', 'Exams',
	function($scope, $stateParams, Exams) {
		// Controller Logic
		// ...
		// Find existing Exam

		$scope.totalScore = 0;
		$scope.currentScore = 0;

		$scope.givenAnswers = [];


		$scope.findOne = function() {
			Exams.get({ 
				examId: $stateParams.examId
				}).$promise.then(function(data) {
					$scope.exam = data;
				    $scope.currentQuestion = data.questions[0];
					$scope.questionIndex = 0;


					angular.forEach($scope.exam.questions, function(question){
						angular.forEach(question.answers, function(answer){
							$scope.totalScore = answer.weight;
						});
					});
			}, function(error) {
			    // error handler
			});
		};
		$scope.nextQuestion = function(){
			$scope.questionIndex++;
			$scope.currentQuestion = $scope.exam.questions[$scope.questionIndex];

			

			givenAnswers.push({
				answer: $scope.answer,
				index: $scope.questionIndex++				
			});

		};
		$scope.prevQuestion = function(){
			$scope.questionIndex--;
			$scope.currentQuestion = $scope.exam.questions[$scope.questionIndex];
		};
		$scope.submitExam = function(){
			
		};
	}
]);