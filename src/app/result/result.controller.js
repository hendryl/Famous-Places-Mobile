class ResultController {
  constructor($state, $log, $window, feedbackURL, SocketService) {
    'ngInject';

    this.$log = $log;
    this.$state = $state;
    this.$window = $window;
    this.SocketService = SocketService;
    this.feedbackURL = feedbackURL;

    this.canCreate = true;
    this.current = 'result.menu';
    this.showTab();

    this.SocketService.extendedHandler = (message) => {
      if(message.type === 'player_create') {
        this.SocketService.disconnect();
        this.canCreate = false;
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
    this.send({
      type: 'player_create'
    });

    this.$state.go('select');
  }

  joinAnotherGame() {
    this.$state.go('main');
    this.SocketService.disconnect();
  }
}

export default ResultController;
