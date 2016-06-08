(function(){

  'use strict';

  var getButton = document.getElementById('js-get'),
      getValue = document.getElementById('js-get-value');

  getButton.addEventListener('click', function() {
    if (!('geolocation' in navigator)) {
      return;
    }

    navigator.geolocation.getCurrentPosition(function(pos) {
      getValue.innerHTML =
        'latitude: ' + pos.coords.latitude + '<br>' +
        'longitude: ' + pos.coords.longitude;
    }, function(err) {
      getValue.innerHTML =
        '<span class="error">' + err.code + ': ' + err.message + '</span>';
    }, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 0
    });
  }, false);

  //----------------------------------------------------------------------------

  var watchButton = document.getElementById('js-watch'),
      clearButton = document.getElementById('js-clear'),
      watchValue = document.getElementById('js-watch-value');

  var id;

  watchButton.addEventListener('click', function() {
    if (!('geolocation' in navigator)) {
      return;
    }

    watchButton.disabled = true;
    clearButton.disabled = false;

    id = navigator.geolocation.watchPosition(function(pos) {

      watchValue.innerHTML =
        'latitude: ' + pos.coords.latitude + '<br>' +
        'longitude: ' + pos.coords.longitude;
    }, function(err) {
      watchValue.innerHTML =
        '<span class="error">' + err.code + ': ' + err.message + '</span>';
    }, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 0
    });
  }, false);

  clearButton.addEventListener('click', function() {
    if (!('geolocation' in navigator)) {
      return;
    }

    watchButton.disabled = false;
    clearButton.disabled = true;

    watchValue.innerHTML = '';

    navigator.geolocation.clearWatch(id);
  }, false);

}());
