class VibrateService {
  constructor($window) {
    'ngInject';

    this.$window = $window;
    this.baseLength = 200;

    this.prepareVibration();
  }

  prepareVibration() {
    const navigator = this.$window.navigator;

    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
  }

  vibrate(length) {
    length = length || this.baseLength;

    if(this.$window.navigator.vibrate != null) {
      this.$window.navigator.vibrate(length);
    }
  }
}

export default VibrateService;
