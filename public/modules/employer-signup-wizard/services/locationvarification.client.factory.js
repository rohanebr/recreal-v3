angular.module('employer-signup-wizard').factory('locationVarification', ['$rootScope', 'geolocation', '$q',
    function($rootScope, geolocation, $q) {

        return {
            validateLocation: function(city, country, lat, lng) {
                var deferred = $q.defer();
                if (lat != 0) {
                    var geocoder = new google.maps.Geocoder();

                    var latlng = new google.maps.LatLng(lat, lng);
                    geocoder.geocode({
                        'latLng': latlng
                    }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[1]) {
                                var citycountry = results[1].formatted_address;
                                var res = citycountry.split(",");
                                var countryFromDB = res[res.length - 1].trim();
                                var cityFromDB = res[res.length - 2].trim();
                                console.log(cityFromDB+" "+countryFromDB);
                                if (countryFromDB == country && cityFromDB == city)
                                    deferred.resolve(['true']);
                                else
                                    deferred.resolve(['false']);
                            }
                        }
                    });
                    return deferred.promise;
                }
            }
        };
    }
]);