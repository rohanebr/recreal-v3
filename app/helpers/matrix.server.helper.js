var distance = require('google-distance-matrix');

exports.calculate=function(src,dest)
{
var origins = ['33.5996695,73.0259624'];
var destinations = ['33.608626199999996,73.0214707'];
distance.mode('driving');
distance.matrix(origins, destinations, function (err, distances) {

    
   if (err) {
        return console.log(err);
    }
    if(!distances) {
        return console.log('no distances');
    }
    if (distances.status == 'OK') {
        var timetaken=distances.rows[0].elements[0].duration.text;
        console.log(timetaken);
        for (var i=0; i < origins.length; i++) {
            for (var j = 0; j < destinations.length; j++) {
                var origin = distances.origin_addresses[i];
                var destination = distances.destination_addresses[j];
                if (distances.rows[0].elements[j].status == 'OK') {
                    var distance = distances.rows[i].elements[j].distance.text;

                    console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                } else {
                    console.log(destination + ' is not reachable by land from ' + origin);
                }
            }
        }
    }
});

};