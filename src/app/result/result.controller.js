class ResultController {
  constructor(_, $q, $state, $log, $window, $scope, feedbackURL, SocketService, toastr, CreditsFactory, ImageFactory) {
    'ngInject';

    this._ = _;
    this.$q = $q;
    this.$log = $log;
    this.$state = $state;
    this.$window = $window;
    this.SocketService = SocketService;
    this.CreditsFactory = CreditsFactory;
    this.ImageFactory = ImageFactory;
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
      if (message.type === 'player_create') {
        this.SocketService.disconnect();
        this.canCreate = false;

        toastr.info('A player is creating a new game at this computer. Join with the' + " 'join another game' button.");
      }
    };

    this.preparePlaces();
  }

  changeTab(value) {
    this.current = value;
    this.showTab();
  }

  showTab() {
    this.$state.transitionTo(this.current);
  }

  preparePlaces() {
    this.CreditsFactory.getList(this.SocketService.game_id).success(result => {
      this.places = this._.sortBy(result, (d) => d.name);

      const promises = this._.chain(this.places)
        .map(p => p.photo_id)
        .map(id => this.ImageFactory.getImage(id))
        .value();

      this.$q.all(promises).then(results => {
        this.places = this._.each(this.places, p => {
          p.photo = results.shift().data;
          p.photo.thumb = p.photo.url.replace('_b.jpg', '.jpg');
        });

        this.$log.debug(this.places);
      });
    });
  }

  openPlace(index) {
    const obj = this.places[index];
    this.$state.go('place', {info: obj});
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
