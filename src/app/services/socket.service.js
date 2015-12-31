class SocketService {
  constructor($log, SockJS, baseURLConfig) {
    'ngInject';

    this.$log = $log;
    this.SockJS = SockJS;
    this.baseURLConfig = baseURLConfig;

    this.socket = null;
    this.connected = false;
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
    this.$log.log('message received');

    message = angular.fromJson(message.data);

    if(message.type === 'error') {
      this.$log.error(message.reason);
    }

    if(message.type === 'join_room') {
      this.$log.log('join room success');
    }
  }

  joinRoom(name) {
    this.$log.log('joining room');
    this.send({
      type: 'join_room',
      name: name,
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
