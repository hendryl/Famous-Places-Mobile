export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('lobby', {
      templateUrl: 'app/lobby/lobby.html',
      controller: 'LobbyController',
      controllerAs: 'lobby',
      params: {roomName: ''}
    })
    .state('loading', {
      templateUrl: 'app/loading/loading.html',
      controller: 'LoadingController',
      controllerAs: 'loading'
    });

  $urlRouterProvider.otherwise('/');
}
