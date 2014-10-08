'use strict';

// Threads controller
angular.module('threads').controller('ThreadsController', ['$scope', '$stateParams','$location', 'Authentication', 'Threads', '$http',
	function($scope, $stateParams, $location, Authentication, Threads, $http ) {
		$scope.authentication = Authentication;

		// Create new Thread
		$scope.create = function() {
			// Create new Thread object
			var thread = new Threads ({
				name: this.name
			});

			// Redirect after save
			thread.$save(function(response) {
				$location.path('threads/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Thread
		$scope.remove = function( thread ) {
			if ( thread ) { thread.$remove();

				for (var i in $scope.threads ) {
					if ($scope.threads [i] === thread ) {
						$scope.threads.splice(i, 1);
					}
				}
			} else {
				$scope.thread.$remove(function() {
					$location.path('threads');
				});
			}
		};

		// Update existing Thread
		$scope.update = function() {
			var thread = $scope.thread ;

			thread.$update(function() {
				$location.path('threads/' + thread._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Threads
		$scope.find = function() {
			$scope.threads = Threads.query();
		};

		// Find a list of Threads
		$scope.findUserThreads = function() {
			console.log("FINDUSERTHREADS RAN");
				$http.get('/threads/getUserThreads/' + $scope.authentication.user._id).success(function(threads) {
				$scope.threads = threads;
			});
		};

		// Find existing Thread
		$scope.findOne = function() {
			$scope.thread = Threads.get({ 
				threadId: $stateParams.threadId
			});
		};
	}
]);