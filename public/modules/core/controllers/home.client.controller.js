'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$state', '$rootScope','Employers', 'Companies', 'Candidates', 'Socket',
	function($scope, Authentication, $state, $rootScope, Employers, Companies, Candidates , Socket) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		var user = $scope.authentication.user;
//starting angular-charts
$scope.data1 = {
		series: ['Sales', 'Income', 'Expense', 'Laptops', 'Keyboards'],
		data: [{
			x: "Sales",
			y: [100, 500, 0],
			tooltip: "this is tooltip"
		}, {
			x: "Not Sales",
			y: [300, 100, 100]
		}, {
			x: "Tax",
			y: [351]
		}, {
			x: "Not Tax",
			y: [54, 0, 879]
		}]
	};

	$scope.data2 = {
		series: ['500 Keyboards', '105 Laptops', '100 TVs'],
		data: [{
			x: "Sales",
			y: [100, 500, 0],
			tooltip: "this is tooltip"
		}, {
			x: "Income",
			y: [300, 100, 100]
		}, {
			x: "Expense",
			y: [351, 50, 25]
		}]
	}

	$scope.chartType = 'bar';

	$scope.config1 = {
		labels: false,
		title: "Products",
		legend: {
			display: true,
			position: 'left'
		},
		innerRadius: 0
	};

	$scope.config2 = {
		labels: false,
		title: "HTML-enabled legend",
		legend: {
			display: true,
			htmlEnabled: true,
			position: 'right'
		},
		lineLegend: 'traditional'
	}
//ending angular-charts
        
      
		if(!user)
			$state.go('home');
		else if(user.userType === 'employer'){
			console.log("EMPLOYER");
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
			$state.go('employerDashboard');
		}
		else if(user.userType === 'candidate'){
		
        		    
                  
        		 $rootScope.candidate = Candidates.get({
					candidate: $scope.authentication.user.candidate
				});
        	
			$state.go('candidate-home');
		}
		else if(user.userType === 'transition'){
			$state.go('transition');
		}
	}
]);