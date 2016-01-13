class CreditsFactory {
  constructor($http, baseURLConfig) {
    'ngInject';

    this.$http = $http;
    this.baseURLConfig = baseURLConfig;
  }

  getList(id) {
    return this.$http.get(this.baseURLConfig.rootAPI + '/games/' + id + '/questions');
  }
}

export default CreditsFactory;
