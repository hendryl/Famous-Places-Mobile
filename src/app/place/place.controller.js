class PlaceController {
  constructor($log, $stateParams) {
    'ngInject';

    this.$log = $log;
    this.info = $stateParams.info;

    $log.debug(this.info);
  }
}

export default PlaceController;
