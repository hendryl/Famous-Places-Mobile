class LoadingController {
  constructor($scope, $state, $interval, SocketService) {
    'ngInject';

    this.animTime = 850;
    this.ellipsis = '.';

    $scope.$on('owner_disconnect', function(event, args) {
      alert('Computer disconnected from the game. Game ended.');
      $state.go('main');
    });

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('main');
    });

    $interval(() => this.changeEllipsis(), this.animTime, 0, true);

    SocketService.extendedHandler = (message) => {
      if(message.type === 'game_ready') {
        $state.go('game');
      }
    }
  }

  changeEllipsis() {
    this.ellipsis += '.';

    if (this.ellipsis.length > 3) {
      this.ellipsis = '.';
    }
  }
}

export default LoadingController;
