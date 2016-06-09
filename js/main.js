// initMap

var map;
var marker;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
    marker = new google.maps.Marker({
        position: {lat: -34.397, lng: 150.644},
        map: map
    });
}

$(document).ready(function(){
    
    var fibonacciPoints = [];
    
    // Add point on map for each fibonacci number
    function addFibonacciMarkers(){
        var fibonacciMarker;
        
        for(var i = 0; i < fibonacciPoints.length; i++) {
            fibonacciMarker = new google.maps.Marker({
                position: fibonacciPoints[i].latLng,
                map: map,
                title: fibonacciPoints[i].number.toString()
            });
        }
    }
    
    // Set bearing for fibonacci points
    var bearing = 0;
    function fibonacciBearing() {
        if(bearing < 360 - 25){
            bearing += 25;
        } else {
            bearing = 0;
        }
        return bearing;
    }
    
    // Calculate fibonacci numbers and get a position for each
    function positionFibonacciPoints(position){
    
        var fibonacci = 0;
        var a = 0;
        var b = 1;
        
        while(fibonacci < 4000000){
            fibonacci = a + b;
            a = b;
            b = fibonacci;
            
            var fibonacciPoint = {};
            fibonacciPoint.latLng = destVincenty(position.coords.latitude, position.coords.longitude, fibonacciBearing(), fibonacci);
            fibonacciPoint.number = fibonacci;
            fibonacciPoints.push(fibonacciPoint);
        }
        addFibonacciMarkers();
    
    }
    
    // Center map on user position
    function myPosition(position) {
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.panTo(latLng);
        marker.setPosition(latLng);
        
        positionFibonacciPoints(position);
    }
    
    // Get position API success
    var apiGeolocationSuccess = function(position) {
        myPosition(position);
    };
    
    // Get user position
    jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC_1G8HL_gU--bC-jLQ-iiJLnhXhrPzAIk", function(success) {
        apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
    });
    
    
});