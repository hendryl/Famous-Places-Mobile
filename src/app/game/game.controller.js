class GameController {
  constructor(_, $log, $scope, $state, $window, NgMap, mapsKey, SocketService, VibrateService) {
    'ngInject';

    this._ = _;
    this.latLngDecimals = 6;
    this.$log = $log;
    this.$state = $state;
    this.$window = $window;
    this.$scope = $scope;
    this.SocketService = SocketService;
    this.VibrateService = VibrateService;

    this.googleMapsURL = "https://maps.google.com/maps/api/js?libraries=places&callback=prepareMap&key=" + mapsKey;

    this.instruction = "Ready...";
    this.canSubmit = false;
    this.map = null;

    this.mapCenter = {
      lat: 0,
      long: 0
    };

    this.answer = {
      lat: this.mapCenter.lat,
      long: this.mapCenter.long
    };

    $scope.$on('owner_disconnect', function(event, args) {
      alert('Computer disconnected from the game. Game ended.');
      $state.go('main');
    });

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('main');
    });

    //force angular to apply data bindings when page resizes
    angular.element($window).bind('resize', () => {
      $scope.$apply();
    });

    this.SocketService.extendedHandler = (message) => {
      if (message.type === 'start_round') {
        this.VibrateService.vibrate();

        this.round = message.round;
        this.instruction = 'Pin!';
        this.canSubmit = true;
      }
    }
  }

  isInLandscape() {
    return this._.contains(this.$window.screen.orientation.type, 'landscape');
  }

  submit() {
    this.SocketService.send({
      type: 'answer',
      lat: this.answer.lat,
      long: this.answer.long,
      round: this.round
    });

    this.canSubmit = false;
    this.$state.go('score');
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
