'use strict';

angular.module('candidate-signup-wizard').controller('CandidateWizardOneController', ['$scope','$http','$state','$stateParams','Authentication','$modal','Countries','geolocation',
	function($scope,$http,$state,$stateParams,Authentication,$modal,Countries,geolocation) {
		// Controller Logic
		// ...
        var city1 = "";
        var country1 = "";
        var lat = 0,
        lng = 0;
        var countrycityset=true;
		$scope.candidate={
             coordinates: {
                longitude: 0,
                latitude: 0
            },
            country:{},
            city:{}
        };
        $scope.LoadInitialData = function() {
            if ($stateParams.tokenId) 
            {
                $http.post('/validatetoken', {
                    token: $stateParams.tokenId
                }).success(function(response) {
                    $scope.user = response.user;
                    
                    if ($scope.user.user == "nothing") {
                        $state.go('home');
                    } else {
                        $scope.authentication = Authentication;
                        $scope.authentication.user = response.user;
                        $scope.candidate = response.candidate;
                        $scope.candidate.visa_status = 'No Visa';
                        $scope.candidate.gender = 'Male';
                        $scope.candidate.career_level = 'Student/Internship';
                        $scope.candidate.employee_status = 'Part Time';
                        $scope.candidate.employee_type = 'Permanent';
                        $scope.candidate.salary_expectation = '$1000 - $2000';
                        if($scope.candidate.country==='choose a country')
                            countrycityset=false;
                        Countries.getCountries(function(countries) {
                            $scope.countries = countries;
                            console.log($scope.candidate.country);
                            if(!countrycityset)
                            {
                                console.log($scope.countries[1]);
                                $scope.candidate.country = $scope.countries[1];
                                $scope.getCountryCities();
                                InitlocationData();
                            }
                            else
                            {
                                angular.forEach($scope.countries, function(country) {
                                    if($scope.candidate.country==country.name)
                                    { 
                                        $scope.candidate.country=country;
                                        $scope.getCountryCities();
                                    }
                                });
                            }
                        });
                    }
                }).error(function(response) {
                    $scope.error = response.message;
                    });
            } else {
                $state.go('home');
            }
        };



		$scope.SaveAndRedirect = function() {
            console.log($scope.candidate);
            $scope.success = $scope.error = null;
            if($scope.candidate.stage=='One')
                $scope.candidate.stage = 'Two';
            $http.post('/savecandidatewizardonedata', {
                    candidate: $scope.candidate
                }).success(function(response) {
                    $state.go('candidate-wizard-two');
                }).error(function(response) {
                     $scope.error = response.message;
                });
        };


            var InitlocationData = function() {
                var geocoder = new google.maps.Geocoder();
                geolocation.getLocation().then(function(data) {
                    lat = parseFloat(data.coords.latitude);
                    lng = parseFloat(data.coords.longitude);
                    $scope.candidate.coordinates.longitude = lng;
                    $scope.candidate.coordinates.latitude = lat;
                    var latlng = new google.maps.LatLng(lat, lng);
                    geocoder.geocode({
                        'latLng': latlng
                    }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[1]) {
                                var citycountry = results[1].formatted_address;
                                var res = citycountry.split(",");
                                country1 = res[res.length - 1];
                                city1 = res[res.length - 2];
                                city1 = city1.trim();
                                country1 = country1.trim();
                                console.log(country1+" "+city1);
                                angular.forEach($scope.countries, function(country) {
                                    if (countrycityset)
                                        country1 = $scope.candidate.country;
                                    if (country1 == country.name) {
                                        $scope.candidate.country = country;
                                        $scope.getCountryCities();
                                    }
                                });
                            } else {
                                $scope.candidate.country = $scope.countries[0];
                                $scope.getCountryCities();
                            }
                        } else {
                            $scope.candidate.country = $scope.countries[0];
                            $scope.getCountryCities();
                        }
                    });

                });
            };


            $scope.getCountryCities = function() {
                var foundit = false;
                console.log($scope.candidate.country);
                $http.get('/countries/' + $scope.candidate.country.name).success(function(response) {
                    $scope.cities = response.cities;
                    angular.forEach($scope.cities, function(city) {
                       
                        if (countrycityset)
                            city1 = $scope.candidate.location;
                        if (city.name == city1) //fuck my life
                        {
                            console.log(city);
                            $scope.candidate.location = city;
                            foundit = true;
                        }
                    });
                    if (!foundit)
                        $scope.candidate.location = $scope.cities[0];
                });
            };


            $scope.openCandidatePictureModal = function() {
                var modalInstance;
                modalInstance = $modal.open({
                  templateUrl: '/modules/candidate-features/views/cv-partials/picture-partial.html',
                  controller: 'CandidatePictureModalCtrl',
                });
                modalInstance.result.then(function(result) {
                   $scope.candidate.picture_url = result.picture_url;
                }, function() {

                });
            };

	}
]).controller('CandidatePictureModalCtrl', [
  '$scope', '$modalInstance', '$upload','Authentication', function($scope, $modalInstance, $upload,Authentication) {

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
      console.log($scope.image2);

            $scope.formData = convert(image.dataURL, image.type);

            $scope.upload = $upload.upload({
            url: '/uploadCandidatePicture', //upload.php script, node.js route, or servlet url
            //method: 'POST' or 'PUT',
            method: 'POST',
            //headers: {'header-key': 'header-value'},
            headers: {'Content-Type': 'undefined'},
            //withCredentials: true,
            data: {myObj: "displaypic"},
           
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
    $modalInstance.close({ action: action, picture_url: $scope.picture_url });
    };

    $scope.cancel = function () {
    $modalInstance.dismiss('cancel');

    };
 }
]);