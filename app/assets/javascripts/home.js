// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function(){
  var getLocation = function() {
      navigator.geolocation.getCurrentPosition(initialize);
    }

    function initialize(pos) {
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
      var mapCanvas = document.getElementById('map_canvas');
      var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      map = new google.maps.Map(mapCanvas, mapOptions);

      addMarker(lat, lng)
    }
    google.maps.event.addDomListener(window, 'load', getLocation);

    function addMarker(lat, lng) {
      new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(lat,lng)
      })
    }
});
