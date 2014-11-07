'use strict';

angular.module('employer-company').controller('EmployerProfileController', ['$scope','$http', 'Countries', 'Authentication','Employers', '$location','$modal',
	function($scope,$http, Countries, Authentication, Employers, $location, $modal) {
		$scope.user = Authentication.user;
		$scope.countries = Countries.getCountries();
		$scope.isEditing = false;
		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/signin');
		
		// Find existing Employer
		$scope.findOne = function() {
			$scope.employer = Employers.get({ 
				employerId: $scope.user.employer
			});
		};

// 	$scope.myCtrl = function() {
// 			var divisionOptions = ["Accounts", "Sales", "Business", "Marketing"];
// 			var departmentOptions = [["Finance"],
//                ["Admin"],
//                ["Software"],
//                ["HR"]];
// // 
// 			    $scope.division = divisionOptions;
// 			    $scope.department = []; // we'll get these later
// 			    $scope.getDepartment = function(){
// 			        // just some silly stuff to get the key of what was selected since we are using simple arrays.
// 			        var key = $scope.division.indexOf($scope.division);
// 			        // Here you could actually go out and fetch the options for a server.
// 			        var myNewOptions = departmentOptions[key];
// 			        // Now set the options.
// 			        // If you got the results from a server, this would go in the callback
// 			        $scope.department = myNewOptions;
// 			    };






		// Update existing Employer
		$scope.update = function() {
			var employer = $scope.employer ;

			employer.$update(function() {
				$location.path('employer-profile-view');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.openPictureModal = function() {
        var modalInstance;
        modalInstance = $modal.open({
          templateUrl: '/modules/employer-company/views/picture-partial.html',
          controller: 'PictureModalCtrl',
        });
        modalInstance.result.then(function(result) {
           $scope.this.user.picture_url = result.picture_url;
        }, function() {

        });
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

	$scope.upload = function (action) {
	$modalInstance.close({ action: action, picture_url: $scope.picture_url });
	};

	$scope.cancel = function () {
	$modalInstance.dismiss('cancel');

	};
 }
]);