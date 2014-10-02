'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$state', '$rootScope','Employers', 'Companies', 'Candidates', 'Socket',
	function($scope, Authentication, $state, $rootScope, Employers, Companies, Candidates , Socket) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		var user = $scope.authentication.user;

		Socket.emit('message', {message: 'message'});


		Socket.on('entrance', function (data) {
		    console.log(data);
		    Socket.emit('my other event', { my: 'data' });
		  });
		  Socket.on('exit', function (data) {
		    console.log(data);
		    Socket.emit('my other event', { my: 'data' });
		  });
		  Socket.on('applied_on_job', function (data) {
		    console.log(data.candidate.displayName + ' applied on job : ' + data.job.title);
		    if(user.userType === 'employer')
		    	alert(data.candidate.displayName + ' applied on job : ' + data.job.title);
		  });


		if(!user)
			$state.go('home');
		else if(user.userType === 'employer'){
			$rootScope.employer = Employers.get({
				employerId: $scope.authentication.user.employer
			}, function(employer){
				$rootScope.company = Companies.get({
					companyId: employer.company
				});
			});
			$state.go('employerDashboard');
		}
		else if(user.userType === 'candidate'){
			$scope.candidate = Candidates.get({
					candidate: $scope.authentication.user.candidate
				});
			$state.go('candidate-home');
		}
	}
]);