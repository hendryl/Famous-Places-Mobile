class SocketService {
  constructor($log, SockJS, baseURLConfig, BroadcastService) {
    'ngInject';

    this.$log = $log;
    this.SockJS = SockJS;
    this.baseURLConfig = baseURLConfig;
    this.BroadcastService = BroadcastService;

    this.game_id = 0;
    this.playerName = '';
    this.socket = null;
    this.connected = false;
    this.extendedHandler = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.$log.debug('connecting to sockjs');
      this.socket = new this.SockJS(this.baseURLConfig.rootAPI + '/sockets');
      this.socket.onopen = () => {
        this.connected = true;
        resolve(this.connected);
      };

      this.socket.onclose = () => {
        this.connected = false;
        this.$log.debug('connection closed');
        this.BroadcastService.send('server_disconnect', null);
      };

      this.socket.onmessage = ((message) => {
        this.handleMessage(message);
      });
    });
  }

  handleMessage(message) {
    this.$log.debug(message);

    message = angular.fromJson(message.data);

    this.send({
      type: 'ack'
    });

    if (message.type === 'error') {
      this.$log.debug(message.reason);
    }

    if (message.type === 'owner_disconnect') {
      this.BroadcastService.send('owner_disconnect', null);
    }

    if (this.extendedHandler != null) {
      this.extendedHandler(message);
    }
  }

  joinRoom(name, player) {
    this.$log.debug('joining room');

    this.playerName = player;

    this.send({
      type: 'join_room',
      name: name,
      player: player
    });
  }

  send(obj) {
    if (this.socket) {
      obj.role = 'player';

      var json = angular.toJson(obj, true);

      this.socket.send(json);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export default SocketService;
