'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$state', '$rootScope','Employers', 'Companies', 'Candidates', 'Socket',
	function($scope, Authentication, $state, $rootScope, Employers, Companies, Candidates , Socket) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		var user = $scope.authentication.user;

		if(!user)
			$state.go('home');
		else if(user.userType === 'employer'){
		    Socket.on('applied_on_job', function (data) {
        		    console.log(data.candidate.displayName + ' applied on job : ' + data.job.title);
        		    if(user.userType === 'employer')
        		    	alert(data.candidate.displayName + ' applied on job : ' + data.job.title);
        		  });
        		  Socket.on('entrance', function (data) {

                            Socket.emit('user_data',user);
                  		  });

                  		     Socket.on('entrance_response',function(data)
                                  		  {
                                  		  console.log(data);

                                  		  }
                                  		  );
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
		Socket.on('entrance', function (data) {
        		    console.log(data);
                    Socket.emit('user_data',user);
        		  });

        		   Socket.on('entrance_response',function(data)
        		  {
        		  console.log(data);

        		  }
        		  );
			$scope.candidate = Candidates.get({
					candidate: $scope.authentication.user.candidate
				});
			$state.go('candidate-home');
		}
	}
]);