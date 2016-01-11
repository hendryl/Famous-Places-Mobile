/* global malarkey:false, moment:false, SockJS:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import MainController from './main/main.controller';
import LobbyController from './lobby/lobby.controller';
import LoadingController from './loading/loading.controller';
import GameController from './game/game.controller';
import ScoreController from './score/score.controller';
import ResultController from './result/result.controller';

import SocketService from './services/socket.service';
import BroadcastService from './services/broadcast.service';
import VibrateService from './services/vibrate.service';

import baseURLConfig from './api.js';

var lodash = require('lodash');

angular.module('famousPlacesMobile', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'angularScreenfull', 'ui.router', 'ui.bootstrap', 'toastr', 'ngMap'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .constant('_', lodash)
  .constant('SockJS', SockJS)
  .constant('baseURLConfig', baseURLConfig)
  .constant('mapsKey', 'AIzaSyBKm4xvXU4kg3MOvyghsWeNO1BtcHzvBQA')
  .constant('feedbackURL', '')

  .config(config)
  .config(routerConfig)
  .run(runBlock)

  .controller('MainController', MainController)
  .controller('LobbyController', LobbyController)
  .controller('LoadingController', LoadingController)
  .controller('GameController', GameController)
  .controller('ScoreController', ScoreController)
  .controller('ResultController', ResultController)

  .service('SocketService', SocketService)
  .service('BroadcastService', BroadcastService)
  .service('VibrateService', VibrateService);
