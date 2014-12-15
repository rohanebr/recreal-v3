'use strict';

angular.module('empoyer-jobs').controller('EmpJobPostOneController', ['$scope','$http', '$location','Jobs', '$stateParams','Authentication','$state','Countries','locationVarification',
	function($scope,$http,$location,Jobs, $stateParams,Authentication,$state,Countries,locationVarification) {
		// Controller Logic
		// ...
		// $scope.industries = Industries.getIndustries();
		$scope.country={};

		$scope.city={};
       $scope.user=Authentication.user;
       if(!$scope.user)
          $state.go('home');

		$scope.job = {};
		$scope.job.industry = {};	
		$scope.job.coordinates={};

		//checks whether if this is going to create or update a job 
		$scope.initialize = function(){
			if(!$stateParams.jobId){    		// new job
				LoadDefaultData();
			}
			else{								//update old job
				findOne();
			}
		}

		var LoadDefaultData = function(){
			 $http.post('/getCompanyByUserId', {
                    id: $scope.user._id
                }).success(function(response){
			$scope.job.employee_type = "Contract";
			$scope.job.employee_status = "Full Time";
			$scope.job.shift = "Morning";
			$scope.job.no_of_positions = "1";
			$scope.job.travel_required = "No Travelling";
			$scope.job.visa_status = "Citizen";
			$scope.job.salary_range = "Less than $1000";
			$scope.job.country=response.country;
			$scope.job.city=response.city;
			$scope.job.coordinates.latitude=response.latitude;
			$scope.job.coordinates.longitude=response.longitude;
			getCountry();
			getIndustry();

                });
		
		};
        $scope.getCountryCities = function() {
            var foundit = false;
            var city1;
            $http.get('/countries/' + $scope.country.name).success(function(response) {
                $scope.cities = response.cities;
                angular.forEach($scope.cities, function(city) {
                  
                   city1=$scope.job.city;
                    if (city.name ==city1) //fuck my life
                    {
                        console.log(city);
                        $scope.city = city;
                        foundit = true;
                    }
                });
                if (!foundit)
                    $scope.city = $scope.cities[0];
            });
        };
        var getCountry  = function(){
               var foundit=false;
               var country1;
               Countries.getCountries(function(countries) {
                            $scope.countries = countries;
                         
                                angular.forEach($scope.countries, function(cunt) {

                                    country1 = $scope.job.country;
                                    if (country1 == cunt.name) {
                                    	foundit=true;
                                        $scope.country = cunt;
                                        $scope.getCountryCities();
                                                                        }
                                });

                        if(!foundit){
                        	$scope.country=$scope.countries[0];
                        	$scope.getCountryCities();
                        }
                           

                        });


        };
		var getIndustry = function(){	
			$http.get('/industries').success(function (response){
				$scope.industries = response;
				$scope.job.industry = $scope.industries[0];
				$scope.getIndustryJobRoles();
			});
		};

		$scope.getIndustryJobRoles = function(){
			$http.get('/industries/'+ $scope.job.industry.name).success(function (response){
				$scope.job_roles = response.job_roles;
				$scope.job.job_role = $scope.job_roles[0];
				$scope.job.title = $scope.job.job_role.name;
				$scope.job.responsibilities = $scope.job.job_role.responsibilities;
				
			});
		};
		$scope.bindJobRoles = function(jobRole){
			$scope.job.title = jobRole.name
			$scope.job.educations = jobRole.educations;
			$scope.job.educations = jobRole.educations;
			$scope.job.qualifications = jobRole.qualifications;
			$scope.job.skills = jobRole.skills;
		
		};
		// Find existing Job
		var findOne = function() {
      		
			$http.get('/industries').success(function (response){
				$scope.industries = response;
				
				//get the job
				Jobs.get({ 
					jobId: $stateParams.jobId
				}, function(job){
					$scope.job = job;
					
					getCountry();
					$scope.job.due_date=new Date($scope.job.due_date);
					//get industry job_roles
					$http.get('/industries/'+ $scope.job.industry).success(function (response){
						$scope.job_roles = response.job_roles;

						//set industry
						angular.forEach($scope.industries, function(industry){
							if(industry.name === $scope.job.industry){
								$scope.job.industry = industry;
							}
						});

						// set job_role
						angular.forEach($scope.job_roles, function(job_role){
							if(job_role._id == $scope.job.job_role){
								// never executes. even when the statement is true
								$scope.job.job_role = job_role;
							}
						});
					});
				});
			});

                
	
		};

					

		$scope.SaveAndRedirect = function() {
			$scope.success = $scope.error = null;
            $scope.job.country=$scope.country.name;
            $scope.job.city=$scope.city.name;
            locationVarification.validateLocation().then(function(response){
            	if(response[0]=='false')
            	{
   				 var geocoder = new google.maps.Geocoder();
                       geocoder.geocode({
                    'address': $scope.job.city + "," + $scope.job.country
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        console.log(results[0].geometry.location.lat());
                        $scope.job.coordinates.latitude = results[0].geometry.location.lat();
                        $scope.job.coordinates.longitude = results[0].geometry.location.lng();
                                              
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });

            	}

            $scope.job.industry = $scope.job.industry.name;
			$scope.job.job_role = $scope.job.job_role._id;

			if(!$stateParams.jobId){    		// new job
				$http.post('/SaveEmpJobPostOneData', $scope.job).success(function(response) {
					$location.path('emp-job-post-two/' + response._id);
				}).error(function(response) {
					$scope.error = response.message;
				});
			}
			else{								//update old job
				var job = $scope.job ;
				job.company = job.company._id;	// find job from backend returns populated company which produces error while saving
				job.$update(function() {
					$location.path('emp-job-post-two/' + job._id);
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			}














            });

		};
	}
]);