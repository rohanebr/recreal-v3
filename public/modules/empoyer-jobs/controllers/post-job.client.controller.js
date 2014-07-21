'use strict';

angular.module('empoyer-jobs').controller('PostJobController', ['$scope', 'Industries','Countries', '$location', 'Authentication', 'Jobs',
	function($scope, Industries, Countries, $location, Authentication, Jobs) {
		$scope.user = Authentication.user;
		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');

		$scope.industries = Industries.getIndustries();
		$scope.countries = Countries.getCountries();
		// $scope.texting = IndustriesFactory.sayHello('world');

		$scope.skills = [];
		$scope.skills.push({
		        title: ''
		      });
		// Create new Job
		$scope.create = function() {
			// Create new Job object
			var job = new Jobs ({
				title: this.title,
				description: this.description,
				requirement: this.requirements,
				due_date: this.due_date,
				employee_type: this.employee_type,
				salary_range: this.salary_range,
				industry: this.industry,
				department: this.department,
				no_of_positions: this.no_of_positions,
				shift: this.shift,
				location: this.location,
				country: this.country,
				career_level: this.career_level,
				degree_title: this.degree_title,
				study_feild: this.study_feild,
				travel_required: this.travel_required,
				skills: this.skills
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
	        title: ''
	      });
	    };

	    $scope.removeSkill = function(index) {
	      $scope.skills.splice(index, 1);
	    };
	}
]);