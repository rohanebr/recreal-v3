var distance = require('google-distance-matrix');
var geocoderProvider = 'google';
var httpAdapter = 'http';
// optionnal
var extra = {
    apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};

var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter);


exports.calculate=function(src,dest,maxdistance)
{
var origins = ['Rawalpindi, Pakistan'];
var destinations = ['Gulrez Housing Society,  Rawalpindi,  Pakistan'];
distance.mode('driving');

distance.matrix(src, dest, function (err, distances) {
geocoder.geocode(dest, function(err, res) {
     if (err) {
        return console.log(err);
    }
    if(!distances) {
        return console.log('no distances');
    }
    if (distances.status == 'OK') {
        var timetaken=distances.rows[0].elements[0].duration.text;

       
        for (var i=0; i < origins.length; i++) {
            for (var j = 0; j < destinations.length; j++) {
                var origin = distances.origin_addresses[i];
                var destination = distances.destination_addresses[j];
                if (distances.rows[0].elements[j].status == 'OK') {
                    var distance = distances.rows[i].elements[j].distance.text;
                     distance = distance.substring(0,distance.length-3);
                    
                           if(parseFloat(distance)<=parseFloat(maxdistance))
                           {
                             
                              return true;
                           }
                  
                } else {
                    console.log(destination + ' is not reachable by land from ' + origin);
                }
            }
        }
    }
});
    
 
});
return true;

};