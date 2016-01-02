class LobbyController {
  constructor($scope, $state, $stateParams, SocketService) {
    'ngInject';

    this.$state = $state;
    this.SocketService = SocketService;
    this.roomName = $stateParams.roomName;

    $scope.$on('owner_disconnect', function(event, args) {
      alert('Computer disconnected from the game. Game ended.');
      $state.go('main');
    })
  }

  startGame() {
    this.SocketService.send({
      type:'players_ready',
      role:'player'
    });

    this.SocketService.extendedHandler = (message) => {
      if(message.type === 'players_ready') {
        this.$state.go('loading');
      }
    }
  }
}

export default LobbyController;
