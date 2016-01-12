class ModeFactory {
  constructor($http, baseURLConfig) {
    'ngInject';

    this.$http = $http;
    this.baseURLConfig = baseURLConfig;
  }

  getModeList() {
    return this.$http.get(this.baseURLConfig.rootAPI + '/modes/?enabled=true');
  }
}

export default ModeFactory;
