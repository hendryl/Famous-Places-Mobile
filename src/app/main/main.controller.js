class MainController {
  constructor(_, $scope, $state, $log, SocketService) {
    'ngInject';

    this._ = _;
    this.$log = $log;
    this.$state = $state;
    this.$scope = $scope;
    this.SocketService = SocketService;
    this.name = '';
    this.password = '';
    this.errorMessage = '';
    this.processing = false;

    if(this.SocketService.playerName !== '') {
      this.name = this.SocketService.playerName;
    }
  }

  canPlay() {
    const _ = this._;
    return !_.isEmpty(this.name) && this.password.length === 6;
  }

  play() {
    this.processing = true;

    this.SocketService.connect().then((result) => {
      this.$log.log('success');

      this.SocketService.extendedHandler = (message) => {
        if (message.type === 'join_room') {
          this.$log.log('join room message');

          if (message.result === true) {
            this.$state.go('lobby', {roomName: this.password});

          } else {
            this.$log.log('result is false');
            this.errorMessage = message.reason;
            this.processing = false;

            this.$scope.$apply(() => {
              this.$scope.errorMessage = this.errorMessage;
              this.$scope.processing = this.processing;
            })
          }
        }
      };

      this.SocketService.joinRoom(this.password, this.name);
    });
  }
}

export default MainController;
