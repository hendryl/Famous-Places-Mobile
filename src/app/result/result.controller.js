class ResultController {
  constructor($state, $log, $window, feedbackURL, SocketService) {
    'ngInject';

    this.$log = $log;
    this.$state = $state;
    this.$window = $window;
    this.SocketService = SocketService;
    this.feedbackURL = feedbackURL;

    this.current = 'result.menu';
    this.showTab();

    this.rematchOptionsHidden = true;

    this.SocketService.extendedHandler = (message) => {
      if(message.type === 'player_create') {
        this.SocketService.disconnect();
      }
    };
  }

  changeTab(value) {
    this.current = value;
    this.showTab();
  }

  showTab() {
    this.$state.transitionTo(this.current);
  }

  openFeedback() {
    this.$window.open(this.feedbackURL, '_blank');
  }

  createNewGame() {
    this.$state.go('select');
  }

  joinAnotherGame() {
    this.$state.go('main');
    this.SocketService.disconnect();
  }
}

export default ResultController;
