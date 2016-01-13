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
    })
    .state('game', {
      templateUrl: 'app/game/game.html',
      controller: 'GameController',
      controllerAs: 'game'
    })
    .state('score', {
      templateUrl: 'app/score/score.html',
      controller: 'ScoreController',
      controllerAs: 'score'
    })
    .state('result', {
      url: '/result',
      templateUrl: 'app/result/result.html',
      controller: 'ResultController',
      controllerAs: 'result'
    })
    .state('result.credits', {
      templateUrl: 'app/result/result.credits.html'
    })
    .state('result.menu', {
      templateUrl: 'app/result/result.menu.html'
    })
    .state('select', {
      templateUrl: 'app/select/select.html',
      controller: 'SelectController',
      controllerAs: 'select'
    });

  $urlRouterProvider.otherwise('/');
}
