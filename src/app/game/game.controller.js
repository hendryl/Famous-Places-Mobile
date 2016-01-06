class GameController {
  constructor($log, $scope, $state, NgMap, mapsKey) {
    'ngInject';

    this.latLngDecimals = 6;
    this.$log = $log;
    this.$state = $state;

    this.googleMapsURL = "https://maps.google.com/maps/api/js?libraries=places&callback=prepareMap&key=" + mapsKey;

    this.instruction = "Ready";
    this.hasSubmitted = false;
    this.map = null;

    this.mapCenter = {
      lat: 0,
      long: 0
    };

    this.answer = {
      lat: this.mapCenter.lat,
      long: this.mapCenter.long
    };

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('main');
    });

    this.$log.log(this.answer);
  }

  prepareMap(map) {
    this.map = map;

    const styles = [{
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [{
        visibility: "off"
      }]
    }]
    const options = {
      streetViewControl: false,
      mapTypeControl: false,
      styles: styles
    };

    map.setOptions(options);
  }

  placeMarker(event, game) {
    this.panTo(event.latLng);
    game.moveMarker(event, game);
  }

  //NgMap's eventing binds this to the map, so we have to get the controller
  moveMarker(event, game) {
    game.answer.lat = event.latLng.lat().toFixed(game.latLngDecimals);
    game.answer.long = event.latLng.lng().toFixed(game.latLngDecimals);
  }
}

export default GameController;
