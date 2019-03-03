var map, infoWindow;
function initMap() {
  var pos;

  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
      // var bounds = {
      //   north: -25.363882,
      //   south: -31.203405,
      //   east: 131.044922,
      //   west: 125.244141
      // };
      // couldve used fitbounds() to Display the area between the location southWest and northEast.


      var markers = [{lat: 37.725575,lng: -122.479647}, {lat: 37.723117,lng: -122.475770}]
      var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
      };

      var marker = new google.maps.Marker({
        // animation: google.maps.Animation.DROP,
        position: pos,
        shape: shape,
        map: map,
        title: 'Hi Julio',
      });
      attachSecretMessage(marker, "You are Here! :]");
      marker.setMap(map);
  
      var messages = ["League of Legends<br>Prize:500<br>SFSU<br>2:00pm", "Apex League<br>Prize:0<br>StonesTown<br>6:00pm"]

      for(var i = 0; i < markers.length; i++) {
        var marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          position: markers[i],
          map: map,
          title: 'Hi Julio',
          icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"  
        });
        attachSecretMessage(marker, messages[i]);
        marker.setMap(map);
      }

      var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: pos,
        radius: 1000
      });
      
      // infoWindow.setPosition(pos);
      // infoWindow.setContent("Fuckin\' Julio");
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 13
  });
}

function attachSecretMessage(marker, secretMessage) {
  var infowindow = new google.maps.InfoWindow({
    content: secretMessage
  });

  marker.addListener('click', function() {
    infowindow.open(marker.get('map'), marker);
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

// function initMap() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 4,
//     center: {lat: -33, lng: 151}
//   });

//   var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
//   var beachMarker = new google.maps.Marker({
//     position: {lat: -33.890, lng: 151.274},
//     map: map,
//     icon: image
//   });
// }