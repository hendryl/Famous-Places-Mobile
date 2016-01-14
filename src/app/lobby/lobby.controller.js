class LobbyController {
  constructor($scope, $state, $stateParams, SocketService) {
    'ngInject';

    this.$state = $state;
    this.SocketService = SocketService;
    this.roomName = $stateParams.roomName;
    this.name = SocketService.playerName;

    $scope.$on('owner_disconnect', function(event, args) {
      alert('Computer disconnected from the game. Game ended.');
      $state.go('main');
    });

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('main');
    });

    this.SocketService.extendedHandler = (message) => {
      if(message.type === 'players_ready') {
        this.handlePlayersReady();
      }
    }
  }

  startGame() {
    this.SocketService.send({
      type:'players_ready',
      role:'player'
    });
  }

  handlePlayersReady() {
    this.$state.go('loading');
  }
}

export default LobbyController;
