class SelectController {
  constructor(_, $log, $scope, $state, ModeFactory, SocketService) {
    'ngInject';

    this._ = _;
    this.$log = $log;
    this.$state = $state;
    this.ModeFactory = ModeFactory;
    this.SocketService = SocketService;

    this.modes = [];
    this.buttonDisabled = false;

    ModeFactory.getList().success((result) => {
      this.modes = _.sortBy(result, (n) => n.mode_id);
    });

    $scope.$on('owner_disconnect', function(event, args) {
      alert('Computer disconnected from the server. Cannot create game.');
      $state.go('main');
    });

    $scope.$on('server_disconnect', function(event, args) {
      alert('Disconnected from server. Cannot create game.');
      $state.go('main');
    });

    SocketService.extendedHandler = (message) => {
      if(message.type === 'player_select') {
        this.$state.go('lobby', {roomName: message.room});
      }
    }
  }

  selectGameMode(mode_id) {
    this.buttonDisabled = true;

    this.SocketService.send({
      type:'player_select',
      mode_id:mode_id
    });
  }

  //TODO: show waiting message / go to waiting state
}

export default SelectController;
