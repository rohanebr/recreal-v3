'use strict';

angular.module('core').controller('TransitionController', ['$scope','Authentication', '$http','$state', '$rootScope','Employers', 'Companies', 'Candidates', 'Socket','$location',
	function($scope,Authentication,$http, $state, $rootScope, Employers, Companies, Candidates , Socket,$location) {
		$scope.authentication = Authentication;
		

$scope.formData = {userType:''};
	
	// function to process the form
	
$scope.$watch('formData.userType', function() {

	if($scope.formData.userType=="Employer")
	{
		becomeEmployer();
	}

       });
       
       $scope.$watch('formData.importCV',function(){
       if($scope.formData.importCV=='import')
       {



       	
       }
   else if($scope.formData.importCV=='dontimport')
   {

   	becomeEmployee();
   }



       });



var becomeEmployer=function (){
	console.log($scope.authentication.user.userType);
if($scope.authentication.user.userType=='transition'){
	
  $http.put('/users/setUserType/' + $scope.authentication.user._id,{userType:'employer'}).success(function(user) {

		Socket.on('applied_on_job', function (data) {
        		    console.log(data.candidate.displayName + ' applied on job : ' + data.job.title);
        		    if(user.userType === 'employer')
        		    	alert(data.candidate.displayName + ' applied on job : ' + data.job.title);
        		  });
        		 

                           
                  		  

			$rootScope.employer = Employers.get({
				employerId: $scope.authentication.user.employer
			}, function(employer){
				$rootScope.company = Companies.get({
					companyId: employer.company
				});
			});
			
$scope.authentication.user.userType="employer";
			$location.path('/company-profile');					
             	});
}
	};
	var becomeEmployee=function(){
	if($scope.authentication.user.userType=='transition'){	
		  $http.put('/users/setUserType/' + $scope.authentication.user._id,{userType:'candidate'}).success(function(user) {
								console.log(user);
             	});
   
                  
        		 $rootScope.candidate = Candidates.get({
					candidate: $scope.authentication.user.candidate
				});
        	$scope.authentication.user.userType="candidate";
     		 $state.go('candidate-home');
}
	};











	}




	
]);