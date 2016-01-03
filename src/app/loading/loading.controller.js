class LoadingController {
  constructor($scope, $state, $interval) {
    'ngInject';

    this.animTime = 850;
    this.ellipsis = '.';

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('main');
    });

    $interval(() => this.changeEllipsis(), this.animTime, 0, true);
  }

  changeEllipsis() {
    this.ellipsis += '.';

    if (this.ellipsis.length > 3) {
      this.ellipsis = '.';
    }
  }
}

export default LoadingController;
