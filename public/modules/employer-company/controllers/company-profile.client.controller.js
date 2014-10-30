'use strict';

angular.module('employer-company').controller('CompanyProfileController', ['$scope','$http','Industries', 'Authentication', 'Employers', 'Companies', '$location', '$modal',
	function($scope, $http, Industries, Authentication, Employers, Companies, $location,  $modal) {
		$scope.user = Authentication.user;
		$scope.industries = Industries.getIndustries();
		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');

		// Find existing Employer
		// $scope.findOne = function() {
		// 	$scope.employer = Employers.get({ 
		// 		employerId: $scope.user.employer
		// 	}, function(employer){
		// 		$scope.company = Companies.get({
		// 			companyId: employer.company
		// 		});
		// 	});
		// };


		$scope.findOne = function(){
			$scope.employer = Employers.get({
				employerId: $scope.user.employer
			}, function(employer){
				$scope.company = Companies.get({
					companyId: employer.company
				});
			});
		};

		
		//Speciality
	    $scope.addSpeciality = function() {
	      $scope.company.specialties.push({
	        name: ''
	      });
	    };

	    $scope.removeSpeciality = function(index) {
	      $scope.company.specialties.splice(index, 1);
	    };

		// Update existing Company
		$scope.update = function() {
			var company = $scope.company ;

			company.$update(function() {
				$location.path('company-profile-view');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.openPictureModal = function() {
	      var modalInstance;
	      modalInstance = $modal.open({
	        templateUrl: '/modules/employer-company/views/logo/logo-partial.html',
	        controller: 'PictureModalCtrl',
	      });
	      modalInstance.result.then(function(result) {
	         $scope.company.logo_url = result.logo_url;
	      }, function() {

	      });
	    };
	}
]).controller('PictureModalCtrl', ['$scope', '$modalInstance', '$upload', function($scope, $modalInstance, $upload) {

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
	        $modalInstance.close({logo_url: data});
	      });
	  };

	$scope.upload = function (action) {
	$modalInstance.close({ action: action, logo_url: $scope.logo_url });
	};

	$scope.cancel = function () {
	$modalInstance.dismiss('cancel');

	};
  }
]);
	