class ResultController {
  constructor(_, $state, $log, $window, $scope, feedbackURL, SocketService, toastr, CreditsFactory) {
    'ngInject';

    this._ = _;
    this.$log = $log;
    this.$state = $state;
    this.$window = $window;
    this.SocketService = SocketService;
    this.feedbackURL = feedbackURL;

    this.places = [];
    this.canCreate = true;
    this.current = 'result.credits';
    this.showTab();

    $scope.$on('owner_disconnect', function(event, args) {
      this.canCreate = false;

      toastr.info('Computer disconnected. Cannot create new game.');
    });

    $scope.$on('server_disconnect', function(event, args) {
      this.canCreate = false;

      toastr.info('Server disconnected. Cannot create new game.');
    });

    this.SocketService.extendedHandler = (message) => {
      if(message.type === 'player_create') {
        this.SocketService.disconnect();
        this.canCreate = false;

        toastr.info('A player is creating a new game at this computer. Join with the' + " 'join another game' button.");
      }
    };

    CreditsFactory.getList(this.SocketService.game_id).success( (result) => {
      this.places = this._.sortBy(result.data, (d) => d.name);
      this.$log.log(this.places);
    });
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
    this.SocketService.send({
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
