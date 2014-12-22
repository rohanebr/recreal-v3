'use strict';

angular.module('employer-signup-wizard').controller('EmpWizardOneController', ['$scope', '$http', 'Industries', 'Countries', '$rootScope', 'geolocation', '$stateParams', '$state', 'Authentication','$modal',
    function($scope, $http, Industries, Countries, $rootScope, geolocation, $stateParams, $state, Authentication,$modal) {
        // Controller Logic
        // ...
        var city1 = "";
        var country1 = "";
        $scope.gotCompanyFromDB = false;
        $scope.user = Authentication.user;
        var lat = 0,
            lng = 0;
        $rootScope.coords = {};
        $scope.company = {
            website: "",
            coordinates: {
                longitude: 0,
                latitude: 0
            }
        };
        $scope.employer = {};
        $scope.company.specialities = [];
        $rootScope.coords = {};

        $scope.newSpeciality = {
            name: ''
        };
        $scope.employer.role = "Admin";
        $scope.user = '';
        //Load initial data
        $scope.LoadInitialData = function() {
            if ($stateParams.tokenId) {
                $http.post('/validatetoken', {
                    token: $stateParams.tokenId
                }).success(function(response) {
                    $scope.user = response.user;
                    console.log(response.user+" "+response.company);
                    if (response.company!=null) {
                        $scope.company = response.company;
                        
                        $scope.gotCompanyFromDB = true;
                    }
                    console.log(response);
                    if ($scope.user.user == "nothing") {

                        $state.go('home');

                    } else {

                        $scope.authentication = Authentication;
                        $scope.authentication.user = response.user;
                        if(!$scope.gotCompanyFromDB)
                        $scope.company.specialities.push({
                            name: 'Product Development'
                        });
                        $scope.industries = Industries.getIndustries();
                        Countries.getCountries(function(countries) {
                            $scope.countries = countries;
                            // $scope.countries.splice(0, 1);
                            if (!$scope.gotCompanyFromDB) {
                                $scope.company.country = $scope.countries[1];
                                $scope.getCountryCities();

                            } else {
                                angular.forEach($scope.countries, function(country) {

                                    country1 = $scope.company.country;
                                    if (country1 == country.name) {
                                        $scope.company.country = country;
                                        $scope.getCountryCities();
                                    }
                                });


                            }

                        });
                        $scope.company.industry = $scope.industries[0].name;
                        $scope.company.company_size = '1 - 10';
                        $scope.company.company_type = 'Sole Proprietorship';
                        if (!$scope.gotCompanyFromDB)
                            InitlocationData();
                    }


                }).error(function(response) {
                    $scope.error = response.message;

                });

                console.log($stateParams.tokenId);
            } else {
                $state.go('home');
            }

        };
        var InitlocationData = function() {
            var geocoder = new google.maps.Geocoder();
            geolocation.getLocation().then(function(data) {
                lat = parseFloat(data.coords.latitude);
                lng = parseFloat(data.coords.longitude);
                $scope.company.coordinates.longitude = lng;
                $scope.company.coordinates.latitude = lat;
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

                            angular.forEach($scope.countries, function(country) {
                                if ($scope.gotCompanyFromDB)
                                    country1 = $scope.company.country;
                                if (country1 == country.name) {
                                    $scope.company.country = country;
                                    $scope.getCountryCities();
                                }
                            });
                        } else {
                            $scope.company.country = $scope.countries[0];
                            $scope.getCountryCities();
                        }
                    } else {
                        $scope.company.country = $scope.countries[0];
                        $scope.getCountryCities();
                    }
                });

            });
        }




        $scope.getCountryCities = function() {
            var foundit = false;
           
            $http.get('/countries/' + $scope.company.country.name).success(function(response) {
                $scope.cities = response.cities;
                angular.forEach($scope.cities, function(city) {
                    console.log(city.name + " " + city1);
                    if ($scope.gotCompanyFromDB)
                        city1 = $scope.company.city;
                    if (city.name == city1) //fuck my life
                    {
                        console.log(city);
                        $scope.company.city = city;
                        foundit = true;
                    }
                });
                if (!foundit)
                    $scope.company.city = $scope.cities[0];
            });
        };

        $scope.SaveAndRedirect = function() {


            $scope.success = $scope.error = null;
            $http.post('/SaveEmpSignUpWizardOneData', {
                user: $scope.user,
                company: $scope.company,
                employer: $scope.employer
            }).success(function(response) {
                $state.go('emp-wizard-two');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        //Add specialities
        $scope.addSpeciality = function() {
            if ($scope.newSpeciality.name != '') {
                $scope.company.specialities.push($scope.newSpeciality);
                $scope.newSpeciality = {
                    name: ''
                };
            }

        };
        //Remove Speciality
        $scope.removeSpeciality = function(index) {
            $scope.company.specialities.splice(index, 1);
        };


      $scope.openEmpPictureModal = function() {
        var modalInstance;
        modalInstance = $modal.open({
          templateUrl: '/modules/employer-company/views/picture-partial.html',
          controller: 'EmpPictureModalCtrl',
        });
        modalInstance.result.then(function(result) {
           $scope.this.user.picture_url = result.picture_url;
        }, function() {

        });
      };

      $scope.openCompPictureModal = function() {
          var modalInstance;
          modalInstance = $modal.open({
            templateUrl: '/modules/employer-company/views/logo/logo-partial.html',
            controller: 'CompPictureModalCtrl',
          });
          modalInstance.result.then(function(result) {
             $scope.company.logo_url = result.logo_url;
          }, function() {

          });
        };


    }


]).controller('EmpPictureModalCtrl', [
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
            url: '/uploadEmpPicture', //upload.php script, node.js route, or servlet url
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
    $modalInstance.close({ action: action, picture_url: $scope.picture_url });
    };

    $scope.cancel = function () {
    $modalInstance.dismiss('cancel');

    };
 }
]).controller('CompPictureModalCtrl', ['$scope', '$modalInstance', '$upload', function($scope, $modalInstance, $upload) {

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
            url: '/uploadCompPicture', //upload.php script, node.js route, or servlet url
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

    $scope.ok = function (action) {
    $modalInstance.close({ action: action, logo_url: $scope.logo_url });
    };

    $scope.cancel = function () {
    $modalInstance.dismiss('cancel');

    };
  }
]);
    