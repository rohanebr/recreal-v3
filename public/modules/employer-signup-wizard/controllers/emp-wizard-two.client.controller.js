'use strict';


angular.module('employer-signup-wizard').controller('EmpWizardTwoController', ['$scope','$interval','Authentication','$state','$http','$location',
	function($scope,$interval,Authentication,$state,$http,$location) {
    $scope.authentication = Authentication;
    if (!$scope.authentication.user) 
   $state.go("home");
    $scope.latitude=0;
    $scope.longitude=0;
    $scope.myValue=true;
    var marker;
  var geocoder = new google.maps.Geocoder();

$scope.SaveAndRedirect = function()
{
  $http.post('/savelatlong',{user:$scope.authentication.user,latitude:marker.position.k,longitude:marker.position.B}).success(function(response){
$state.go('emp-job-post-one');


  });



};


$scope.Back = function()
{

$location.path("emp-wizard-one/"+$scope.authentication.user.activeToken);

};


$scope.LoadInitialData = function()
{

$http.post('/getCountryCity', {user:$scope.authentication.user}).success(function(response){



  geocoder.geocode( { 'address':response.city+","+response.country}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
       console.log(results[0].geometry.location.lat());
     $scope.latitude=results[0].geometry.location.lat();
     $scope.longitude=results[0].geometry.location.lng();
     var map = $scope.map;
   
    map.center=results[0].geometry.location;
    $scope.map.setCenter(results[0].geometry.location);
    console.log($scope.map);
     if(response.latitude!=0)
     {
       marker = new google.maps.Marker({
    position: new google.maps.LatLng(response.latitude, response.longitude),
    map: map,    
    draggable:true,
    animation: google.maps.Animation.DROP,
    title:"Hello World!"
});
     }
     else
     {

       marker = new google.maps.Marker({
    position: new google.maps.LatLng($scope.latitude, $scope.longitude),
    map: map,
    draggable:true,
    animation: google.maps.Animation.DROP,
    title:"Select your company location"
});
     }

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });


});



};


	
	}
]);