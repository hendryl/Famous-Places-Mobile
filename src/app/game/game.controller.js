class GameController {
  constructor($scope, $state, NgMap, mapsKey) {
    'ngInject';

    this.$state = $state;

    this.googleMapsURL = "https://maps.google.com/maps/api/js?libraries=places&callback=prepareMap&key=" + mapsKey;

    this.instruction = "Ready";
    this.hasSubmitted = false;

    this.mapCenter = {
      lat: 0,
      long: 0
    }

    this.answer = {
      lat: this.mapCenter.lat,
      long: this.mapCenter.long
    }

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('main');
    });
  }

  prepareMap(map) {
    this.map = map;

    const styles = [
      {
        featureType: "poi",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off"
          }
        ]
      }
    ]
    const options = {
      streetViewControl: false,
      styles: styles
    };

    map.setOptions(options);
  }

  dragMap(event) {

  }

  placeMarker(event) {

  }

  moveMarker(event) {

  }

  startMoveMarker(event) {

  }

  endMoveMarker(event) {

  }
}

export default GameController;
