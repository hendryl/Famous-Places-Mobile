class ScoreController {
  constructor($scope, $state, $window, SocketService) {
    'ngInject';

    this.$window = $window;

    this.text = 'Waiting for results';
    this.haveNextRound = true;
    this.canContinue = false;

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('main');
    });


    this.SocketService.extendedHandler = (message) => {
      if (message.type === 'end_score') {
        $window.navigator.vibrate(200);

        this.canContinue = true;
        this.haveNextRound = message.haveNextRound;

        if (this.haveNextRound) {
          this.text = 'End Game';
        } else {
          this.text = 'Next Question';
        }
      }
    };

    this.prepareVibration();
  }

  prepareVibration() {
    const navigator = this.$window.navigator;

    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
  }
}

export default ScoreController;
