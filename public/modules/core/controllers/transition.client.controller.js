'use strict';

angular.module('core').controller('TransitionController', ['$scope','Authentication', '$http','$state', '$rootScope','Employers', 'Companies', 'Candidates', 'Socket',
	function($scope,Authentication,$http, $state, $rootScope, Employers, Companies, Candidates , Socket) {
		$scope.authentication = Authentication;
		console.log(Socket.gai);
		console.log($rootScope.gai);
		Socket.gai="this is changed now";
        $rootScope.gai="this is also changed now";
      



       




$scope.becomeEmployer=function (){
	
if($scope.authentication.user.userType=='transition'){
	
  $http.put('/users/setUserType/' + $scope.authentication.user._id,{userType:'employer'}).success(function(user) {

		Socket.on('applied_on_job', function (data) {
        		    console.log(data.candidate.displayName + ' applied on job : ' + data.job.title);
        		    if(user.userType === 'employer')
        		    	alert(data.candidate.displayName + ' applied on job : ' + data.job.title);
        		  });
        		 

                            Socket.emit('user_data',user);
                  		  

			$rootScope.employer = Employers.get({
				employerId: $scope.authentication.user.employer
			}, function(employer){
				$rootScope.company = Companies.get({
					companyId: employer.company
				});
			});
			$state.go('employerDashboard');					
             	});
}
	};
	$scope.becomeEmployee=function(){
	if($scope.authentication.user.userType=='transition'){	
		  $http.put('/users/setUserType/' + $scope.authentication.user._id,{userType:'candidate'}).success(function(user) {
								console.log(user);
             	});
   
                    Socket.emit('user_data',user);
        		 $rootScope.candidate = Candidates.get({
					candidate: $scope.authentication.user.candidate
				});
        	
			$state.go('candidate-home');
}
	};











	}




	
]);