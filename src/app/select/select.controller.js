class SelectController {
  constructor(_, $log, $state, ModeFactory, SocketService) {
    'ngInject';

    this._ = _;
    this.$log = $log;
    this.$state = $state;
    this.ModeFactory = ModeFactory;

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
      //TODO: handle message
    }
  }

  selectGameMode(mode_id) {
    this.buttonDisabled = true;

    this.SocketService.send({
      type:'player_select',
      mode_id:mode_id
    });
  }
}

export default SelectController;
