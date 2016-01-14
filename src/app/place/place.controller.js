class PlaceController {
  constructor($log, $stateParams, $state, $window) {
    'ngInject';

    this.$log = $log;
    this.info = $stateParams.info;
    this.$state = $state;
    this.$window = $window;

    $log.debug(this.info);
  }

  openLearnMore() {
    this.$window.open(this.info.link, '_blank');
  }

  back() {
    this.$state.go('result');
  }
}

export default PlaceController;
