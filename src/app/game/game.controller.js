class GameController {
  constructor($scope) {
    'ngInject';

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('main');
    });
  }
}

export default GameController;
