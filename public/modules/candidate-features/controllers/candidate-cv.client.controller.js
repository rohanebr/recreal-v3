'use strict';

angular.module('candidate-features').controller('CandidateCvController', ['$scope','Industries','Countries', '$http', 'Authentication', 'Candidates', '$location', '$modal',
	function($scope, Industries,Countries, $http, Authentication, Candidates, $location, $modal) {
		$scope.user = Authentication.user;
		$scope.isEditing = false;
		$scope.industries = Industries.getIndustries();
		$scope.countries = Countries.getCountries();
		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');

		$scope.candidate = Candidates.get({ 
			candidateId: $scope.user.candidate
		}, function(candidate){

			if(!candidate.skills){
				$scope.candidate.skills =  [{title: ''}];
			}

			if(!candidate.educations){
				$scope.candidate.educations =  [{degree: ''}];
			}
			if(candidate.target_industries.length < 1){
				$scope.candidate.target_industries =  [{name: ''}];
			}
			if(candidate.target_locations.length < 1){
				$scope.candidate.target_locations =  [{name: ''}];
			}
		});	

		// Update existing Candidate
		$scope.update = function() {
			var candidate = $scope.candidate ;

			candidate.$update(function() {
				$location.path('candidates/' + candidate._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		
		//Skills
	    $scope.addSkill = function() {
	      $scope.candidate.skills.push({
	        title: ''
	      });
	    };

	    $scope.removeSkill = function(index) {
	      $scope.candidate.skills.splice(index, 1);
	    };

	    //Education
	     $scope.addEducation = function() {
	      $scope.candidate.educations.push({
	        title: ''
	      });
	    };

	    $scope.removeEducation = function(index) {
	      $scope.candidate.educations.splice(index, 1);
	    };

	    //Experience
	     $scope.addExperience = function() {
	      $scope.candidate.positions.push({
	        title: ''
	      });
	    };

	    $scope.removeExperience = function(index) {
	      $scope.candidate.positions.splice(index, 1);
	    };

	    //Projects
	     $scope.addProject = function() {
	      $scope.candidate.projects.push({
	        title: ''
	      });
	    };

	    $scope.removeProject = function(index) {
	      $scope.candidate.projects.splice(index, 1);
	    };

	    //Languages
	     $scope.addLanguage = function() {
	      $scope.candidate.languages.push({
	        title: ''
	      });
	    };

	    $scope.removeLanguage = function(index) {
	      $scope.candidate.languages.splice(index, 1);
	    };


	    $scope.newSkill = { title: '', experience: 1, level: 'Beginner' };
	    $scope.openSkillModal = function(skill) {
	      var modalInstance;
	      modalInstance = $modal.open({
	        templateUrl: '/modules/candidate-features/views/cv-partials/skill-partial.html',
	        controller: 'SkillModalCtrl',
	        resolve: {
	          skill: function() {
	            return angular.copy(skill);
	          }
	        }
	      });
	      modalInstance.result.then(function(result) {
	        var skill = result.skill;
	        if (result.action === 'delete') {
	        	angular.forEach($scope.candidate.skills, function(cSkill){
		          	if(cSkill._id === skill._id ){

						$http.post('/candidates/deleteSkill', cSkill).success(function(response) {
							//If successful we assign the response to the global user model
							// $scope.authentication.user = response;

							alert(response);

							//And redirect to the index page
							// $location.path('/');

						}).error(function(response) {
							$scope.error = response.message;
						});

		          		$scope.candidate.skills.splice($scope.candidate.skills.indexOf(cSkill), 1);
		          		
		          	}
		          });
		    } else {
		        skill.title = skill.title.trim();
		        if (skill._id !== undefined) {
		          angular.forEach($scope.candidate.skills, function(cSkill){
		          	if(cSkill._id === skill._id )
		          		cSkill.title = skill.title;
		          });
		        } else {
		          $scope.candidate.skills.push(skill);
		          $scope.newSkill = { title: '', experience: 1, level: 'Beginner' };
		        }
		    }
	      }, function() {
	        // $log.info('Modal dismissed at: ' + new Date());
	      });
	    };


	    $scope.openPictureModal = function() {
	      var modalInstance;
	      modalInstance = $modal.open({
	        templateUrl: '/modules/candidate-features/views/cv-partials/picture-partial.html',
	        controller: 'PictureModalCtrl',
	      });
	      modalInstance.result.then(function(result) {
	         $scope.candidate.picture_url = result.picture_url;
	      }, function() {

	      });
	    };



	}
]).controller('SkillModalCtrl', [
  '$scope', '$modalInstance', 'skill', function($scope, $modalInstance, skill) {

    $scope.skill = skill;

	$scope.ok = function (action) {
	$modalInstance.close({ action: action, skill: $scope.skill });
	};

	$scope.cancel = function () {
	$modalInstance.dismiss('cancel');

	};
  }
]).controller('PictureModalCtrl', [
  '$scope', '$modalInstance', '$upload', function($scope, $modalInstance, $upload) {

    var convert = function convertDataURIToBlob(dataURI, mimetype) {
		  var BASE64_MARKER = ';base64,';
		  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
		  var base64 = dataURI.substring(base64Index);
		  var raw = window.atob(base64);
		  var rawLength = raw.length;
		  var uInt8Array = new Uint8Array(rawLength);

		  for (var i = 0; i < rawLength; ++i) {
		    uInt8Array[i] = raw.charCodeAt(i);
		  }

		  var bb = new Blob([uInt8Array.buffer], {type : mimetype});
		  

		  return bb;
		}

	  $scope.upload = function(image){

	  		$scope.formData = convert(image.dataURL, image.type);

	  		$scope.upload = $upload.upload({
	        url: '/uploadpicture', //upload.php script, node.js route, or servlet url
	        //method: 'POST' or 'PUT',
	        method: 'POST',
	        //headers: {'header-key': 'header-value'},
	        headers: {'Content-Type': 'undefined'},
	        //withCredentials: true,
	        data: {myObj: $scope.myModelObj},
	        file: $scope.formData, // or list of files ($files) for html5 only
	        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
	        // customize file formData name ('Content-Desposition'), server side file variable name. 
	        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
	        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
	        //formDataAppender: function(formData, key, val){}
	      }).progress(function(evt) {
	        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
	      }).success(function(data, status, headers, config) {
	        // file is uploaded successfully
	        $scope.response = data;
	        console.log(data);
	        $modalInstance.close({picture_url: data});
	      });
	  };

	$scope.ok = function (action) {
	$modalInstance.close({ action: action, skill: $scope.skill });
	};

	$scope.cancel = function () {
	$modalInstance.dismiss('cancel');

	};
  }
]);