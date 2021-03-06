class ScoreController {
  constructor($scope, $state, $window, SocketService, VibrateService) {
    'ngInject';

    this.$window = $window;
    this.$state = $state;
    this.SocketService = SocketService;
    this.VibrateService = VibrateService;

    this.text = 'Waiting for results';
    this.haveNextRound = true;
    this.canContinue = false;

    $scope.$on('owner_disconnect', function(event, args) {
      alert('Computer disconnected from the game. Game ended.');
      $state.go('main');
    });

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('main');
    });

    this.SocketService.extendedHandler = (message) => {
      if (message.type === 'end_score') {
        this.VibrateService.vibrate();

        this.canContinue = true;
        this.haveNextRound = message.haveNextRound;

        if (this.haveNextRound) {
          this.text = 'Next Question';
        } else {
          this.text = 'End Game';
        }
        
      } else if(message.type === 'continue') {
        this.moveToNextSection();
      }
    };
  }

  continue() {
    this.SocketService.send({
      type: 'continue'
    });

    this.moveToNextSection();
  }

  moveToNextSection() {
    if (this.haveNextRound) {
      this.$state.go('game');
    } else {
      this.$state.go('result');
    }
  }
}

export default ScoreController;
