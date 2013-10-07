// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function(){
  var getLocation = function(callback) {
     navigator.geolocation.getCurrentPosition(callback, function(){}, {enableHighAccuracy: true});
  }

  markers = {};
  function initialize(pos) {
    centerLat = pos.coords.latitude;
    centerLng = pos.coords.longitude;
    var mapCanvas = document.getElementById('map_canvas');
    var mapOptions = {
      center: new google.maps.LatLng(centerLat, centerLng),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(mapCanvas, mapOptions);
  }

  function addMarker(lat, lng) {
    var marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(lat,lng)
    })
    return marker;
  }
  directionsService = new google.maps.DirectionsService();

  getLocation(initialize);
  $('#begin').click(function(){
    getLocation(function(pos){
      markers.begin = addMarker(pos.coords.latitude, pos.coords.longitude);
      console.log(markers)
    })
  });
  $('#start').click(function(){
    getLocation(function(pos){
      markers.end = addMarker(pos.coords.latitude, pos.coords.longitude);
      displayRoute();
    })
  })

  function displayRoute() {

    var start = new google.maps.LatLng(markers.end.position.lb, markers.end.position.mb);
    var end = new google.maps.LatLng(markers.begin.position.lb, markers.end.position.mb);

    var directionsDisplay = new google.maps.DirectionsRenderer();// also, constructor can get "DirectionsRendererOptions" object
    directionsDisplay.setMap(map); // map should be already initialized.

    var request = {
        origin : start,
        destination : end,
        travelMode : google.maps.TravelMode.WALKING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
  }

});
