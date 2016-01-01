class SocketService {
  constructor($state, $log, SockJS, baseURLConfig, BroadcastService) {
    'ngInject';

    this.$log = $log;
    this.$state = $state;
    this.SockJS = SockJS;
    this.baseURLConfig = baseURLConfig;
    this.BroadcastService = BroadcastService;

    this.socket = null;
    this.connected = false;
    this.extendedHandler = null;
  }

  connect() {
    return new Promise( (resolve, reject) => {
      this.$log.log('connecting to sockjs');
      this.socket = new this.SockJS(this.baseURLConfig.localAPI + '/sockets');
      this.socket.onopen = () => {
        this.connected = true;
        resolve(this.connected);
      };

      this.socket.onclose = () => {
        this.connected = false;
        this.$log.log('connection closed');
      };

      this.socket.onmessage = ((message) => {
        this.handleMessage(message);
      });
    });
  }

  handleMessage(message) {
    this.$log.log(message);

    message = angular.fromJson(message.data);

    if(message.type === 'error') {
      this.$log.log(message.reason);
    }

    if(message.type === 'join_room') {
      this.$log.log('join room message');
    }

    if(message.type === 'owner_disconnect') {
      this.BroadcastService.send('owner_disconnect', null); 
    }

    if(this.extendedHandler != null) {
      this.extendedHandler(message);
    }
  }

  joinRoom(name, player) {
    this.$log.log('joining room');
    this.send({
      type: 'join_room',
      name: name,
      player: player,
      role: 'player'
    });
  }

  send(obj) {
    var json = angular.toJson(obj, true);
    this.socket.send(json);
  }

  close() {
    this.socket.close();
    this.socket = null;
  }
}

export default SocketService;
