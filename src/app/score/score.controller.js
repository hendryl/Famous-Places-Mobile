class ScoreController {
  constructor($scope, $state, SocketService) {
    'ngInject';

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('main');
    });

    this.text = 'Waiting for results';
  }
}

export default ScoreController;
