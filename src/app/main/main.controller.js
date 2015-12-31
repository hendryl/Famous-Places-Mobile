class MainController {
  constructor($state, $log, SocketService) {
    'ngInject';

    this.$log = $log;
    this.$state = $state;
    this.SocketService = SocketService;

  }

  play() {
    this.SocketService.connect().then((result) => {
      this.$log.log('success');

      this.SocketService.extendedHandler = (message) => {
        if(message.type === 'join_room') {
          this.$state.go('lobby');
        }
      };

      this.SocketService.joinRoom(this.password, this.name);
    });
  }
}

export default MainController;
