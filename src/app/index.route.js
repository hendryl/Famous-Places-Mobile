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
      url: '/',
      templateUrl: 'app/lobby/lobby.html',
      controller: 'LobbyController',
      controllerAs: 'lobby'
    });

  $urlRouterProvider.otherwise('/');
}
