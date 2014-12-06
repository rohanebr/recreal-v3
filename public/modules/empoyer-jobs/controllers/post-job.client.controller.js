'use strict';

var gt=angular.module('empoyer-jobs');
gt.controller('PostJobController', ['$scope', 'Industries','Countries','Studyfields', '$location', 'Authentication', 'Jobs','$rootScope',
	function($scope, Industries, Countries,Studyfields, $location, Authentication, Jobs,$rootScope) {
		$scope.user = Authentication.user;
		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');
		

		$scope.industries = Industries.getIndustries();
		
		Countries.getCountries(function(countries){
			$scope.countries = countries;
		});
		$scope.studyFields = Studyfields.getStudyFields();
   
		$scope.skills = [];
		$scope.skills.push({
		        title: '',
		        level: 'Beginner'
		      });
		$scope.certificates = [];
		$scope.certificates.push({
	        name: ''
	      });

		$scope.isTabMap = false;

		// $scope.setMapSelected =  function(){
		// 	$scope.isTabMap = true;
		// };

		// Create new Job
		$scope.create = function() {
			$scope.position=$scope.map.markers[0].position;
		
			// Create new Job object
			var job = new Jobs ({
				title: this.title,
				description: this.description,
				requirement: this.requirements,
				due_date: this.due_date,
				gender: this.gender,
				work_permit: this.work_permit,
				employee_type: this.employee_type,
				salary_range: this.salary_range,
				industry: this.industry,
				department: this.department,
				no_of_positions: this.no_of_positions,
				shift: this.shift,
				location: this.location,
				country: this.country,
				career_level: this.career_level,
				experience: this.experience,
				degree_title: this.degree_title,
				study_field: this.study_field,
				travel_required: this.travel_required,
				skills: this.skills,
				certificates: this.certificates,
				//k = latitude
				//B = longitude
				coordinates: {
					latitude:$scope.position.k,
					longitude:$scope.position.B
				}
			});

			// Redirect after save
			job.$save(function(response) {
				$location.path('jobs/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
			this.description = '';
		};

		//Skills
	    $scope.addSkill = function() {
	      $scope.skills.push({
	        title: '',
	        level: 'Beginner'
	      });
	    };

	    $scope.removeSkill = function(index) {
	      $scope.skills.splice(index, 1);
	    };

	    //Certificates
	    $scope.addCertificate = function() {
	      $scope.certificates.push({
	        name: ''
	      });
	    };

	    $scope.removeCertificate = function(index) {
	      $scope.certificates.splice(index, 1);
	    };


	    $scope.bootupmapaccordingtogeolocation=function()
	    {
          $scope.lat=$rootScope.coords.lat;
          $scope.longi=$rootScope.coords.longi;

			console.log($scope.lat);
	    }


	}
]);