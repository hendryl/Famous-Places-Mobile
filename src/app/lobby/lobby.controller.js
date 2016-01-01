class LobbyController {
  constructor($scope, $state, $stateParams) {
    'ngInject';

    this.roomName = $stateParams.roomName;

    $scope.$on('owner_disconnect', function(event, args) {
      alert('Computer disconnected from the game. Game ended.');
      $state.go('main');
    })
  }
}

export default LobbyController;
