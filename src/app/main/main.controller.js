class MainController {
  constructor($state, $log, SocketService) {
    'ngInject';

    this.$log = $log;
    this.$state = $state;
    this.SocketService = SocketService;
    this.errorMessage = '';
    this.processing = false;
  }

  play() {
    this.processing = true;

    this.SocketService.connect().then((result) => {
      this.$log.log('success');

      this.SocketService.extendedHandler = (message) => {
        if (message.type === 'join_room') {
          if (message.result === true) {
            this.$state.go('lobby');
          } else {
            this.errorMessage = message.reason;
            this.processing = false;
          }
        }
      };

      this.SocketService.joinRoom(this.password, this.name);
    });
  }
}

export default MainController;
